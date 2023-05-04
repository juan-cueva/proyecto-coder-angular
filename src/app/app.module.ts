import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentsComponent } from './students/students.component';
import { CursoPipe } from './pipes/curso.pipe';
import { CreateComponent } from './students/create/create.component';
import { RutasModule } from './routes/rutas.module';
import { TableComponent } from './students/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { NombrePipe } from './pipes/nombre.pipe';
import { EditComponent } from './students/edit/edit.component';
import { FuenteDirective } from './directives/fuente.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    NavbarComponent,
    StudentsComponent,
    CursoPipe,
    CreateComponent,
    TableComponent,
    NombrePipe,
    EditComponent, 
    FuenteDirective,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RutasModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
