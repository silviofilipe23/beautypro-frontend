import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PaginatorService } from './../../services/paginator/paginator.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Product>;
  listLength = 10;
  listProducts: Product[] = [];
  form: UntypedFormGroup;
  displayedColumns: string[] = [
    'id',
    'name',
    'brand',
    'unitOfMeasure',
    'quantity',
    'supplier',
    'active',
    'actions',
  ];

  constructor(
    private paginatorService: PaginatorService,
    private service: ProductService,
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
    this.getListProducts();
  }

  ngOnInit(): void {}

  getListProducts() {
    this.blockUI.start();
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listProduct(
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
          this.listProducts = response;
          this.dataSource = new MatTableDataSource(this.listProducts);
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
          return this.service!.listProduct(
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
          this.listProducts = response;
          this.dataSource = new MatTableDataSource(this.listProducts);
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

  goToEditProduct(item: Product) {
    this.router.navigateByUrl('/product-edit', {
      state: { editObject: item },
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
