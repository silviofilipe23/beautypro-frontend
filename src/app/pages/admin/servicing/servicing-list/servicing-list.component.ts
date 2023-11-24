import { Servicing } from '../../../../models/Servicing';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorService } from 'src/app/services/paginator/paginator.service';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { CPF } from 'src/app/utils/format-cpf';
import { PhoneNumber } from 'src/app/utils/format-phonenumber';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicingService } from 'src/app/services/servicing/servicing.service';

@Component({
  selector: 'app-servicing-list',
  templateUrl: './servicing-list.component.html',
  styleUrls: ['./servicing-list.component.scss'],
})
export class ServicingListComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Servicing>;
  listLength = 10;
  listServicings: Servicing[] = [];
  form: UntypedFormGroup;
  displayedColumns: string[] = [
    'id',
    'description',
    'price',
    'averageTime',
    'active',
    'actions',
  ];

  constructor(
    private paginatorService: PaginatorService,
    private service: ServicingService,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      search: new UntypedFormControl(''),
    });
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.paginatorService.getPageSize();
    this.getListServicings();
  }

  ngOnInit(): void {}

  getListServicings() {
    this.blockUI.start();
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listServicing(
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
          this.listServicings = response;
          this.dataSource = new MatTableDataSource(this.listServicings);
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
          return this.service!.listServicing(
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
          this.listServicings = response;
          this.dataSource = new MatTableDataSource(this.listServicings);
          this.blockUI.stop();
        },
        error: (err) => {
          this.blockUI.stop();
        },
      });
  }

  onPaginatorChange(event: any) {
    this.paginatorService.setPageSize(event.pageSize);
  }

  goToEditServicing(item: Servicing) {
    this.router.navigateByUrl('/admin/servicing-edit', {
      state: { editObject: item },
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
