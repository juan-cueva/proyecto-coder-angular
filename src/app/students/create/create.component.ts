import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formularioCreacion: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  this.formularioCreacion = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    edad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    correo: ['', [Validators.required, Validators.email]],
    estaActivo: false
  });
  }

}
