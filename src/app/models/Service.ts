import { Client } from './Client';
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
  appointmentTime: number | undefined;
}
