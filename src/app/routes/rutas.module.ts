import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { RutasHijasModule } from './rutas-hijas.module';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../core/auth.guard';

const rutas: Routes = [
  { path: '', redirectTo:'/login', pathMatch: 'full'},
  { path: '**', redirectTo:'/login'}, 
  { path: 'login', component: LoginComponent},
  { path: 'landing', component: LayoutComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(rutas), RutasHijasModule
  ],
  exports: [
    RouterModule
  ]
})
export class RutasModule { }
