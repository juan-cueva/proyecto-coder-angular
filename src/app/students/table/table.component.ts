import { Component } from '@angular/core';
import { Student } from 'src/app/model/student';
import { Curso } from 'src/app/model/curso';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
estudiantes: Student[];
columnasMostradas: string[] = [];
  constructor(
    private servicio: ApiService
  ) {}

  ngOnInit(): void {
    this.servicio.getEstudiantes().subscribe(
      data => {
        this.estudiantes = data;
        sessionStorage.setItem('id', String(this.estudiantes.length+1))
      }
    );
    this.columnasMostradas = ['id', 'nombre', 'apellido', 'edad', 'correo', 'cursosFinalizados', 'cursando', 'editar', 'eliminar'];
  }
  cursos: Curso[] =[
    new Curso (1, 'Metodologías Ágiles', 20),
    new Curso (2, 'Desarrollo Web', 20),
    new Curso (3, 'JavaScript', 20),
    new Curso (4, 'Angular', 20),
    new Curso (5, 'Programación Backend', 20)
  ]
  // estudiantes: Student[] = [
  //   new Student (1, 'Andrés', 'Cortez', 21, 'acortez@gmail.com', true, [this.cursos[0], this.cursos[1]]),
  //   new Student (2, 'Felipe', 'Sánchez', 19, 'felipesan@gmail.com', false, [this.cursos[0]]),
  //   new Student (3, 'Tatiana', 'Aguirre', 29, 'daguirre@gmail.com', true, [this.cursos[0], this.cursos[1], this.cursos[2]]),
  //   new Student (4, 'Camilo', 'Lopez', 23, 'camilopez@gmail.com', false, [this.cursos[1]]),
  //   new Student (5, 'Gerónimo', 'Rodríguez', 18, 'gerodriguez@gmail.com', true, [this.cursos[0], this.cursos[1]]),
  //   new Student (6, 'Sandra', 'Grande', 28, 'sandragra@gmail.com', true, [this.cursos[0], this.cursos[1], this.cursos[4]])
  // ];
}