import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/Service';

@Component({
  selector: 'app-accept-terms-of-consent',
  templateUrl: './accept-terms-of-consent.component.html',
  styleUrls: ['./accept-terms-of-consent.component.scss'],
})
export class AcceptTermsOfConsentComponent implements OnInit {
  appointment: Service;
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

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.appointment =
        this.router.getCurrentNavigation()?.extras?.state?.['appointment'];
      console.log(this.appointment);
    } else {
      this.router.navigate(['/service-list']);
    }
  }

  ngOnInit(): void {
    console.log(this.appointment);
    this.getAnamneseChecked();
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
