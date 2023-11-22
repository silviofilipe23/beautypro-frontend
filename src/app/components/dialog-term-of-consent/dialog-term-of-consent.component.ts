import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
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
export class DialogTermOfConsentComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;
  showButtonsSignature: boolean = true;
  appointment: Service;
  anamneseClient: string[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild('canvasElement', { static: false }) canvasElement: ElementRef;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private drawing = false;
  canvasWidth: number;

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
    private _snackBar: MatSnackBar,
    private elRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.canvas = this.canvasElement.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.endDrawing.bind(this));

    this.canvas.addEventListener('touchstart', this.startDrawing.bind(this));
    this.canvas.addEventListener('touchmove', this.draw.bind(this));
    this.canvas.addEventListener('touchend', this.endDrawing.bind(this));
  }

  ngOnInit(): void {
    this.appointment = this.data.appointment;
    console.log(this.appointment);
    this.getAnamneseChecked();

    const canvas = this.elRef.nativeElement.querySelector('canvas');

    document.body.addEventListener(
      'touchstart',
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      false
    );
    document.body.addEventListener(
      'touchend',
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      false
    );

    document.body.addEventListener(
      'touchmove',
      function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      },
      false
    );
  }

  createBase64() {
    this.blockUI.start();
    const image = this.canvas.toDataURL();
    this.service.createBase64Signature(this.appointment.id, image).subscribe({
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

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  saveSignature() {
    // Obtém a assinatura como uma imagem base64
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

  getMousePosition(event: MouseEvent | TouchEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event instanceof TouchEvent) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }
    console.log(clientX - rect.left);

    return {
      x: Math.min(Math.max(clientX, 0), this.canvas.width),
      y: Math.min(Math.max(clientY, 0), this.canvas.height),
    };
  }

  startDrawing(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    console.log(e);

    this.drawing = true;
    const pos = this.getMousePosition(e);
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  draw(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    if (!this.drawing) return;
    const pos = this.getMousePosition(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  endDrawing() {
    this.drawing = false;
    this.ctx.closePath();
  }
}
