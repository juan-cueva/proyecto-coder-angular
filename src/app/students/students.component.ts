import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Student } from '../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public estudiantes: Student[];

  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
    this.router.navigate(['estudiantes/tabla']);
  }
}