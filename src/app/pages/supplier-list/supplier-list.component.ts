import { PhoneNumber } from './../../utils/format-phonenumber';
import { SupplierDTO } from './../../models/Supplier';
import { SupplierService } from './../../services/supplier/supplier.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaginatorService } from './../../services/paginator/paginator.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
})
export class SupplierListComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<SupplierDTO>;
  listLength = 10;
  listSuppliers: SupplierDTO[] = [];
  form: FormGroup;
  displayedColumns: string[] = [
    'id',
    'name',
    'cnpj',
    'email',
    'phoneNumber',
    'active',
    'actions',
  ];

  constructor(
    private paginatorService: PaginatorService,
    private service: SupplierService,
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
    this.getListSuppliers();
  }

  ngOnInit(): void {}

  getListSuppliers() {
    this.blockUI.start();
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listSupplier(
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
          this.listSuppliers = response;
          this.dataSource = new MatTableDataSource(this.listSuppliers);
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
          return this.service!.listSupplier(
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
          this.listSuppliers = response;
          this.dataSource = new MatTableDataSource(this.listSuppliers);
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
    const phoneNumber = new PhoneNumber(number);
    return phoneNumber.format();
  }

  goToEditSupplier(item: SupplierDTO) {
    this.router.navigateByUrl('/supplier-edit', {
      state: { editObject: item },
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
