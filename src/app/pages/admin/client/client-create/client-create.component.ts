import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StatesService } from 'src/app/services/states/states.service';
import { Client } from 'src/app/models/Client';
import { Address, City, State } from 'src/app/models/Address';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss'],
})
export class ClientCreateComponent implements OnInit, AfterContentInit {
  @BlockUI() blockUI!: NgBlockUI;

  clientForm!: UntypedFormGroup;
  editObject!: Client;
  states: State[] | null = null;
  cities: City[] | null = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // separatorKeysCodes: number[] = [ENTER, COMMA];
  anamneseCtrl = new FormControl();
  filteredanamneses: Observable<string[]>;
  anamneses: string[] = [];
  allanamneses: string[] = [
    'Alergia',
    'Cirurgia',
    'Cicatrizantes/Face',
    'Neoplasia',
    'Problema ocular',
    'Verrugas/Face',
    'Depressão',
    'H.I.V',
    'Diabetes',
    'Gestante ou lactante',
    'Herpes',
    'Hipertensão',
    'Botox',
    'Medicação',
    'Preenchedor',
    'Uso de ácidos cosméticos',
    'Queloides',
    'Câncer',
    'Alopecia',
    'Psoríase',
    'Epilepsia',
    'Doenças Cardíacas',
    'Lúpus',
  ];

  @ViewChild('anamneseInput') anamneseInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(
    private fb: FormBuilder,
    private service: ClientService,
    private statesService: StatesService,
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
      dateOfBirth: new FormControl(
        this.editObject ? this.editObject.dateOfBirth : '',
        [Validators.required, Validators.maxLength(128)]
      ),
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
        this.editObject ? this.editObject.observations : ''
      ),
      active: new FormControl(this.editObject ? this.editObject.active : null),
      nameResponsible: new FormControl(
        this.editObject ? this.editObject.nameResponsible : ''
      ),
      cpfResponsible: new FormControl(
        this.editObject ? this.editObject.cpfResponsible : ''
      ),
      rgResponsible: new FormControl(
        this.editObject ? this.editObject.rgResponsible : ''
      ),
      anamnese: new FormControl('', [Validators.required]),

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

    this.filteredanamneses = this.anamneseCtrl.valueChanges.pipe(
      startWith(null),
      map((anamnese: string | null) =>
        anamnese ? this._filter(anamnese) : this.allanamneses.slice()
      )
    );
  }

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.getAnamnese(this.editObject ? this.editObject.anamnese : '');
    this.getStates();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our anamnese
    if (value) {
      this.anamneses.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.anamneseCtrl.setValue(null);
  }

  remove(anamnese: string): void {
    const index = this.anamneses.indexOf(anamnese);

    if (index >= 0) {
      this.anamneses.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.anamneses.push(event.option.viewValue);
    this.anamneseInput!.nativeElement.value = '';
    this.anamneseCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allanamneses.filter((anamnese) =>
      anamnese.toLowerCase().includes(filterValue)
    );
  }

  createStringAnamnese(array: string[]) {
    let string = '';
    for (let i = 0; i < array.length; i++) {
      string += `${array[i]},`;
    }
    return string;
  }

  getAnamnese(string: string) {
    const array = string.split(',');
    this.anamneses = array.filter((a) => a !== '');

    this.clientForm.get('anamnese').setValue(this.anamneses);
  }

  createClient() {
    console.log(this.clientForm.value);

    if (this.clientForm.valid) {
      this.blockUI.start();

      let client = new Client();

      client.name = this.clientForm.value.name;
      client.cpf = this.clientForm.value.cpf;
      client.rg = this.clientForm.value.rg;
      client.email = this.clientForm.value.email;
      client.phoneNumber = this.clientForm.value.phoneNumber;
      client.observations = this.clientForm.value.observations;
      client.anamnese = this.createStringAnamnese(this.anamneses);
      client.dateOfBirth = this.clientForm.value.dateOfBirth;
      client.cpfResponsible = this.clientForm.value.cpfResponsible;
      client.rgResponsible = this.clientForm.value.rgResponsible;

      let address = new Address();

      address.cep = this.clientForm.value.cep;
      address.street = this.clientForm.value.street;
      address.number = this.clientForm.value.number;
      address.complement = this.clientForm.value.complement;
      address.district = this.clientForm.value.district;
      address.city = this.clientForm.value.city;

      client.address = address;

      const requestClient = new Client(client);
      console.log(this.editObject === null);
      if (this.editObject.id !== null) {
        requestClient.active = this.clientForm.value.active;

        this.editClient(this.editObject.id!, requestClient);
      } else {
        requestClient.active = true;
        this.createNewClient(requestClient);
      }
    }
  }

  editClient(id: number, requestClient: Client) {
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
          this.router.navigate(['/admin/client-list']);
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
            this.clientForm.get('state')?.setValue(state);

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
            this.clientForm.get('city')?.setValue(city);
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

  //           this.clientForm.get('street')?.setValue(objCep.logradouro);
  //           this.clientForm.get('complement')?.setValue(objCep.complemento);
  //           this.clientForm.get('district')?.setValue(objCep.bairro);
  //           this.clientForm.get('city')?.setValue(objCep.localidade);
  //           this.clientForm.get('state')?.setValue(objCep.uf);
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

  createNewClient(requestClient: Client) {
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
          this.router.navigate(['/admin/client-list']);
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
