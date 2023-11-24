import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PaginatorService } from 'src/app/services/paginator/paginator.service';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ServiceService } from 'src/app/services/service/service.service';
import { Service } from 'src/app/models/Service';
import { PhoneNumber } from 'src/app/utils/format-phonenumber';
import { Router } from '@angular/router';
import { DialogCancelComponent } from 'src/app/components/dialog-cancel/dialog-cancel.component';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form: UntypedFormGroup;
  today = new Date();
  listLength = 10;
  listServices: Service[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: UntypedFormBuilder,
    private service: ServiceService,
    private paginatorService: PaginatorService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      search: new UntypedFormControl(''),
    });
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.paginatorService.getPageSize();
    this.getListServices();
  }

  ngOnInit(): void {
    const todayStart = new Date();
    this.form.get('search')?.setValue(todayStart);
  }

  getListServices() {
    this.blockUI.start();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 0, 0);

    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listServices(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            todayStart.toISOString(),
            todayEnd.toISOString(),
            true
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          if (data.body.data === null) {
            return [];
          }

          this.listLength = data.body.total!;
          return data.body.data;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.listServices = response;
          // this.dataSource = new MatTableDataSource(this.listClients);
          this.blockUI.stop();
        },
        error: (err) => {
          this.blockUI.stop();
        },
      });
  }

  getListSearch() {
    this.blockUI.start();
    this.paginator.pageIndex = 0;

    const todayStart = new Date(this.form.get('search')?.value);
    todayStart.setHours(0, 0, 0, 0);
    // todayStart.setDate(25);

    const todayEnd = new Date(this.form.get('search')?.value);
    todayEnd.setHours(23, 59, 0, 0);

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service!.listServices(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            todayStart.toISOString(),
            todayEnd.toISOString(),
            true
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          if (data.body.data === null) {
            return [];
          }

          this.listLength = data.body.total!;
          return data.body.data;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.listServices = response;
          // this.dataSource = new MatTableDataSource(this.listClients);
          this.blockUI.stop();
        },
        error: (err) => {
          this.blockUI.stop();
        },
      });
  }

  onPaginatorChange(event: any) {
    this.paginatorService.setPageSize(event.pageSize);
  }

  formatPhoneNumber(number: string): string {
    if (number) {
      const phoneNumber = new PhoneNumber(number);
      return phoneNumber.format();
    } else {
      return '';
    }
  }

  reschedule(item: Service): void {
    this.router.navigateByUrl('/admin/service-edit', {
      state: { editObject: item },
    });
  }

  startService(item: Service): void {
    this.router.navigateByUrl('/admin/service-start', {
      state: { appointment: item },
    });
  }

  // modal de cancelamento
  cancel(item: Service) {
    const dialogRef = this.dialog.open(DialogCancelComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false,
      data: {
        title: 'Cancelar Agendamento',
        text: 'Tem certeza que deseja cancelar este agendamento? Lembrando que esta ação é irreversível!',
      },
    });

    dialogRef.afterClosed().subscribe((_result) => {
      console.log(_result);

      if (_result) {
        item.open = false;
        item.appointmentTime = 0;

        this.editAppointment(item.id, item);
      }
    });
  }

  // realizar o cancelamento da agenda atravez do serviço
  editAppointment(id: number, editAppointment: any) {
    this.service.updateAppointment(id, editAppointment).subscribe({
      next: (response: any) => {
        this.blockUI.stop();

        if (response.status == 200) {
          this._snackBar.open('Cancelamento realizado com sucesso!', 'Fechar', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar'],
          });
          this.getListServices();
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

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
