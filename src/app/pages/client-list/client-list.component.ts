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

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Client>;
  listLength = 10;
  listClients: Client[] = [];
  form: FormGroup;
  displayedColumns: string[] = [
    'id',
    'name',
    'cpf',
    'rg',
    'phoneNumber',
    'actions',
  ];

  constructor(
    private paginatorService: PaginatorService,
    private service: ClientService,
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
    this.getListClients();
  }

  ngOnInit(): void {}

  getListClients() {
    this.blockUI.start();
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listClient(
            this.paginator.pageIndex,
            this.paginator.pageSize,
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
          this.listClients = response;
          this.dataSource = new MatTableDataSource(this.listClients);
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
          return this.service!.listClient(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.form.get('search')?.value
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
          this.listClients = response;
          this.dataSource = new MatTableDataSource(this.listClients);
          this.blockUI.stop();
        },
        error: (err) => {
          this.blockUI.stop();
        },
      });
  }

  formatCPF(cpf: string): string {
    const cpfFormatted = new CPF(cpf);
    return cpfFormatted.format();
  }

  formatPhoneNumber(number: string): string {
    const phoneNumber = new PhoneNumber(number);
    return phoneNumber.format();
  }

  onPaginatorChange(event: any) {
    this.paginatorService.setPageSize(event.pageSize);
  }

  goToEditClient(item: Client) {
    this.router.navigateByUrl('/client-edit', {
      state: { editObject: item },
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
