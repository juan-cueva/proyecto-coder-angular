import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/model/curso';
import { ApiService } from 'src/app/core/core/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formularioCreacion: FormGroup;
  cursos: Curso[] = [];
  activo: boolean = false;
  cursosFinalizados: Curso[] = [];
  body: any = {};
  exitoso: boolean = false;
  fallido: boolean = false;
  estudianteString: any;
  estudiante: any;

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
    })
    this.formularioCreacion = this.fb.group({
      nombre: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      apellido: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$')]],
      edad: ['', [Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.email]],
      estaActivo: this.estudiante.estaActivo,
      cursando: ['']
    });
    if (this.estudiante.estaActivo) {
      this.activar();
    }
    this.cursosFinalizados = this.estudiante.cursosFinalizados;
    console.log(this.estudiante);
    
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
  mostrarCursosFinalizados(i: number): boolean {
    let checkboxCurso = this.cursos[i];
    let resultado;
    for (let i = 0; i < this.estudiante.cursosFinalizados.length; i++) {
      if (this.estudiante.cursosFinalizados[i].id === checkboxCurso.id) {
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
      if (control?.dirty){
        this.body[nombreControl] = nombreControl === 'nombre' || nombreControl === 'apellido' ? (this.formularioCreacion.get(nombreControl)?.value).trim().toUpperCase() : this.formularioCreacion.get(nombreControl)?.value;
      } else {
        this.body[nombreControl] = this.estudiante[nombreControl];
      }
    }
    if(!this.body['estaActivo']) {
      this.body['cursando'] = []
    }
    this.body['cursosFinalizados'] = this.cursosFinalizados; 
    this.service.putEstudiante(this.body['id'], this.body).subscribe((data) => {
      this.exitoso = true;
    }, (error) => {
      this.fallido = true;
    });
    setTimeout(() => this.router.navigate(['estudiantes/tabla']), 1500);
  }

}

