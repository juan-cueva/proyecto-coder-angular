import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Curso } from 'src/app/shared/model/curso';
import { Student } from 'src/app/shared/model/student';

@Component({
  selector: 'app-editc',
  templateUrl: './editc.component.html',
  styleUrls: ['./editc.component.css']
})
export class EditcComponent implements OnInit{
  
  cursoString: any;
  curso: any;
  formularioCreacion: FormGroup;
  exitoso: boolean = false;
  fallido: boolean = false;
  body: any = {};
  columnasMostradas: string[] = [];
  estudiantes: Student[] = [];
  bodyEstudiante: Student;
  mensaje: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cursoString = this.route.snapshot.queryParamMap.get('curso');
    this.curso = this.cursoString ? JSON.parse(this.cursoString) : null;
    this.service.getEstudiantes().subscribe(
      data=>{
        this.estudiantes = data.filter((x)=>x.cursando.some((y)=>y.id === this.curso.id));
      }
    )
    this.formularioCreacion = this.fb.group({
      curso: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ_ ]+$')]],
      capacidad: ['', [Validators.required]]
    });
    this.columnasMostradas = ['nombre', 'apellido', 'eliminar'];
  }

  editarCurso() {
    for (let nombreControl in this.formularioCreacion.controls) {
      let control = this.formularioCreacion.get(nombreControl);
      if (control?.dirty) {
        this.body[nombreControl] = nombreControl === 'curso' ? (this.formularioCreacion.get(nombreControl)?.value).trim().toUpperCase() : this.formularioCreacion.get(nombreControl)?.value;
      } else {
        this.body[nombreControl] = this.curso[nombreControl];
      }    }
    this.service.postCurso(this.body).subscribe(
      data=>{
        this.exitoso = true;
        this.mensaje = "Se actualizó el curso"
        setTimeout(() => this.router.navigate(['/landing/cursos/tabla']), 1500)
      }, error => {
        this.fallido = true;
        this.mensaje = "El curso no pudo se actualizado"
      }
    )
  }

  botonDesinscribir(estudiante: Student) {
    this.bodyEstudiante = estudiante;
    this.bodyEstudiante['cursando'] = estudiante.cursando.filter((x)=> x.id !== this.curso.id);
    console.log(this.bodyEstudiante);
    this.service.putEstudiante(String(estudiante.id), this.bodyEstudiante).subscribe(
      data=>{
        this.exitoso = true;
        this.mensaje = "Se desinscribió el alumno";
        this.ngOnInit();
      }, error => {
        this.fallido = true;
        this.mensaje = "Estudiante no se pudo desincribir"
      }
    )
  }

}
