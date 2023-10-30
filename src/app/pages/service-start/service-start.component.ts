import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogTermOfConsentComponent } from 'src/app/components/dialog-term-of-consent/dialog-term-of-consent.component';
import { Service } from 'src/app/models/Service';

@Component({
  selector: 'app-service-start',
  templateUrl: './service-start.component.html',
  styleUrls: ['./service-start.component.scss'],
})
export class ServiceStartComponent implements OnInit {
  appointment!: Service;
  showForm: boolean = false;

  constructor(public dialog: MatDialog, private router: Router) {
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
          this.showForm = true;
        }
      });
    } else {
      this.showForm = true;
    }
  }
}
