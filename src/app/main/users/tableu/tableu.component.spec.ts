import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableuComponent } from './tableu.component';

describe('TableuComponent', () => {
  let component: TableuComponent;
  let fixture: ComponentFixture<TableuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
