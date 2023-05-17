import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';

import { AuthGuard } from '../core/auth.guard';
import { MainComponent } from '../main/main.component';
import { TableComponent } from '../main/students/table/table.component';
import { CreateComponent } from '../main/students/create/create.component';
import { EditComponent } from '../main/students/edit/edit.component';
import { TablecComponent } from '../main/courses/tablec/tablec.component';
import { CreatecComponent } from '../main/courses/createc/createc.component';
import { EditcComponent } from '../main/courses/editc/editc.component';


const rutas: Routes = [
  {
    path: 'landing',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'estudiantes', pathMatch: 'full'},
      {path: 'estudiantes', component: MainComponent, children:[
        {path: '', redirectTo: 'tabla', pathMatch: 'full'},
        {path: 'tabla', component: TableComponent},
        {path: 'crear', component: CreateComponent},
        {path: 'editar', component: EditComponent}
      ], canActivateChild: [AuthGuard]},
      {path: 'cursos', component: MainComponent, children:[
        {path: '', redirectTo: 'tabla', pathMatch: 'full'},
        {path: 'tabla', component: TablecComponent},
        {path: 'crear', component: CreatecComponent},
        {path: 'editar', component: EditcComponent}
      ], canActivateChild: [AuthGuard]}      

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
