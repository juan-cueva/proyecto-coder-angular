import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CursoPipe } from './shared/pipes/curso.pipe';
import { RutasModule } from './routes/rutas.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NombrePipe } from './shared/pipes/nombre.pipe';
import { StudentsModule } from './students/students.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { NavbarModule } from './navbar/navbar.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    RutasModule,
    BrowserAnimationsModule,
    MaterialModule,
    StudentsModule,
    ToolbarModule,
    NavbarModule,
    SharedModule,
    CoreModule,
    SharedModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
