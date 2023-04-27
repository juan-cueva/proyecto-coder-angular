import { Pipe, PipeTransform } from '@angular/core';
import { Curso } from '../model/curso';

@Pipe({
  name: 'cursoPipe'
})
export class CursoPipe implements PipeTransform {
cursos: string = "";
  transform(value: Curso[], ...args: unknown[]): string {
    for(let curso of value){
      this.cursos += ' -' + curso.curso ;
    }
    return this.cursos;
  }

}
