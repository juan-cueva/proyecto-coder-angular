import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from '../core/auth.guard';
import { MainComponent } from '../main/main.component';
import { TableComponent } from '../main/students/table/table.component';
import { CreateComponent } from '../main/students/create/create.component';
import { EditComponent } from '../main/students/edit/edit.component';
import { TablecComponent } from '../main/courses/tablec/tablec.component';
import { CreatecComponent } from '../main/courses/createc/createc.component';
import { EditcComponent } from '../main/courses/editc/editc.component';
import { LayoutComponent } from '../layout/layout.component';
import { TableuComponent } from '../main/users/tableu/tableu.component';
import { CreateuComponent } from '../main/users/createu/createu.component';
import { EdituComponent } from '../main/users/editu/editu.component';
import { AdminGuard } from '../core/admin.guard';


const rutas: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
      {
        path: 'estudiantes',
        component: MainComponent,
        children: [
          { path: '', redirectTo: 'tabla', pathMatch: 'full' },
          { path: 'tabla', component: TableComponent },
          { path: 'crear', component: CreateComponent },
          { path: 'editar', component: EditComponent }
        ],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'cursos',
        component: MainComponent,
        children: [
          { path: '', redirectTo: 'tabla', pathMatch: 'full' },
          { path: 'tabla', component: TablecComponent },
          { path: 'crear', component: CreatecComponent },
          { path: 'editar', component: EditcComponent }
        ],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'usuarios',
        component: MainComponent,
        children: [
          { path: '', redirectTo: 'tablau', pathMatch: 'full' },
          { path: 'tabla', component: TableuComponent },
          { path: 'crear', component: CreateuComponent },
          { path: 'editar', component: EdituComponent }
        ],
        canActivateChild: [AuthGuard, AdminGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutas)
  ]
})
export class RutasHijasModule { }