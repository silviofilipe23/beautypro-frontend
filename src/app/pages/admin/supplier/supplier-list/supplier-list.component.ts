import { PhoneNumber } from '../../../../utils/format-phonenumber';
import { Supplier } from '../../../../models/Supplier';
import { SupplierService } from '../../../../services/supplier/supplier.service';
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
import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
})
export class SupplierListComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Supplier>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  listLength = 10;
  listSuppliers: Supplier[] = [];
  form: UntypedFormGroup;
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
    private fb: UntypedFormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
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
          this.listSuppliers = response;
          this.dataSource = new MatTableDataSource(this.listSuppliers);
          this.blockUI.stop();
        },
        error: (err) => {
          this.blockUI.stop();
        },
      });
  }

  deleteSupplier(supplier: Supplier) {
    this.blockUI.start();

    this.service.deleteSupplier(supplier.id).subscribe({
      next: (response: HttpResponse<any>) => {
        this._snackBar.open('Fornecedor excluído com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['error-snackbar'],
        });
        this.blockUI.stop();
        this.getListSearch();
      },
      error: (err) => {
        this.blockUI.stop();
        this._snackBar.open(err.error?.message, 'Fechar', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['error-snackbar'],
        });
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

  goToEditSupplier(item: Supplier) {
    this.router.navigateByUrl('/admin/supplier-edit', {
      state: { editObject: item },
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
