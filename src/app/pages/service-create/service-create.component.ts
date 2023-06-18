import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss'],
})
export class ServiceCreateComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  serviceForm!: FormGroup;
  editObject!: Service;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  filteredOptions: any;
  todayDate: Date = new Date();
  availableTime: number[] = [];

  allProfessionals: string[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private serviceUser: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.editObject =
        this.router.getCurrentNavigation()?.extras?.state?.['editObject'];
      console.log(this.editObject);
    }

    this.serviceForm = this.fb.group({
      dateHour: new FormControl('', [Validators.required]),
      appointmentTime: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAvailableTime();
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

  createService() {}
}
