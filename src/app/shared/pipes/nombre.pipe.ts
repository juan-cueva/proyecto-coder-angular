import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrePipe'
})
export class NombrePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let nombre = value.toLowerCase()
    if (value.includes(' ')) {
      const nombres = nombre.toLowerCase().split(' ');
      const nombresMayusculas: any = nombres.map((nombre) => {
        return nombre.charAt(0).toUpperCase() + nombre.slice(1);
      });
      return nombresMayusculas.join(' ');
    }
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }
}
