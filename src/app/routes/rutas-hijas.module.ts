import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from '../students/students.component';
import { CreateComponent } from '../students/create/create.component';
import { TableComponent } from '../students/table/table.component';
import { EditComponent } from '../students/edit/edit.component';


const rutas: Routes = [
  {
    path: 'estudiantes',
    component: StudentsComponent,
    children: [
      {path: 'crear', component: CreateComponent},
      {path: 'editar', component: EditComponent},
      {path: 'tabla', component: TableComponent}     
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
