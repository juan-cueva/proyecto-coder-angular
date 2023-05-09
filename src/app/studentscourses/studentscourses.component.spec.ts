import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentscoursesComponent } from './studentscourses.component';

describe('StudentscoursesComponent', () => {
  let component: StudentscoursesComponent;
  let fixture: ComponentFixture<StudentscoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentscoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentscoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
