import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-editu',
  templateUrl: './editu.component.html',
  styleUrls: ['./editu.component.css']
})
export class EdituComponent {

  formularioCreacion: FormGroup;
  usuario: any;
  activo: boolean = false;
  body: any = {};
  exitoso: boolean = false;
  fallido: boolean = false;

  roles: any[] = [
    { id: 0, rol: 'Usuario' },
    { id: 1, rol: 'Administrador' }
  ]

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const usuarioString: any = sessionStorage.getItem('usuarioedit');
    this.usuario = JSON.parse(usuarioString);
    this.formularioCreacion = this.fb.group({
      username: ['', [ Validators.pattern('^[a-zA-Z_-]+$')]],
      nombres: ['', [ Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      password: [''],
      rol: [''],
      activo: this.usuario.activo
    });
  }
  editarUsuario() {
    for (let nombreControl in this.formularioCreacion.controls) {
      let control = this.formularioCreacion.get(nombreControl);
      if (control?.dirty) {
        this.body[nombreControl] = nombreControl === 'nombres' ? (this.formularioCreacion.get(nombreControl)?.value).trim().toUpperCase() : this.formularioCreacion.get(nombreControl)?.value;
      } else {
        this.body[nombreControl] = this.usuario[nombreControl];
      }
    }
    this.service.putUsuario(this.usuario.id,this.body).subscribe(
      data => {
        this.exitoso = true;
        setTimeout(() => this.router.navigate(['/landing/usuarios/tabla']), 1500);
      }, error => {
        this.fallido = true;
      }
    )
  }
}
