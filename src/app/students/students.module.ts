import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { EditComponent } from './edit/edit.component';
import { TableComponent } from './table/table.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [StudentsComponent, CreateComponent, EditComponent, TableComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
