import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuComponent } from './createu.component';

describe('CreateuComponent', () => {
  let component: CreateuComponent;
  let fixture: ComponentFixture<CreateuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
