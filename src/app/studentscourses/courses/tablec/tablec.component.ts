import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/core/core/services/api.service';
import { Curso } from 'src/app/shared/model/curso';

@Component({
  selector: 'app-tablec',
  templateUrl: './tablec.component.html',
  styleUrls: ['./tablec.component.css']
})
export class TablecComponent implements OnInit{
  cursos: Curso[];
  columnasMostradas: string[] = [];
  cursoSeleccionado: Curso;

  constructor(
    private servicio: ApiService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.servicio.getCursos().subscribe(
      data => {
        this.cursos = data;
        sessionStorage.setItem('idcurso', String(this.cursos.length + 1))
      }
    );
    this.columnasMostradas = ['id', 'curso', 'capacidad', 'editar', 'eliminar'];
  }

  botonEditar(curso: Curso) {
    let cursoString = JSON.stringify(curso);
    this.router.navigate(['landing/cursos/editar'],{queryParams: {curso: cursoString}})
  }

  
  mostrarModal(modal: TemplateRef<any>, curso: Curso) {
    this.modalService.show(modal);
    this.cursoSeleccionado = curso;
  }

  cerrarModal(){
    this.modalService.hide();
  }

  eliminarCurso() {
    this.servicio.deleteCurso(String(this.cursoSeleccionado.id)).subscribe(
      data=>{
        this.ngOnInit();
        this.modalService.hide();
      }
    )
  }

}