import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituComponent } from './editu.component';

describe('EdituComponent', () => {
  let component: EdituComponent;
  let fixture: ComponentFixture<EdituComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdituComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdituComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
