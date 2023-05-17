import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/model/curso';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formularioCreacion: FormGroup;
  cursos: Curso[] = [];
  activo: boolean = false;
  cursando: Curso[] = [];
  body: any = {};
  exitoso: boolean = false;
  fallido: boolean = false;
  estudianteString: any;
  estudiante: any;
  bodyCurso: any;
  cursosDesmarcados: Curso[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.estudianteString = this.route.snapshot.queryParamMap.get('estudiante');
    this.estudiante = this.estudianteString ? JSON.parse(this.estudianteString) : null;
    this.service.getCursos().subscribe((data) => {
      this.cursos = data;
      this.cursos.filter(x => x.capacidad > 0);
    })
    this.formularioCreacion = this.fb.group({
      nombre: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      apellido: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      edad: ['', [Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.email]],
      estaActivo: this.estudiante.estaActivo,
    });
    if (this.estudiante.estaActivo) {
      this.activar();
    }
    this.cursando = this.estudiante.cursando;
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
      if (!this.cursosDesmarcados.some(x => x.id === curso.id) && this.estudiante.cursando.some((x: Curso) => x.id === curso.id)) {
        this.cursosDesmarcados.push(curso);
      } else {
        this.cursosDesmarcados = this.cursosDesmarcados.filter(x => x.id !== curso.id)
      }
      console.log(this.cursosDesmarcados);

    }

  }
  mostrarCursando(i: number): boolean {
    let checkboxCurso = this.cursos[i];
    let resultado;
    for (let i = 0; i < this.estudiante.cursando.length; i++) {
      if (this.estudiante.cursando[i].id === checkboxCurso.id) {
        resultado = true;
        return true;
      }
    }
    resultado = false;
    return false;
  }

  editarEstudiante() {
    this.body['id'] = String(this.estudiante.id);
    for (let nombreControl in this.formularioCreacion.controls) {
      let control = this.formularioCreacion.get(nombreControl);
      if (control?.dirty) {
        this.body[nombreControl] = nombreControl === 'nombre' || nombreControl === 'apellido' ? (this.formularioCreacion.get(nombreControl)?.value).trim().toUpperCase() : this.formularioCreacion.get(nombreControl)?.value;
      } else {
        this.body[nombreControl] = this.estudiante[nombreControl];
      }
    }
    if (!this.body['estaActivo']) {
      this.body['cursando'] = []
    }
    this.body['cursando'] = this.cursando;
    this.service.putEstudiante(this.body['id'], this.body).subscribe((data) => {
      this.exitoso = true;
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
              }, error => {
                this.fallido = true;
              }
            )
          }
        }
      }
      console.log(this.cursosDesmarcados.length);
      if (this.cursosDesmarcados.length > 0) {
        for (let curso of this.cursosDesmarcados) {
          this.bodyCurso = {
            id: Number(curso.id),
            curso: curso.curso,
            capacidad: curso.capacidad + 1
          }
          this.service.putCurso(curso.id, this.bodyCurso).subscribe(
            data => {
              this.exitoso = true;
            }, error => {
              this.fallido = true;
            }
          )
        }
      }
      this.exitoso = true;
      setTimeout(() => this.router.navigate(['landing/estudiantes/tabla']), 1500);
    }, (error) => {
      this.fallido = true;
    });
  }

}

