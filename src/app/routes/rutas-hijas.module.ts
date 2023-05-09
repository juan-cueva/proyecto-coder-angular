import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { TableComponent } from '../studentscourses/students/table/table.component';
import { CreateComponent } from '../studentscourses/students/create/create.component';
import { EditComponent } from '../studentscourses/students/edit/edit.component';
import { StudentscoursesComponent } from '../studentscourses/studentscourses.component';
import { TablecComponent } from '../studentscourses/courses/tablec/tablec.component';
import { CreatecComponent } from '../studentscourses/courses/createc/createc.component';
import { EditcComponent } from '../studentscourses/courses/editc/editc.component';


const rutas: Routes = [
  {
    path: 'landing',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'estudiantes', pathMatch: 'full'},
      {path: 'estudiantes', component: StudentscoursesComponent, children:[
        {path: '', redirectTo: 'tabla', pathMatch: 'full'},
        {path: 'tabla', component: TableComponent},
        {path: 'crear', component: CreateComponent},
        {path: 'editar', component: EditComponent}
      ]},
      {path: 'cursos', component: StudentscoursesComponent, children:[
        {path: '', redirectTo: 'tabla', pathMatch: 'full'},
        {path: 'tabla', component: TablecComponent},
        {path: 'crear', component: CreatecComponent},
        {path: 'editar', component: EditcComponent}
      ]}      

    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],
  exports: [
    RouterModule
  ]
})
export class RutasHijasModule { }
