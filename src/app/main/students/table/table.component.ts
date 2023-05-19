import { Component, TemplateRef } from '@angular/core';
import { Student } from 'src/app/shared/model/student';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { guardarEstudiante } from 'src/app/store/student/student.actions';

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
    private modalService: BsModalService,
    private readonly store: Store<Student>
  ) {}

  ngOnInit(): void {
    this.servicio.getEstudiantes().subscribe(
      data => {
        this.estudiantes = data;
      }
    );
    this.columnasMostradas = ['id', 'nombre', 'apellido', 'edad', 'correo', 'editar', 'eliminar'];
  }

  botonEditar(estudiante: Student){
    this.store.dispatch(guardarEstudiante({updatedValue: estudiante}));
    this.router.navigate(['landing/estudiantes/editar']);        
  }

  botonEliminar(id: string) {
    this.servicio.deleteEstudiante(id).subscribe(
      data=> {
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
