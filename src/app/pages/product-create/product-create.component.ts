import { Observable } from 'rxjs';
import { UnitOfMeasure } from './../../models/UnitOfMeasure';
import { HttpResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { CepService } from 'src/app/services/cep/cep.service';
import { StatesService } from 'src/app/services/states/states.service';
import { Client } from 'src/app/models/Client';
import { UnitOfMeasureService } from 'src/app/services/unitOfMeasure/unit-of-measure.service';
import { Product } from 'src/app/models/Product';
import { Supplier } from 'src/app/models/Supplier';
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { ProductService } from 'src/app/services/product/product.service';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit, AfterContentInit {
  @BlockUI() blockUI!: NgBlockUI;

  productForm!: UntypedFormGroup;
  editObject!: Product;
  suppliersList: Supplier[] | null = null;
  unitOfMeasureList: UnitOfMeasure[] | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  filteredOptions: any;
  selectedSupplier!: Supplier;

  constructor(
    private fb: UntypedFormBuilder,
    private service: ProductService,
    private serviceSupplier: SupplierService,
    private unitOfMeasureService: UnitOfMeasureService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.editObject =
        this.router.getCurrentNavigation()?.extras?.state?.['editObject'];
      console.log(this.editObject);
    }

    this.productForm = this.fb.group({
      name: new UntypedFormControl(
        this.editObject ? this.editObject.name : '',
        [Validators.required, Validators.maxLength(255)]
      ),
      description: new UntypedFormControl(
        this.editObject ? this.editObject.description : '',
        [Validators.required, Validators.maxLength(255)]
      ),
      code: new UntypedFormControl(
        this.editObject ? this.editObject.code : '',
        [Validators.required, Validators.maxLength(255)]
      ),
      brand: new UntypedFormControl(
        this.editObject ? this.editObject.brand : '',
        [Validators.required, Validators.maxLength(255)]
      ),
      notes: new UntypedFormControl(
        this.editObject ? this.editObject.notes : '',
        [Validators.required]
      ),
      price: new UntypedFormControl(
        this.editObject ? this.editObject.price : '',
        [Validators.required]
      ),
      active: new UntypedFormControl(
        this.editObject ? this.editObject.active : null,
        []
      ),
      quantity: new UntypedFormControl(
        this.editObject ? this.editObject.quantity : '',
        [Validators.required]
      ),
      unitOfMeasure: new UntypedFormControl(
        this.editObject ? this.editObject.unitOfMeasure : '',
        [Validators.required]
      ),
      supplier: new UntypedFormControl('', [Validators.required]),
      // observations: new FormControl(this.editObject ? this.editObject.observations : '', [Validators.required]),
    });
  }

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    if (this.editObject) {
      this.productForm.get('supplier')?.setValue(this.editObject.supplier);
      this.selectedSupplier = this.editObject.supplier!;
    }

    this.filteredOptions = this.productForm.get('supplier')?.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this._filter(value))
    );

    this.getUnitsOfMeasure();
  }

  selectedProduct(event: MatAutocompleteSelectedEvent) {
    this.selectedSupplier = event.option.value;
  }

  displayFn(option: any) {
    return option ? option.name : undefined;
  }

  getOptionText(option: any) {
    return option.name;
  }

  _filter(value: string) {
    console.log(value);

    return this.serviceSupplier
      .listSupplier(0, 10, typeof value == 'string' ? value : '', true)
      .pipe(
        map((data) => {
          return data.body.data;
        })
      );
  }

  createProduct() {
    if (this.productForm.valid) {
      this.blockUI.start();

      let product = new Product();

      product.name = this.productForm.value.name;
      product.price = this.productForm.value.price;
      product.quantity = this.productForm.value.quantity;
      product.supplier = new Supplier(this.selectedSupplier);
      product.code = this.productForm.value.code;
      product.unitOfMeasure = this.productForm.value.unitOfMeasure;
      product.description = this.productForm.value.description;
      product.brand = this.productForm.value.brand;
      product.notes = this.productForm.value.notes;

      const requestProduct = new Product(product);

      if (this.editObject) {
        requestProduct.active = this.productForm.value.active;

        this.editProduct(this.editObject.id!, requestProduct);
      } else {
        requestProduct.active = true;
        this.createNewProduct(requestProduct);
      }
    }
  }

  createNewProduct(newProduct: Product) {
    this.service.createProduct(newProduct).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 201) {
          this._snackBar.open('Produto cadastrado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/product-list']);
        }
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

  editProduct(id: number, editProduct: Product) {
    this.service.updateProduct(id, editProduct).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this._snackBar.open('Produto atualizado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/product-list']);
        }
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

  getUnitsOfMeasure() {
    this.blockUI.start();

    this.unitOfMeasureService.listUnitOfMeasure().subscribe({
      next: (response: HttpResponse<UnitOfMeasure[] | null>) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this.unitOfMeasureList = response.body;

          if (this.editObject) {
            let unitOfMeasure: any = this.unitOfMeasureList?.find(
              (a) => a.id == this.editObject.unitOfMeasure?.id
            );
            this.productForm.get('unitOfMeasure')?.setValue(unitOfMeasure);
          }
        }
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
}
