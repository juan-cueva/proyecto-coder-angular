import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from 'src/app/shared/model/curso';
import { Student } from 'src/app/shared/model/student';
import { ApiService } from 'src/app/core/core/services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formularioCreacion: FormGroup;
  cursos: Curso[] = [];
  activo: boolean = false;
  cursando: Curso[] = [];
  body: Student;
  exitoso: boolean = false;
  fallido: boolean = false;
  bodyCurso: any;

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
      estaActivo: false
    });
    this.service.getCursos().subscribe(
      data => {
        this.cursos = data;
        this.cursos.filter(x=> x.capacidad > 0);
      }
    )
  }
  activar() {
    this.activo = this.formularioCreacion.get('estaActivo')?.value;
  }
  guardarCheckbox(event: any, i: number) {
    let curso = this.cursos[i]
    if (event.target.checked) {
      if (!this.cursando.some((x) => x.id === curso.id)) {
        this.cursando.push(curso);
      }
    } else {
      if (this.cursando.some((x) => x.id === curso.id)) {
        this.cursando = this.cursando.filter((x) => x.id !== curso.id);
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
      cursando: this.cursando
    }
    this.service.postEstudiante(this.body).subscribe((data) => {
      for (const curso of this.cursando) {
        for (let i = 0; i < this.cursos.length; i++) {
          if (this.cursos[i].id === curso.id) {
            this.bodyCurso = {
              id: Number(curso.id),
              curso: curso.curso,
              capacidad: curso.capacidad - 1
            }
            this.service.putCurso(curso.id, this.bodyCurso).subscribe(
              data => {
                this.exitoso = true;
                setTimeout(() => this.router.navigate(['/landing/estudiantes/tabla']), 1500);
              }, error => {
                this.fallido = true;
              }
            )
          }
        }
      }
      this.exitoso = true;
      setTimeout(() => this.router.navigate(['/landing/estudiantes/tabla']), 1500)
    }, (error) => {
      this.fallido = true;
    });
  }
}
