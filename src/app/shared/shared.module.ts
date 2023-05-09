import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombrePipe } from './pipes/nombre.pipe';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuenteDirective } from './fuente.directive';

@NgModule({
  declarations: [
    NombrePipe,    
    FuenteDirective, 
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  
  ],
  exports: [
    NombrePipe,
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
