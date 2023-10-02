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
import { UserService } from 'src/app/services/user/user.service';
import { Service } from 'src/app/models/Service';
import { ServiceService } from 'src/app/services/service/service.service';
import { HttpResponse } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Client } from 'src/app/models/Client';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { Servicing } from 'src/app/models/Servicing';
import { ServicingService } from 'src/app/services/servicing/servicing.service';
import { User } from 'src/app/models/User';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from 'src/app/components/add-product-dialog/add-product-dialog.component';

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
    private serviceUser: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.editObject =
        this.router.getCurrentNavigation()?.extras?.state?.['editObject'];
      console.log(this.editObject);
    }

    this.serviceForm = this.fb.group({
      dateHour: new UntypedFormControl('', [Validators.required]),
      appointmentTime: new UntypedFormControl('', [Validators.required]),
      client: new UntypedFormControl('', [Validators.required]),
      servicing: new UntypedFormControl('', [Validators.required]),
      user: new UntypedFormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    this.getAvailableTime();

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

  _filterProfessional(name: string) {
    console.log(name);

    return this.selectedServicing.professionalList.filter(
      (value) => (value.name = name)
    );
  }

  getAvailableTime() {
    this.blockUI.start();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    // todayStart.setDate(25);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 0, 0);

    this.service
      .listAvailableTime(todayStart.toISOString(), todayEnd.toISOString())
      .subscribe({
        next: (response: HttpResponse<number[]>) => {
          console.log(response.body);
          this.availableTime! = response.body!;
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

  createService() {}
}
