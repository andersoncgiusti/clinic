import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      value = value.replace(/\D/g, '');
      console.log(value);

      if (value.length > 14) {
        console.log(value);
        value = value.substring(0, 14);
      }

      switch (value.length) {
        case 4:
          console.log(value);
          value = value.replace(/(\d{3})(\d+)/, '$1.$2');
          break;
        case 5:
          console.log(value);
          value = value.replace(/(\d{3})(\d+)/, '$1.$2');
          break;
        case 6:
          console.log(value);
          value = value.replace(/(\d{3})(\d+)/, '$1.$2');
          break;
        case 7:
          console.log(value);
          value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
          break;
        case 8:
          console.log(value);
          value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
          break;
        case 9:
          console.log(value);
          value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
          break;
        case 10:
          console.log(value);
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
          break;
        case 11:
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
          break;
        case 12:
          console.log(value);
          value = value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
          break;
        case 13:
        case 14:
          value = value.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/,
            '$1.$2.$3/$4-$5'
          );
          break;
        default:
          console.log(value);
          return value;
      }
    }
    console.log(value);
    return value;
  }
}
