export class CPF {
  private readonly cpf: string;

  constructor(cpf: string) {
    // Remove tudo que não for dígito
    this.cpf = cpf.replace(/\D/g, '');
  }

  format(): string {
    // Adiciona zeros à esquerda para completar 11 dígitos
    const cpf = this.cpf.padStart(11, '0');

    // Formata o CPF no formato XXX.XXX.XXX-XX
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
