import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Service } from 'src/app/models/Service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-dialog-term-of-consent',
  templateUrl: './dialog-term-of-consent.component.html',
  styleUrls: ['./dialog-term-of-consent.component.scss'],
})
export class DialogTermOfConsentComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  showButtonsSignature: boolean = true;
  appointment: Service;
  anamneseClient: string[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  anamneselist: any[] = [
    {
      name: 'Alergia',
      checked: false,
    },
    {
      name: 'Cirurgia',
      checked: false,
    },
    {
      name: 'Cicatrizantes/Face',
      checked: false,
    },
    {
      name: 'Neoplasia',
      checked: false,
    },
    {
      name: 'Problema ocular',
      checked: false,
    },
    {
      name: 'Verrugas/Face',
      checked: false,
    },
    {
      name: 'Depressão',
      checked: false,
    },
    {
      name: 'H.I.V',
      checked: false,
    },
    {
      name: 'Diabetes',
      checked: false,
    },
    {
      name: 'Gestante ou lactante',
      checked: false,
    },
    {
      name: 'Herpes',
      checked: false,
    },
    {
      name: 'Hipertensão',
      checked: false,
    },
    {
      name: 'Botox',
      checked: false,
    },
    {
      name: 'Medicação',
      checked: false,
    },
    {
      name: 'Preenchedor',
      checked: false,
    },
    {
      name: 'Uso de ácidos cosméticos',
      checked: false,
    },
    {
      name: 'Queloides',
      checked: false,
    },
    {
      name: 'Câncer',
      checked: false,
    },
    {
      name: 'Alopecia',
      checked: false,
    },
    {
      name: 'Psoríase',
      checked: false,
    },
    {
      name: 'Epilepsia',
      checked: false,
    },
    {
      name: 'Doenças Cardíacas',
      checked: false,
    },
    {
      name: 'Lúpus',
      checked: false,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogTermOfConsentComponent>,
    @Inject(DIALOG_DATA) public data: { appointment?: Service },
    private service: ServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.appointment = this.data.appointment;
    console.log(this.appointment);
    this.getAnamneseChecked();
  }

  getBase64($event) {
    this.blockUI.start();
    console.log($event);

    this.service.createBase64Signature(this.appointment.id, $event).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 201) {
          this._snackBar.open('Aceite realizado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });

          this.showButtonsSignature = false;
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

  closeModal() {
    this.dialogRef.close({
      accept: true,
    });
  }

  getAnamneseChecked() {
    const array = this.appointment.client.anamnese.split(',');
    this.anamneseClient = array.filter((a) => a !== '');

    for (let i = 0; i < this.anamneseClient.length; i++) {
      const element = this.anamneseClient[i];

      for (let j = 0; j < this.anamneselist.length; j++) {
        if (element === this.anamneselist[j].name) {
          console.log(element);

          this.anamneselist[j].checked = true;
          break;
        }
      }
    }
  }
}
