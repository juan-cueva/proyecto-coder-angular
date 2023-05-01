import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from 'src/app/students/students.component';
import { RutasHijasModule } from './rutas-hijas.module';

const rutas: Routes = [
  { path: 'estudiantes', component: StudentsComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RutasHijasModule, RouterModule.forRoot(rutas)
  ],
  exports: [
    RouterModule
  ]
})
export class RutasModule { }
