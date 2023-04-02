import { SupplierService } from './../../services/supplier/supplier.service';
import { RequestSupplierDTO, SupplierDTO } from './../../models/Supplier';
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
@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.scss'],
})
export class SupplierCreateComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  supplierForm!: FormGroup;
  editObject!: SupplierDTO;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private service: SupplierService,
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
        Validators.maxLength(11),
      ]),
      email: new FormControl(this.editObject ? this.editObject.email : '', [
        Validators.email,
        Validators.maxLength(64),
      ]),
      phoneNumber: new FormControl(
        this.editObject ? this.editObject.phoneNumber : '',
        [Validators.required, Validators.maxLength(11)]
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
      state: new FormControl(
        this.editObject ? this.editObject.address?.state : '',
        [Validators.maxLength(32)]
      ),
      cep: new FormControl(
        this.editObject ? this.editObject.address?.cep : '',
        [Validators.maxLength(8)]
      ),
    });
  }

  ngOnInit(): void {}

  createSupplier() {
    this.blockUI.start();

    const requestSupplier = new RequestSupplierDTO(this.supplierForm.value);

    if (this.editObject) {
      this.editSupplier(this.editObject.id!, requestSupplier);
    } else {
      this.createNewSupplier(requestSupplier);
    }
  }

  editSupplier(id: number, requestSupplier: RequestSupplierDTO) {
    // this.service.updateSupplier(id, requestSupplier).subscribe({
    //   next: (response: any) => {
    //     this.blockUI.stop();
    //     if (response.status == 200) {
    //       this._snackBar.open('Suppliere atualizado com sucesso.', 'Fechar', {
    //         duration: 5000,
    //         horizontalPosition: this.horizontalPosition,
    //         verticalPosition: this.verticalPosition,
    //         panelClass: ['error-snackbar'],
    //       });
    //       this.router.navigate(['/Supplie-list']);
    //     }
    //   },
    //   error: (err) => {
    //     this.blockUI.stop();
    //     this._snackBar.open(err.error?.message, 'Fechar', {
    //       duration: 5000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //       panelClass: ['error-snackbar'],
    //     });
    //   },
    // });
  }

  createNewSupplier(requestSupplier: RequestSupplierDTO) {
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
}
