import { SupplierService } from './../../services/supplier/supplier.service';
import { HttpResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/Supplier';
import { Address, City, State } from 'src/app/models/Address';
import { StatesService } from 'src/app/services/states/states.service';
@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.scss'],
})
export class SupplierCreateComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  supplierForm!: FormGroup;
  editObject!: Supplier;
  states: State[] | null = null;
  cities: City[] | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private service: SupplierService,
    private statesService: StatesService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.editObject =
        this.router.getCurrentNavigation()?.extras?.state?.['editObject'];
      console.log(this.editObject);
    }

    this.supplierForm = this.fb.group({
      name: new FormControl(this.editObject ? this.editObject.name : '', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      cnpj: new FormControl(this.editObject ? this.editObject.cnpj : '', [
        Validators.required,
        Validators.maxLength(14),
      ]),
      corporateName: new FormControl(
        this.editObject ? this.editObject.corporateName : '',
        [Validators.required, Validators.maxLength(255)]
      ),
      email: new FormControl(this.editObject ? this.editObject.email : '', [
        Validators.email,
        Validators.maxLength(64),
        Validators.required,
      ]),

      phoneNumber: new FormControl(
        this.editObject ? this.editObject.phoneNumber : '',
        [Validators.required, Validators.maxLength(11)]
      ),
      observations: new FormControl(
        this.editObject ? this.editObject.observations : '',
        []
      ),
      active: new FormControl(
        this.editObject ? this.editObject.active : null,
        []
      ),
      number: new FormControl(
        this.editObject ? this.editObject.address?.number : '',
        [Validators.maxLength(10)]
      ),
      street: new FormControl(
        this.editObject ? this.editObject.address?.street : '',
        [Validators.maxLength(512)]
      ),
      complement: new FormControl(
        this.editObject ? this.editObject.address?.complement : '',
        [Validators.maxLength(512)]
      ),
      district: new FormControl(
        this.editObject ? this.editObject.address?.district : '',
        [Validators.maxLength(32)]
      ),
      city: new FormControl(
        this.editObject ? this.editObject.address?.city : '',
        [Validators.maxLength(32)]
      ),
      state: new FormControl('', []),
      cep: new FormControl(
        this.editObject ? this.editObject.address?.cep : '',
        [Validators.maxLength(8)]
      ),
    });
  }

  ngOnInit(): void {
    this.getStates();
  }

  createSupplier() {
    if (this.supplierForm.valid) {
      this.blockUI.start();

      let supplier = new Supplier();

      supplier.name = this.supplierForm.value.name;
      supplier.cnpj = this.supplierForm.value.cnpj;
      supplier.corporateName = this.supplierForm.value.corporateName;
      supplier.email = this.supplierForm.value.email;
      supplier.phoneNumber = this.supplierForm.value.phoneNumber;
      supplier.observations = this.supplierForm.value.observations;

      let address = new Address();

      address.cep = this.supplierForm.value.cep;
      address.street = this.supplierForm.value.street;
      address.number = this.supplierForm.value.number;
      address.complement = this.supplierForm.value.complement;
      address.district = this.supplierForm.value.district;
      address.city = this.supplierForm.value.city;

      supplier.address = address;

      const requestSupplier = new Supplier(supplier);

      if (this.editObject) {
        requestSupplier.active = this.supplierForm.value.active;

        this.editSupplier(this.editObject.id!, requestSupplier);
      } else {
        requestSupplier.active = true;
        this.createNewSupplier(requestSupplier);
      }
    }
  }

  editSupplier(id: number, requestSupplier: Supplier) {
    this.service.updateSupplier(id, requestSupplier).subscribe({
      next: (response: any) => {
        this.blockUI.stop();
        if (response.status == 200) {
          this._snackBar.open('Fornecedor atualizado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/supplier-list']);
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

  createNewSupplier(requestSupplier: Supplier) {
    this.service.createSupplier(requestSupplier).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 201) {
          this._snackBar.open('Fornecedor cadastrado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/supplier-list']);
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

  getStates() {
    this.blockUI.start();

    this.statesService.getStates().subscribe({
      next: (response: HttpResponse<State[] | null>) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this.states = response.body;

          if (this.editObject) {
            let state: any = this.states?.find(
              (a) => a.id == this.editObject.address?.city?.uf?.id
            );
            this.supplierForm.get('state')?.setValue(state);

            this.getCity(state.id);
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

  onChangeState(event: any) {
    this.getCity(event.value.id);
  }

  getCity(id: number | undefined) {
    this.blockUI.start();

    this.statesService.getCitiesByStateId(id).subscribe({
      next: (response: HttpResponse<City[] | null>) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this.cities = response.body;

          if (this.editObject) {
            let city: any = this.cities?.find(
              (a) => a.id == this.editObject.address?.city?.id
            );
            this.supplierForm.get('city')?.setValue(city);
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
