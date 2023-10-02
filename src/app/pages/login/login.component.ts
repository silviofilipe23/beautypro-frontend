import { MessageResponse } from './../../models/Message';
import {
  LoginRequest,
  RequestResetPassword,
} from './../../models/LoginRequest';
import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { HttpResponse } from '@angular/common/http';
import { UserDetails } from 'src/app/models/UserDetails';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public hide: boolean = true;
  public isIframe = false;
  public loginFormData!: UntypedFormGroup;
  public forgotPasswordFormData!: UntypedFormGroup;
  public isLogin: boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private service: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginFormData = this.fb.group({
      username: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });

    this.forgotPasswordFormData = this.fb.group({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
    });
  }

  ngOnInit(): void {}

  public forgotPassword() {
    if (this.forgotPasswordFormData.valid) {
      this.blockUI.start();

      const requestResetPassword: RequestResetPassword = {
        email: this.forgotPasswordFormData.get('email')?.value,
      };

      this.service.reqResetPassword(requestResetPassword).subscribe({
        next: (response: HttpResponse<MessageResponse>) => {
          console.log(response);

          this.blockUI.stop();

          if (response.status == 200) {
            this._snackBar.open(response.body?.message!, 'Fechar', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });

            this.isLogin = true;
          }
        },
        error: (err: any) => {
          console.log(err.error);

          if (err.error.status == 401) {
            this._snackBar.open('Credenciais Inválidas!', 'Fechar', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
          }

          this.blockUI.stop();
        },
      });
    }
  }

  public signIn() {
    if (this.loginFormData.valid) {
      this.blockUI.start();

      const loginRequest: LoginRequest = {
        username: this.loginFormData.get('username')?.value,
        password: this.loginFormData.get('password')?.value,
      };

      this.service.signIn(loginRequest).subscribe({
        next: (response: HttpResponse<UserDetails>) => {
          console.log(response);

          this.blockUI.stop();

          if (response.status == 200) {
            this.setLocalStorageToken(response.body?.accessToken);

            this.setLocalStorageRoles(response.body?.roles);

            this.setLocalStorageUser(response.body!);

            this.router.navigate(['/home']);
          }
        },
        error: (err: any) => {
          console.log(err.error);

          if (err.error.status == 401) {
            this._snackBar.open('Credenciais Inválidas!', 'Fechar', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
          }

          this.blockUI.stop();
        },
      });
    }
  }

  private setLocalStorageUser(user: UserDetails | undefined): void {
    localStorage.setItem('USER_OBJECT', JSON.stringify(user));
  }

  private setLocalStorageRoles(roles: Array<string> | undefined): void {
    localStorage.setItem('USER_ROLES', JSON.stringify(roles));
  }

  private setLocalStorageToken(token: string | undefined): void {
    localStorage.setItem('USER_TOKEN', token!);
  }
}
