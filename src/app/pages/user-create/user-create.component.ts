import { HttpResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
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
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep/cep.service';
import { PhoneNumber } from 'src/app/utils/format-phonenumber';
import { PhoneInputComponent } from 'src/app/utils/formatePhone';
import { StatesService } from 'src/app/services/states/states.service';
import { City, State } from 'src/app/models/States';
import { User } from 'src/app/models/User';
import { Address } from 'src/app/models/Address';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, AfterContentInit {

  @BlockUI() blockUI!: NgBlockUI;

  userForm!: FormGroup;
  editObject!: User;
  states: State[] | null = null;
  cities: City[] | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private serviceCep: CepService,
    private statesService: StatesService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.editObject =
        this.router.getCurrentNavigation()?.extras?.state?.['editObject'];
      console.log(this.editObject);
    }

    this.userForm = this.fb.group({
      name: new FormControl(this.editObject ? this.editObject.name : '', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      // cpf: new FormControl(this.editObject ? this.editObject.cpf : '', [
      //   Validators.required,
      //   Validators.maxLength(11),
      // ]),
      // rg: new FormControl(this.editObject ? this.editObject.rg : '', [
      //   Validators.required,
      //   Validators.maxLength(11),
      // ]),
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
  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.getStates();
  }

  createUser() {
    if (this.userForm.valid) {
      this.blockUI.start();

      let user = new User();

      user.name = this.userForm.value.name;
      // user.cpf = this.userForm.value.cpf;
      // user.rg = this.userForm.value.rg;
      user.email = this.userForm.value.email;
      user.phoneNumber = this.userForm.value.phoneNumber;
      user.observations = this.userForm.value.observations;

      let address = new Address();

      address.cep = this.userForm.value.cep;
      address.street = this.userForm.value.street;
      address.number = this.userForm.value.number;
      address.complement = this.userForm.value.complement;
      address.district = this.userForm.value.district;
      address.city = this.userForm.value.city;

      user.address = address;

      const requestUser = new User(user);

      if (this.editObject) {
        requestUser.active = this.userForm.value.active;

        this.editUser(this.editObject.id!, requestUser);
      } else {
        requestUser.active = true;
        this.createNewUser(requestUser);
      }
    }
  }

  editUser(id: number, requestUser: User) {
    this.service.updateUser(id, requestUser).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this._snackBar.open('Usere atualizado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/user-list']);
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
            this.userForm.get('state')?.setValue(state);

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
            this.userForm.get('city')?.setValue(city);
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

  /**
   * Busca CEP
   * @param cep
   */
  // getCep(cep: string, event: any) {
  //   if (cep.length == 8) {
  //     this.blockUI.start();
  //     this.serviceCep.getCep(cep).subscribe({
  //       next: (response: HttpResponse<any>) => {
  //         if (response.status == 200) {
  //           console.log(response);

  //           const objCep = response.body;

  //           this.userForm.get('street')?.setValue(objCep.logradouro);
  //           this.userForm.get('complement')?.setValue(objCep.complemento);
  //           this.userForm.get('district')?.setValue(objCep.bairro);
  //           this.userForm.get('city')?.setValue(objCep.localidade);
  //           this.userForm.get('state')?.setValue(objCep.uf);
  //         }

  //         this.blockUI.stop();
  //       },
  //       error: (err) => {
  //         this.blockUI.stop();
  //         this._snackBar.open(err.error?.message, 'Fechar', {
  //           duration: 5000,
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //           panelClass: ['error-snackbar'],
  //         });
  //       },
  //     });
  //   }
  // }

  createNewUser(requestUser: User) {
    this.service.createUser(requestUser).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 201) {
          this._snackBar.open('Usere cadastrado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.router.navigate(['/user-list']);
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
