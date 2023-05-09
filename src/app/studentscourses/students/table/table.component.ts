import { Component, TemplateRef } from '@angular/core';
import { Student } from 'src/app/shared/model/student';
import { ApiService } from 'src/app/core/core/services/api.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
estudiantes: Student[];
columnasMostradas: string[] = [];
estudianteSeleccionado: Student;
  constructor(
    private servicio: ApiService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.servicio.getEstudiantes().subscribe(
      data => {
        this.estudiantes = data;
        sessionStorage.setItem('id', String(this.estudiantes.length+1))
      }
    );
    this.columnasMostradas = ['id', 'nombre', 'apellido', 'edad', 'correo', 'editar', 'eliminar'];
  }

  botonEditar(estudiante: any){
    let estudianteString = JSON.stringify(estudiante);
    this.router.navigate(['landing/estudiantes/editar'],{queryParams: {estudiante: estudianteString}});        
  }

  botonEliminar(id: string) {
    this.servicio.deleteEstudiante(id).subscribe(
      data=> {
        console.log(data);
        this.ngOnInit();
      }
    )
  }

  mostrarModal(modal: TemplateRef<any>, estudiante: Student) {
    this.modalService.show(modal);
    this.estudianteSeleccionado = estudiante;
  }

  cerrarModal() {
    this.modalService.hide();
  }

  eliminarEstudiante() {
    this.servicio.deleteEstudiante(String(this.estudianteSeleccionado.id)).subscribe(data=>{
      this.ngOnInit();
      this.modalService.hide();
    });
  }
}
