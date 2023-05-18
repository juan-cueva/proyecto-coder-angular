import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-createu',
  templateUrl: './createu.component.html',
  styleUrls: ['./createu.component.css']
})
export class CreateuComponent {

  formularioCreacion: FormGroup;
  activo: boolean = false;
  body: User;
  exitoso: boolean = false;
  fallido: boolean = false;

  roles: any[] = [
    { id: 1, rol: 'Administrador' },
    { id: 0, rol: 'Usuario' }
  ]

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioCreacion = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z_-]+$')]],
      nombres: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      password: ['', [Validators.required]],
      rol: [''],
      activo: false,
    });
  }

  crearUsuario() {
    this.body = {
      id: "0",
      username: this.formularioCreacion.get('username')?.value.toLowerCase(),
      nombres: this.formularioCreacion.get('nombres')?.value.toUpperCase(),
      activo: this.formularioCreacion.get('activo')?.value,
      rol: this.formularioCreacion.get('rol')?.value,
      password: this.formularioCreacion.get('password')?.value
    }
    this.service.postUsuario(this.body).subscribe(
      data => {
        this.exitoso = true;
        setTimeout(() => this.router.navigate(['/landing/usuarios/tabla']), 1500);
      }, error => {
        this.fallido = true;
      }
    )
  }
}
