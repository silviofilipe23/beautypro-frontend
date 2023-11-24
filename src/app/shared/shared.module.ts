import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone-pipe/phone.pipe';
import { PaymentMethodPipe } from './payment-method-pipe/payment-method-pipe.pipe';

@NgModule({
  declarations: [PhonePipe, PaymentMethodPipe],
  imports: [CommonModule],
  exports: [PhonePipe, PaymentMethodPipe],
})
export class SharedModule {}
