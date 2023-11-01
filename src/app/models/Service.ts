import { Client } from './Client';
import { EPaymentType } from './EPaymentType';
import { Servicing } from './Servicing';
import { TermOfConsent } from './TermOfConsent';
import { User } from './User';

export class Service {
  id: number | undefined;
  dateHour: string | undefined;
  dateHourReturn: string | undefined;
  createdDate: string | undefined;
  endDate: string | undefined;
  observations: string | undefined;
  client: Client | undefined;
  termOfConsent: TermOfConsent | undefined;
  servicing: Servicing | undefined;
  user: User | undefined;
  open: boolean | undefined;
  serviceProvided: boolean | undefined;
  appointmentTime: number | undefined;
  base64Signature: string | undefined;
  price: number | undefined;
  paymentType: EPaymentType | undefined;
  finishedDate: string | undefined;
}
