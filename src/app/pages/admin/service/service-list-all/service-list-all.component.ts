import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { PaginatorService } from '../../../../services/paginator/paginator.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { ServiceService } from 'src/app/services/service/service.service';
import { Service } from 'src/app/models/Service';

@Component({
  selector: 'app-service-list-all',
  templateUrl: './service-list-all.component.html',
  styleUrls: ['./service-list-all.component.scss'],
})
export class ServiceListAllComponent implements AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Service>;
  listLength = 10;
  listServices: Service[] = [];
  form: UntypedFormGroup;
  displayedColumns: string[] = [
    'id',
    'client',
    'servicing',
    'user',
    'dateHour',
    'finishedDate',
    'paymentType',
    'price',
    'serviceProvided',
    // 'actions',
  ];

  constructor(
    private paginatorService: PaginatorService,
    private service: ServiceService,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      search: new UntypedFormControl(''),
      // categoriesCheck: new FormControl(false),
      // mediasCheck: new FormControl(false),
    });
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.paginatorService.getPageSize();
    this.getListServices();
  }

  onPaginatorChange(event: any) {
    this.paginatorService.setPageSize(event.pageSize);
  }

  getListServices() {
    this.blockUI.start();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 0, 0);

    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listServicesDesc(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            null,
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
          this.listServices = response;
          this.dataSource = new MatTableDataSource(this.listServices);
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

    const todayStart = new Date(this.form.get('search')?.value);
    todayStart.setHours(0, 0, 0, 0);
    // todayStart.setDate(25);

    const todayEnd = new Date(this.form.get('search')?.value);
    todayEnd.setHours(23, 59, 0, 0);

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listServices(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            todayStart.toISOString(),
            todayEnd.toISOString(),
            true
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
          this.listServices = response;
          // this.dataSource = new MatTableDataSource(this.listClients);
          this.blockUI.stop();
        },
        error: (err) => {
          this.blockUI.stop();
        },
      });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
