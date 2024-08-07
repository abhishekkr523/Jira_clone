import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initial'
})
export class InitialPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (!value) return '';
    const values = value.split(' ');
    if (values.length < 2) return values[0][0] || '';
    return values[0][0] + values[1][0];
  }
}
