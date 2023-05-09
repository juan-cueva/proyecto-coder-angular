import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './students/create/create.component';
import { EditComponent } from './students/edit/edit.component';
import { TableComponent } from './students/table/table.component';
import { StudentscoursesComponent } from './studentscourses.component';
import { TablecComponent } from './courses/tablec/tablec.component';
import { CreatecComponent } from './courses/createc/createc.component';
import { EditcComponent } from './courses/editc/editc.component';



@NgModule({
  declarations: [CreateComponent, EditComponent, TableComponent, StudentscoursesComponent, TablecComponent, CreatecComponent, EditcComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    StudentscoursesComponent
  ]
})
export class StudentsCoursesModule { }
