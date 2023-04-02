export class PhoneNumber {
  private readonly phoneNumber: string;

  constructor(phoneNumber: string) {
    // Remove tudo que não for dígito
    this.phoneNumber = phoneNumber.replace(/\D/g, '');
  }

  format(): string {
    // Adiciona zeros à esquerda para completar 11 dígitos
    const phoneNumber = this.phoneNumber.padStart(11, '0');

    // Formata o número de telefone no formato XX XXXXX-XXXX
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3');
  }
}
