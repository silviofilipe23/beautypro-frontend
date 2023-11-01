import { Router } from '@angular/router';
import { Client } from './../../models/Client';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorService } from 'src/app/services/paginator/paginator.service';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { ServiceService } from 'src/app/services/service/service.service';
import { Service } from 'src/app/models/Service';
import { EPaymentType } from 'src/app/models/EPaymentType';

@Component({
  selector: 'app-client-services-list',
  templateUrl: './client-services-list.component.html',
  styleUrls: ['./client-services-list.component.scss'],
})
export class ClientServicesListComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Service>;
  listLength = 10;
  listServices: Service[] = [];
  displayedColumns: string[] = [
    'id',
    'servicing',
    'dateHour',
    'endDate',
    'paymentType',
    'price',
    'open',
  ];
  client: Client;

  constructor(
    private paginatorService: PaginatorService,
    private service: ServiceService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.client =
        this.router.getCurrentNavigation()?.extras?.state?.['client'];
      console.log(this.client);
    } else {
      this.router.navigate(['/client-list']);
    }
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.paginatorService.getPageSize();
    this.getListClientsService();
  }

  ngOnInit(): void {}

  getListClientsService() {
    this.blockUI.start();
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listServiceClient(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.client.id
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

  onPaginatorChange(event: any) {
    this.paginatorService.setPageSize(event.pageSize);
  }

  getPaymentType(type: string): string {
    if (type !== null) {
      return type == 'CREDT_CARD'
        ? 'Cartão de Crédito'
        : type == 'CASH'
        ? 'Dinheiro'
        : 'PIX';
    } else {
      return '-';
    }
  }

  getStatus(element: Service) {
    if (element.open === true && element.finishedDate === null) {
      return 'Aberto';
    } else if (element.open === false && element.finishedDate === null) {
      return 'Cancelado';
    } else {
      return 'Finalizado';
    }
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
