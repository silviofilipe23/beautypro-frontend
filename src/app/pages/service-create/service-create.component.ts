import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/Service';
import { ServiceService } from 'src/app/services/service/service.service';
import { HttpResponse } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Client } from 'src/app/models/Client';
import { map, startWith, switchMap } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { Servicing } from 'src/app/models/Servicing';
import { ServicingService } from 'src/app/services/servicing/servicing.service';
import { User } from 'src/app/models/User';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss'],
})
export class ServiceCreateComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  serviceForm!: UntypedFormGroup;
  editObject!: Service;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  todayDate: Date = new Date();
  availableTime: number[] = [];
  selectedClient!: Client;
  selectedServicing!: Servicing;
  listUsers: User[];
  selectedProfessional!: User;
  allProfessionals: string[] = [];
  filteredOptions: any;
  filteredOptionsServicing: any;
  filteredOptionsProfessional: any;
  clientList: Client[];

  constructor(
    private fb: UntypedFormBuilder,
    private service: ServiceService,
    private clientService: ClientService,
    private servicingService: ServicingService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.editObject =
        this.router.getCurrentNavigation()?.extras?.state?.['editObject'];
      console.log(this.editObject);
    }

    this.serviceForm = this.fb.group({
      dateHour: new UntypedFormControl(
        this.editObject ? this.editObject.dateHour : '',
        [Validators.required]
      ),
      appointmentTime: new UntypedFormControl('', [Validators.required]),
      client: new UntypedFormControl(
        this.editObject ? this.editObject.client : '',
        [Validators.required]
      ),
      servicing: new UntypedFormControl(
        this.editObject ? this.editObject.servicing : '',
        [Validators.required]
      ),
      user: new UntypedFormControl(
        {
          value: this.editObject ? this.editObject.user : '',
          // disabled: this.editObject ? false : true,
        },
        [Validators.required]
      ),
      observations: new UntypedFormControl(
        this.editObject ? this.editObject.observations : ''
      ),
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.serviceForm.get('client')?.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this._filter(value))
    );

    this.filteredOptionsServicing = this.serviceForm
      .get('servicing')
      ?.valueChanges.pipe(
        startWith(''),
        switchMap((value) => this._filterServicing(value))
      );

    if (this.editObject) {
      this.getAvailableTime();
      this.selectedServicing = this.editObject.servicing;
      this.listUsers = this.editObject.servicing.professionalList;
      this.serviceForm.get('user').setValue(this.editObject.user);
      this.selectedProfessional = this.editObject.user;
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  displayFn(option: any) {
    return option ? option.name : undefined;
  }

  displayServicing(option: any) {
    return option ? option.description : undefined;
  }

  displayProfessional(option: any) {
    return option ? option.name : undefined;
  }

  _filter(value: string) {
    return this.clientService
      .listClient(0, 10, typeof value == 'string' ? value : '')
      .pipe(
        map((data) => {
          return data.body.data;
        })
      );
  }

  _filterServicing(value: string) {
    return this.servicingService
      .listServicing(0, 10, typeof value == 'string' ? value : '', true)
      .pipe(
        map((data) => {
          return data.body.data;
        })
      );
  }

  getAvailableTime() {
    this.blockUI.start();

    const todayStart = new Date(this.serviceForm.value.dateHour);
    todayStart.setHours(0, 0, 0, 0);
    // todayStart.setDate(25);

    const todayEnd = new Date(this.serviceForm.value.dateHour);
    todayEnd.setHours(23, 59, 0, 0);

    this.service
      .listAvailableTime(todayStart.toISOString(), todayEnd.toISOString())
      .subscribe({
        next: (response: HttpResponse<number[]>) => {
          console.log(response.body);
          this.availableTime = response.body;

          if (this.availableTime.length === 0) {
            this._snackBar.open(
              'Todos horários preenchidos para esta data.',
              'Fechar',
              {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['error-snackbar'],
              }
            );
          }

          this.blockUI.stop();
        },
        error: (err) => {
          console.log(err);
          this.blockUI.stop();
        },
      });
  }

  selectClient(event: MatAutocompleteSelectedEvent) {
    this.selectedClient = event.option.value;
  }

  selectServicing(event: MatAutocompleteSelectedEvent) {
    this.selectedServicing = event.option.value;
    this.activeProfessionalSelect();
  }

  activeProfessionalSelect() {
    this.serviceForm.get('user').enable();
    this.listUsers = this.selectedServicing.professionalList;
  }

  selectProfessional(event: MatAutocompleteSelectedEvent) {
    this.selectedProfessional = event.option.value;
  }

  setHourToDate(_dateStart, type): string {
    let dateStart = new Date(_dateStart);
    let dateFinish = new Date(_dateStart);

    switch (this.serviceForm.value.appointmentTime) {
      case '1':
        dateStart.setHours(8, 0, 0, 0);
        dateFinish.setHours(10, 0, 0, 0);
        break;

      case '2':
        dateStart.setHours(10, 0, 0, 0);
        dateFinish.setHours(12, 0, 0, 0);
        break;

      case '3':
        dateStart.setHours(12, 0, 0, 0);
        dateFinish.setHours(14, 0, 0, 0);
        break;

      case '4':
        dateStart.setHours(14, 0, 0, 0);
        dateFinish.setHours(16, 0, 0, 0);
        break;

      case '5':
        dateStart.setHours(16, 0, 0, 0);
        dateFinish.setHours(18, 0, 0, 0);
        break;

      default:
        break;
    }

    if (type === 'dateStart') {
      return dateStart.toISOString();
    } else {
      return dateFinish.toISOString();
    }
  }

  createService() {
    if (this.serviceForm.valid) {
      this.blockUI.start();
      let appointment = new Service();
      console.log(this.serviceForm.value.user);

      appointment.client = this.serviceForm.value.client;
      appointment.user = this.serviceForm.value.user;
      appointment.appointmentTime = this.serviceForm.value.appointmentTime;
      appointment.servicing = this.serviceForm.value.servicing;
      appointment.createdDate = new Date().toISOString();
      appointment.observations = this.serviceForm.value.observations;
      appointment.dateHour = this.setHourToDate(
        this.serviceForm.value.dateHour,
        'dateStart'
      );
      appointment.endDate = this.setHourToDate(
        this.serviceForm.value.dateHour,
        'dateFinish'
      );
      appointment.termOfConsent = null;

      console.log(this.editObject);
      appointment.open = true;

      if (this.editObject !== undefined) {
        appointment.id = this.editObject.id;

        this.editAppointment(this.editObject.id!, appointment);
      } else {
        this.createNewAppointment(appointment);
      }
    }
  }

  editAppointment(id: number, editAppointment: any) {
    this.service.updateAppointment(id, editAppointment).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this._snackBar.open('Cliente atualizado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
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

  createNewAppointment(newAppointment: Service) {
    this.service.createAppointment(newAppointment).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 201) {
          this._snackBar.open('Agendamento realizado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
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
}
