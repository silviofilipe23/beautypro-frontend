import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-signature-area',
  templateUrl: './signature-area.component.html',
  styleUrls: ['./signature-area.component.scss'],
})
export class SignatureAreaComponent {
  @ViewChild('canvasElement') canvas: ElementRef<HTMLCanvasElement>;
  @Output() base64 = new EventEmitter<string>();
  @Input() showButtons: boolean = true;
  private context: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  clearCanvas() {
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  saveSignature() {
    const image = this.canvas.nativeElement.toDataURL(); // Obtém a assinatura como uma imagem base64
    this.base64.emit(image);
  }

  onMouseDown(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.context.beginPath();
    this.context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    this.canvas.nativeElement.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this)
    );

    // Adicione um event listener para detectar quando o mouse é solto
    this.canvas.nativeElement.addEventListener(
      'mouseup',
      this.onMouseUp.bind(this)
    );
  }

  onMouseMove(event: MouseEvent) {
    if (event.buttons !== 1) return; // Verifica se o botão esquerdo do mouse está pressionado
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    this.context.stroke();
  }

  onMouseUp() {
    this.canvas.nativeElement.removeEventListener(
      'mousemove',
      this.onMouseMove.bind(this)
    );
  }
}
