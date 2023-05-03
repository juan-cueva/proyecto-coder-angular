import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from 'src/app/model/curso';
import { Student } from 'src/app/model/student';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formularioCreacion: FormGroup;
  cursos: Curso[] = [];
  activo: boolean = false;
  cursosFinalizados: Curso[] = [];
  body: Student;
  exitoso: boolean = false;
  fallido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioCreacion = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      edad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      estaActivo: false,
      cursando: ['']
    });
    this.service.getCursos().subscribe(
      data => {
        this.cursos = data;
      }
    )
  }
  activar() {
    this.activo = this.formularioCreacion.get('estaActivo')?.value;
    if (this.activo) {
      this.formularioCreacion.controls['cursando'].setValidators([Validators.required]);
    } else {
      this.formularioCreacion.controls['cursando'].clearValidators();
      this.formularioCreacion.get('cursando')?.setValue('');
    }
    this.formularioCreacion.controls['cursando'].updateValueAndValidity();
  }
  guardarCheckbox(event: any, i: number) {
    let curso = this.cursos[i]
    if (event.target.checked) {
      if (!this.cursosFinalizados.some((x) => x.id === curso.id)) {
        this.cursosFinalizados.push(curso);
      }
    } else {
      if (this.cursosFinalizados.some((x) => x.id === curso.id)) {
        this.cursosFinalizados = this.cursosFinalizados.filter((x) => x.id !== curso.id);
      }
    }
  }
  crearEstudiante() {
    this.body = {
      id: Number(sessionStorage.getItem('id')),
      nombre: (this.formularioCreacion.get('nombre')?.value).trim().toUpperCase(),
      apellido: (this.formularioCreacion.get('apellido')?.value).trim().toUpperCase(),
      edad: this.formularioCreacion.get('edad')?.value,
      correo: this.formularioCreacion.get('correo')?.value,
      estaActivo: this.formularioCreacion.get('estaActivo')?.value,
      cursosFinalizados: this.cursosFinalizados,
      cursando: this.formularioCreacion.get('cursando')?.value
    }
    this.service.postEstudiante(this.body).subscribe((data) => {
      this.exitoso = true;
    }, (error) => {
      this.fallido = true;
    });
    setTimeout(() => this.router.navigate(['estudiantes/tabla']), 2000)
  }
}
