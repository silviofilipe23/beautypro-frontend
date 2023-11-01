import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogTermOfConsentComponent } from 'src/app/components/dialog-term-of-consent/dialog-term-of-consent.component';
import { Service } from 'src/app/models/Service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-service-start',
  templateUrl: './service-start.component.html',
  styleUrls: ['./service-start.component.scss'],
})
export class ServiceStartComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  appointment!: Service;
  showForm: boolean = false;
  anamneseClient: string[] = [];
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private service: ServiceService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.appointment =
        this.router.getCurrentNavigation()?.extras?.state?.['appointment'];
      console.log(this.appointment);
    } else {
      this.router.navigate(['/service-list']);
    }
  }

  ngOnInit(): void {
    this.showTermOfConsent();
    this.getAnamneseChecked();
    this.populatePriceService();
  }

  save() {
    console.log(this.appointment);
    this.blockUI.start();

    if (
      this.appointment.paymentType !== null &&
      this.appointment.price !== null
    ) {
      this.appointment.open = false;
      this.appointment.finishedDate = new Date().toISOString();

      this.editAppointment(this.appointment.id!, this.appointment);
    } else {
      this.blockUI.stop();
      this._snackBar.open('Preencha todos os campos!', 'Fechar', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['error-snackbar'],
      });
    }
  }

  editAppointment(id: number, editAppointment: any) {
    this.service.updateAppointment(id, editAppointment).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this._snackBar.open(
            'Procedimento finalizado com sucesso.',
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['error-snackbar'],
            }
          );
          this.router.navigate(['/service-list']);
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

  populatePriceService() {
    this.appointment.price = this.appointment.servicing.price;
  }

  showTermOfConsent() {
    if (this.appointment.base64Signature === null) {
      const dialogRef = this.dialog.open(DialogTermOfConsentComponent, {
        width: '800px',
        disableClose: true,
        autoFocus: false,
        data: { appointment: this.appointment },
      });

      dialogRef.afterClosed().subscribe((_result) => {
        console.log(_result);

        if (_result) {
          this.showForm = _result.accept;
        }
      });
    } else {
      this.showForm = true;
    }
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
