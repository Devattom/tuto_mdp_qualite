import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayFrenchNumber'
})
export class DisplayFrenchNumberPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const sanitizedNumber = value.replace(/[\s-]/g, '');
    const frenchNumberRegex = /^(?:0033\d+|\+33\(0\)\d+|\+33\d+|0\d{9})$/;

    if (frenchNumberRegex.test(sanitizedNumber)) {
      const standardiseNumberRegex = /^(?:0033|\+33\(0\)|\+33)/;
      const standardisedNumber = sanitizedNumber.replace(standardiseNumberRegex, '0');
      return standardisedNumber.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
    }
      
    return value;
  }
}
