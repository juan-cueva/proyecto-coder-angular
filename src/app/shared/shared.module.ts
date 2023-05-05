import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombrePipe } from './pipes/nombre.pipe';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsComponent } from '../students/students.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentsModule } from '../students/students.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { CursoPipe } from './pipes/curso.pipe';
import { FuenteDirective } from './fuente.directive';



@NgModule({
  declarations: [
    NombrePipe,    
    CursoPipe,
    FuenteDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    NombrePipe,
    CursoPipe,
    FuenteDirective,
    MaterialModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
