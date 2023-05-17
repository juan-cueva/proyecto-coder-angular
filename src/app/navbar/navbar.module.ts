import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RutasModule } from '../routes/rutas.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RutasModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule { }
