import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number, locale: string = 'fr-FR'): string {
    if (value == null) {
      return '';
    }
    return new Intl.NumberFormat(locale, { useGrouping: true }).format(value);
  }
}