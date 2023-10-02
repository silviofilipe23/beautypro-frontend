import { User, UserResponse } from 'src/app/models/User';
import { UnitOfMeasure } from './../../models/UnitOfMeasure';
import { HttpResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
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
import {
  AfterContentInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UnitOfMeasureService } from 'src/app/services/unitOfMeasure/unit-of-measure.service';
import { Servicing } from 'src/app/models/Servicing';
import { Supplier } from 'src/app/models/Supplier';
import { map, startWith, switchMap } from 'rxjs/operators';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ServicingService } from 'src/app/services/servicing/servicing.service';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/services/user/user.service';
import { ProductService } from 'src/app/services/product/product.service';
import { AddProductDialogComponent } from 'src/app/components/add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConsumedProducts } from 'src/app/models/ConsumedProducts';

@Component({
  selector: 'app-servicing-create',
  templateUrl: './servicing-create.component.html',
  styleUrls: ['./servicing-create.component.scss'],
})
export class ServicingCreateComponent implements OnInit, AfterContentInit {
  @BlockUI() blockUI!: NgBlockUI;

  servicingForm!: UntypedFormGroup;
  editObject!: Servicing;
  suppliersList: Supplier[] | null = null;
  unitOfMeasureList: UnitOfMeasure[] | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  filteredOptions: any;
  consumedProducts: ConsumedProducts[] = [];

  fruitCtrl = new UntypedFormControl();
  filteredFruits: Observable<string[]>;
  filteredProfessionals: Observable<string[]>;
  filteredProducts: Observable<string[]>;
  fruits: string[] = [];
  professionals: string[] = [];
  products: string[] = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  allProfessionals: string[] = [];
  allProducts: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('professionalInput') professionalInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  @ViewChild('fruitInput') productInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(
    private fb: UntypedFormBuilder,
    private service: ServicingService,
    private serviceUser: UserService,
    private serviceProduct: ProductService,
    private unitOfMeasureService: UnitOfMeasureService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.editObject =
        this.router.getCurrentNavigation()?.extras?.state?.['editObject'];
    }

    this.servicingForm = this.fb.group({
      description: new UntypedFormControl(
        this.editObject ? this.editObject.description : '',
        [Validators.required, Validators.maxLength(255)]
      ),
      price: new UntypedFormControl(
        this.editObject ? this.editObject.price : '',
        [Validators.required]
      ),
      averageTime: new UntypedFormControl(
        this.editObject ? this.editObject.averageTime : '',
        [Validators.required]
      ),
      preService: new UntypedFormControl(
        this.editObject ? this.editObject.preService : '',
        [Validators.required, Validators.maxLength(255)]
      ),
      postService: new UntypedFormControl(
        this.editObject ? this.editObject.postService : '',
        [Validators.required]
      ),
      returnDays: new UntypedFormControl(
        this.editObject ? this.editObject.returnDays : '',
        [Validators.required]
      ),
      active: new UntypedFormControl(
        this.editObject ? this.editObject.active : null
      ),
      professionalList: new UntypedFormControl('', [Validators.required]),
      consumedServicings: new UntypedFormControl('', [Validators.required]),
    });

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );

    this.filteredProfessionals = this.servicingForm
      .get('professionalList')!
      .valueChanges.pipe(
        startWith(null),
        map((prof: string | null) =>
          prof ? this._filterProfessionals(prof) : this.allProfessionals.slice()
        )
      );

    this.filteredProducts = this.servicingForm
      .get('consumedServicings')!
      .valueChanges.pipe(
        startWith(null),
        map((prod: string | null) =>
          prod ? this._filterProducts(prod) : this.allProducts.slice()
        )
      );
  }

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.getAllProfessionals();
    this.getListProfessionals();
  }

  public openInfoDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '544px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      console.log(_result);
    });
  }

  getListProfessionals() {
    if (this.editObject) {
      let array = [];
      for (let i = 0; i < this.editObject.professionalList.length; i++) {
        const element = this.editObject.professionalList[i];

        array.push(element.name);
      }

      this.professionals = array;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  addProfessional(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.professionals.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.servicingForm.get('professionalList')!.setValue(null);
  }

  addProduct(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.servicingForm.get('consumedServicings')!.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  removeProfessional(professional: string): void {
    const index = this.professionals.indexOf(professional);

    if (index >= 0) {
      this.professionals.splice(index, 1);
    }
  }

  removeProduct(product: string): void {
    const index = this.products.indexOf(product);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput!.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  selectedProfessional(event: MatAutocompleteSelectedEvent): void {
    this.professionals.push(event.option.viewValue);
    this.professionalInput!.nativeElement.value = '';
    this.servicingForm.get('professionalList')!.setValue(null);
  }

  selectedProduct(event: MatAutocompleteSelectedEvent): void {
    this.products.push(event.option.viewValue);
    this.productInput!.nativeElement.value = '';
    this.servicingForm.get('consumedServicings')!.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  private _filterProfessionals(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProfessionals.filter((prof) =>
      prof.toLowerCase().includes(filterValue)
    );

    // return this.serviceSupplier
    //   .listSupplier(0, 10, typeof value == 'string' ? value : '', true)
    //   .pipe(
    //     map((data) => {
    //       return data.body.data;
    //     })
    //   );
  }

  private _filterProducts(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProducts.filter((products) =>
      products.toLowerCase().includes(filterValue)
    );
  }

  getAllProfessionals() {
    this.blockUI.start();

    this.serviceUser.listUser(0, 10, null, true).subscribe({
      next: (response: HttpResponse<UserResponse>) => {
        this.blockUI.stop();

        const listProfessionals: any = response.body?.data;

        for (let i = 0; i < listProfessionals?.length; i++) {
          this.allProfessionals!.push(listProfessionals[i].name);
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

  selectedServicing(event: MatAutocompleteSelectedEvent) {
    // this.selectedSupplier = event.option.value;
  }

  displayFn(option: any) {
    return option ? option.name : undefined;
  }

  getOptionText(option: any) {
    return option.name;
  }

  // _filter(value: string) {
  //   return this.serviceSupplier
  //     .listSupplier(0, 10, typeof value == 'string' ? value : '', true)
  //     .pipe(
  //       map((data) => {
  //         return data.body.data;
  //       })
  //     );
  // }

  createServicing() {
    if (this.servicingForm.valid) {
      this.blockUI.start();

      let servicing = new Servicing();

      servicing.description = this.servicingForm.value.description;
      servicing.price = this.servicingForm.value.price;
      servicing.averageTime = this.servicingForm.value.averageTime;
      servicing.preService = this.servicingForm.value.preService;
      servicing.postService = this.servicingForm.value.postService;
      servicing.returnDays = this.servicingForm.value.returnDays;
      servicing.professionalList = this.servicingForm.value.professionalList;
      servicing.consumedProducts = this.consumedProducts;

      const requestServicing = new Servicing(servicing);

      if (this.editObject) {
        requestServicing.active = this.servicingForm.value.active;

        this.editServicing(this.editObject.id!, requestServicing);
      } else {
        requestServicing.active = true;
        this.createNewServicing(requestServicing);
      }
    }
  }

  createNewServicing(newServicing: Servicing) {
    this.service.createServicing(newServicing).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 201) {
          this._snackBar.open('Produto cadastrado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/servicing-list']);
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

  editServicing(id: number, editServicing: Servicing) {
    this.service.updateServicing(id, editServicing).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this._snackBar.open('Produto atualizado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/servicing-list']);
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
