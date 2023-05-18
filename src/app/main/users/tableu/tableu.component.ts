import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-tableu',
  templateUrl: './tableu.component.html',
  styleUrls: ['./tableu.component.css']
})
export class TableuComponent {
  usuarios: User[];
  columnasMostradas: string[] = [];
  usuarioSeleccionado: User;
    constructor(
      private servicio: ApiService,
      private router: Router,
      private modalService: BsModalService
    ) {}
  
    ngOnInit(): void {
      this.servicio.getUsuarios().subscribe(
        data => {
          this.usuarios = data;
          sessionStorage.setItem('id', String(this.usuarios.length+1))
        }
      );
      this.columnasMostradas = ['nombre', 'id', 'rol', 'editar', 'eliminar'];
    }
  
    botonEditar(usuario: any){
      let usuarioString = JSON.stringify(usuario);
      sessionStorage.setItem('usuarioedit', usuarioString);
      this.router.navigate(['landing/usuarios/editar']);        
    }
  
    botonEliminar(id: string) {
      this.servicio.deleteEstudiante(id).subscribe(
        data=> {
          this.ngOnInit();
        }
      )
    }
  
    mostrarModal(modal: TemplateRef<any>, estudiante: User) {
      this.modalService.show(modal);
      this.usuarioSeleccionado = estudiante;
    }
  
    cerrarModal() {
      this.modalService.hide();
    }
  
    eliminarUsuario() {
      this.servicio.deleteUsuario(String(this.usuarioSeleccionado.id)).subscribe(data=>{
        this.ngOnInit();
        this.modalService.hide();
      });
    }
}