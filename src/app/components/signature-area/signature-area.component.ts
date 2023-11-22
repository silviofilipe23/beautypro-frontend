import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-signature-area',
  templateUrl: './signature-area.component.html',
  styleUrls: ['./signature-area.component.scss'],
})
export class SignatureAreaComponent {
  // @ViewChild('canvasElement') canvas: ElementRef<HTMLCanvasElement>;
  @Output() base64 = new EventEmitter<string>();
  @Input() showButtons: boolean = true;
  public isMobile: boolean | undefined;
  public isTablet: boolean | undefined;
  public isDesktopDevice: boolean | undefined;

  constructor(private deviceService: DeviceDetectorService) {}

  // ngAfterViewInit() {
  //   this.context = this.canvas.nativeElement.getContext('2d');
  // }

  // onMouseDown(event: MouseEvent) {
  //   event.preventDefault();
  //   const rect = this.canvas.nativeElement.getBoundingClientRect();
  //   this.context.beginPath();
  //   this.context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
  //   this.canvas.nativeElement.addEventListener(
  //     'mousemove',
  //     this.onMouseMove.bind(this)
  //   );

  //   // Adicione um event listener para detectar quando o mouse é solto
  //   this.canvas.nativeElement.addEventListener(
  //     'mouseup',
  //     this.onMouseUp.bind(this)
  //   );
  // }

  // onMouseMove(event: MouseEvent) {
  //   if (event.buttons !== 1) return; // Verifica se o botão esquerdo do mouse está pressionado
  //   const rect = this.canvas.nativeElement.getBoundingClientRect();
  //   this.context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
  //   this.context.stroke();
  // }

  // onMouseUp() {
  //   this.canvas.nativeElement.removeEventListener(
  //     'mousemove',
  //     this.onMouseMove.bind(this)
  //   );
  // }
}
