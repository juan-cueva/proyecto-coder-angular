import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RutasModule } from '../routes/rutas.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RutasModule
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule { }
