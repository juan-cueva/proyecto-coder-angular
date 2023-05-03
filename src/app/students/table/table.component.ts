import { Component } from '@angular/core';
import { Student } from 'src/app/model/student';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
estudiantes: Student[];
columnasMostradas: string[] = [];
  constructor(
    private servicio: ApiService,
    private router: Router
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

  botonEditar(estudiante: any){
    let estudianteString = JSON.stringify(estudiante);
    this.router.navigate(['estudiantes/editar'],{queryParams: {estudiante: estudianteString}});        
  }
}
