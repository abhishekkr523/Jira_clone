import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initial'
})
export class InitialPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
   let values = value.split(' ');
   return  values[0][0] + values[1][0];
  }

}
