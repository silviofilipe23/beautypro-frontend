import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorService } from 'src/app/services/paginator/paginator.service';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service/service.service';
import { Service } from 'src/app/models/Service';
import { PhoneNumber } from 'src/app/utils/format-phonenumber';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form: UntypedFormGroup;
  listLength = 10;
  listServices: Service[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private service: ServiceService,
    private paginatorService: PaginatorService
  ) {
    this.form = this.fb.group({
      search: new UntypedFormControl(''),
    });
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.paginatorService.getPageSize();
    this.getListServices();
  }

  ngOnInit(): void {
    const todayStart = new Date();
    this.form.get('search')?.setValue(todayStart);
  }

  getListServices() {
    this.blockUI.start();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    // todayStart.setDate(25);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 0, 0);
    // todayEnd.setDate(25);
    // console.log(todayEnd.toLocaleString());

    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listServices(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            todayStart.toISOString(),
            todayEnd.toISOString()
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
            todayEnd.toISOString()
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

  onPaginatorChange(event: any) {
    this.paginatorService.setPageSize(event.pageSize);
  }

  formatPhoneNumber(number: string): string {
    if (number) {
      const phoneNumber = new PhoneNumber(number);
      return phoneNumber.format();
    } else {
      return '';
    }
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
