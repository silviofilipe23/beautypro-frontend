export class PhoneInputComponent {
  formatPhoneNumber(event: Event) {
    const inputField = event.target as HTMLInputElement;
    const cleaned = inputField.value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      inputField.value = !match[2]
        ? match[1]
        : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
    } else {
      inputField.value = '';
    }
  }
}
