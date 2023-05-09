import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolbarModule } from 'src/app/toolbar/toolbar.module';
import { RutasModule } from 'src/app/routes/rutas.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToolbarModule,
    RutasModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
