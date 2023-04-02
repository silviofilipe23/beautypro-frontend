import { HttpResponse } from '@angular/common/http';
import { ClientDTO, RequestClientDTO } from './../../models/Client';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';
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
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss'],
})
export class ClientCreateComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  clientForm!: FormGroup;
  editObject!: ClientDTO;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private service: ClientService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.editObject =
        this.router.getCurrentNavigation()?.extras?.state?.['editObject'];
      console.log(this.editObject);
    }

    this.clientForm = this.fb.group({
      name: new FormControl(this.editObject ? this.editObject.name : '', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      cpf: new FormControl(this.editObject ? this.editObject.cpf : '', [
        Validators.required,
        Validators.maxLength(11),
      ]),
      rg: new FormControl(this.editObject ? this.editObject.rg : '', [
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
      observations: new FormControl(
        this.editObject ? this.editObject.observations : '',
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

  createClient() {
    this.blockUI.start();

    const requestClient = new RequestClientDTO(this.clientForm.value);

    if (this.editObject) {
      this.editClient(this.editObject.id!, requestClient);
    } else {
      this.createNewClient(requestClient);
    }
  }

  editClient(id: number, requestClient: RequestClientDTO) {
    this.service.updateClient(id, requestClient).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this._snackBar.open('Cliente atualizado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/client-list']);
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

  createNewClient(requestClient: RequestClientDTO) {
    this.service.createClient(requestClient).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 201) {
          this._snackBar.open('Cliente cadastrado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/client-list']);
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
