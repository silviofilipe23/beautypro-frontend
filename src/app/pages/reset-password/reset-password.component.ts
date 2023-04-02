import { ValidateToken } from './../../models/LoginRequest';
import { MessageResponse } from './../../models/Message';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ResetPassword } from 'src/app/models/LoginRequest';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public resetFormData!: FormGroup;
  @BlockUI() blockUI!: NgBlockUI;
  public hide: boolean = true;
  public hide1: boolean = true;
  public token: string = '';
  public userEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetFormData = this.fb.group(
      {
        email: new FormControl({ value: '', disabled: 'true' }, [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
        ]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
        confirmNewPassword: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
        token: new FormControl({ value: '' }, [
          Validators.required,
          Validators.maxLength(50),
        ]),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {
    console.log('sdkfopakop');

    this.route.queryParams.subscribe((params) => {
      console.log(params!['token']);
      this.token = params!['token'];
      this.userEmail = params!['email'];
      this.validateToken();
    });
  }

  public validateToken() {
    this.blockUI.start();

    const validateTokenObj: ValidateToken = {
      email: this.userEmail,
      token: this.token,
    };

    this.service.validate(validateTokenObj).subscribe({
      next: (response: HttpResponse<MessageResponse>) => {
        console.log(response);

        this.blockUI.stop();

        if (response.status == 200) {
          this.resetFormData.get('email')?.setValue(this.userEmail);
        }
      },
      error: (err: any) => {
        console.log(err.error);
        this.blockUI.stop();
        this._snackBar.open(
          'Token inválido! Tente recuperar a senha novamente.',
          'Fechar',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5000,
          }
        );
        this.router.navigate(['/login']);
      },
    });
  }

  public resetPassword() {
    if (
      this.resetFormData.valid &&
      this.resetFormData.get('newPassword')?.value ==
        this.resetFormData.get('confirmNewPassword')?.value
    ) {
      this.blockUI.start();

      const resetPassword: ResetPassword = {
        email: this.resetFormData.get('email')?.value,
        newPassword: this.resetFormData.get('newPassword')?.value,
        token: '',
      };

      this.service.reqResetPassword(resetPassword).subscribe({
        next: (response: HttpResponse<MessageResponse>) => {
          console.log(response);

          this.blockUI.stop();

          if (response.status == 200) {
            this._snackBar.open(response.body?.message!, 'Fechar', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
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

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmNewPassword = control.get('confirmNewPassword');

    return newPassword &&
      confirmNewPassword &&
      newPassword.value !== confirmNewPassword.value
      ? confirmNewPassword.setErrors({ passwordsMismatch: true })!
      : null;
  }
}
