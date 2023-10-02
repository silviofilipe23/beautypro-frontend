import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConsumedProducts } from 'src/app/models/ConsumedProducts';
import { Product, ProductResponse } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss'],
})
export class AddProductDialogComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  listProducts: Product[] = [];
  listProductsSelected: ConsumedProducts[] = [];
  itemSelected: any;
  quantity: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  save() {
    this.dialogRef.close(this.listProductsSelected);
  }

  delete(item: ConsumedProducts) {
    let index = this.listProductsSelected.findIndex(
      (object) => object.product.id === item.product.id
    );

    if (index !== -1) {
      // Removendo o objeto do array
      this.listProductsSelected.splice(index, 1);
    }
  }

  add() {
    let consumedProducts: ConsumedProducts = Object.create(ConsumedProducts);

    consumedProducts.product = this.itemSelected;
    consumedProducts.quantity = this.quantity;

    const getObject = this.listProductsSelected.find(
      (object) => object.product.id === consumedProducts.product.id
    );

    console.log(getObject);

    if (getObject) {
      this.itemSelected = null;
      this.quantity = null;

      this._snackBar.open('Este produto já foi adicionado', 'Fechar', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['error-snackbar'],
      });

      return;
    } else {
      this.listProductsSelected.push(consumedProducts);
    }

    this.itemSelected = null;
    this.quantity = null;
  }

  getAllProducts() {
    this.blockUI.start();

    this.service.listProduct(0, 100, null).subscribe({
      next: (response: HttpResponse<ProductResponse>) => {
        this.blockUI.stop();

        this.listProducts = response.body?.data;
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

  close(): void {
    this.dialogRef.close();
  }
}
