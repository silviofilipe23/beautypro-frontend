import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentMethodPipe',
})
export class PaymentMethodPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'CASH':
        return 'Dinheiro';
      case 'PIX':
        return 'Pix';
      case 'CREDT_CARD':
        return 'Cartão de Crédito';
      default:
        return value; // ou, se preferir, pode retornar um valor padrão
    }
  }
}
