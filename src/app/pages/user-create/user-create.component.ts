import { HttpResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
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
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep/cep.service';
import { PhoneNumber } from 'src/app/utils/format-phonenumber';
import { PhoneInputComponent } from 'src/app/utils/formatePhone';
import { StatesService } from 'src/app/services/states/states.service';
import { User } from 'src/app/models/User';
import { Address, City, State } from 'src/app/models/Address';
import { ERole } from 'src/app/models/ERole';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit, AfterContentInit {
  @BlockUI() blockUI!: NgBlockUI;

  userForm!: UntypedFormGroup;
  editObject!: User;
  states: State[] | null = null;
  cities: City[] | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: UntypedFormBuilder,
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
      name: new UntypedFormControl(this.editObject ? this.editObject.name : '', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      username: new UntypedFormControl(this.editObject ? this.editObject.name : '', [
        Validators.maxLength(128),
        Validators.required,
      ]),
      password: new UntypedFormControl('', [Validators.maxLength(128)]),
      email: new UntypedFormControl(this.editObject ? this.editObject.email : '', [
        Validators.email,
        Validators.maxLength(64),
        Validators.required,
      ]),
      phoneNumber: new UntypedFormControl(
        this.editObject ? this.editObject.phoneNumber : '',
        [Validators.required, Validators.maxLength(11)]
      ),
      observations: new UntypedFormControl(
        this.editObject ? this.editObject.observations : ''
      ),
      active: new UntypedFormControl(this.editObject ? this.editObject.active : null),
      number: new UntypedFormControl(
        this.editObject ? this.editObject.address?.number : '',
        [Validators.maxLength(10)]
      ),
      street: new UntypedFormControl(
        this.editObject ? this.editObject.address?.street : '',
        [Validators.maxLength(512)]
      ),
      complement: new UntypedFormControl(
        this.editObject ? this.editObject.address?.complement : '',
        [Validators.maxLength(512)]
      ),
      district: new UntypedFormControl(
        this.editObject ? this.editObject.address?.district : '',
        [Validators.maxLength(32)]
      ),
      city: new UntypedFormControl(
        this.editObject ? this.editObject.address?.city : '',
        [Validators.maxLength(32)]
      ),
      state: new UntypedFormControl('', []),
      cep: new UntypedFormControl(
        this.editObject ? this.editObject.address?.cep : '',
        [Validators.maxLength(8)]
      ),
    });
  }

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    if (!this.editObject) {
      this.userForm.get('password')?.setValidators(Validators.required);
    }

    this.getStates();
  }

  createUser() {
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      this.blockUI.start();

      let user = new User();

      user.username = this.userForm.value.username;
      user.name = this.userForm.value.name;
      user.email = this.userForm.value.email;
      user.phoneNumber = this.userForm.value.phoneNumber;
      user.observations = this.userForm.value.observations;
      user.roles = [{ id: 2, name: 'ROLE_USER' }];

      let address = new Address();

      address.cep = this.userForm.value.cep;
      address.street = this.userForm.value.street;
      address.number = this.userForm.value.number;
      address.complement = this.userForm.value.complement;
      address.district = this.userForm.value.district;
      address.city = this.userForm.value.city;

      user.address = address;

      const requestUser = new User(user);

      console.log(JSON.stringify(requestUser));

      if (this.editObject) {
        console.log('skdopfkp');

        requestUser.active = this.userForm.value.active;
        this.editUser(this.editObject.id!, requestUser);
      } else {
        requestUser.active = true;
        requestUser.password = this.userForm.value.password;
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
            if (state) {
              this.getCity(state.id);
            }
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
