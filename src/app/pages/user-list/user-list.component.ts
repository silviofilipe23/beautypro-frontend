import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Client, ClientResponse } from './../../models/Client';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorService } from 'src/app/services/paginator/paginator.service';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { CPF } from 'src/app/utils/format-cpf';
import { PhoneNumber } from 'src/app/utils/format-phonenumber';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Client>;
  listLength = 10;
  listUsers: Client[] = [];
  form: FormGroup;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phoneNumber',
    'active',
    'actions',
  ];

  constructor(
    private paginatorService: PaginatorService,
    private service: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      search: new FormControl(''),
      // categoriesCheck: new FormControl(false),
      // mediasCheck: new FormControl(false),
    });
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.paginatorService.getPageSize();
    this.getListUsers();
  }

  ngOnInit(): void {}

  getListUsers() {
    this.blockUI.start();
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listUser(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            null,
            null
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          if (data.body.data === null) {
            return [];
          }

          this.listLength = data.body.total!;
          return data.body.data;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.listUsers = response;
          this.dataSource = new MatTableDataSource(this.listUsers);
          this.blockUI.stop();
        },
        error: (err) => {
          this.blockUI.stop();
        },
      });
  }

  getListSearch() {
    this.blockUI.start();
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listUser(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.form.get('search')?.value,
            null
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          if (data.body.data === null) {
            return [];
          }

          this.listLength = data.body.total!;
          return data.body.data;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.listUsers = response;
          this.dataSource = new MatTableDataSource(this.listUsers);
          this.blockUI.stop();
        },
        error: (err) => {
          this.blockUI.stop();
        },
      });
  }

  formatPhoneNumber(number: string): string {
    if (number) {
      const phoneNumber = new PhoneNumber(number);
      return phoneNumber.format();
    } else {
      return '';
    }
  }

  onPaginatorChange(event: any) {
    this.paginatorService.setPageSize(event.pageSize);
  }

  goToEditUser(item: Client) {
    this.router.navigateByUrl('/user-edit', {
      state: { editObject: item },
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
