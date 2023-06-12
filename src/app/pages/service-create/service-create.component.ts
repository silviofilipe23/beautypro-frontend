import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Service } from 'src/app/models/Service';

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

  allProfessionals: string[] = [];

  constructor(
    private fb: FormBuilder,
    // private service: ServicingService,
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
      dateHour: new FormControl(''),
      dateHourTime: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  createService() {}
}
