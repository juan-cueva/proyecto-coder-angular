import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/core/services/api.service';
import { Curso } from 'src/app/shared/model/curso';

@Component({
  selector: 'app-createc',
  templateUrl: './createc.component.html',
  styleUrls: ['./createc.component.css']
})
export class CreatecComponent implements OnInit{
  
  formularioCreacion: FormGroup;
  exitoso: boolean = false;
  fallido: boolean = false;
  body: Curso;

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioCreacion = this.fb.group({
      curso: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ_ ]+$')]],
      capacidad: ['', [Validators.required]]
    });
  }

  crearCurso() {
    this.body = {
      id: Number(sessionStorage.getItem('idcurso')),
      curso: (this.formularioCreacion.get('curso')?.value).trim().toUpperCase(),
      capacidad: this.formularioCreacion.get('capacidad')?.value
    }
    this.service.postCurso(this.body).subscribe(
      data=>{
        this.exitoso = true;
        setTimeout(() => this.router.navigate(['/landing/cursos/tabla']), 1500)
      }, error => {
        this.fallido = true;
      }
    )
  }
}
