import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newInitial'
})
export class NewInitialPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return ''; // Handle null or empty value
    const names = value.split(' ');
    return names.map(name => name[0]).join('').toUpperCase();
  }

}
