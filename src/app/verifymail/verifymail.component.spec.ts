import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifymailComponent } from './verifymail.component';

describe('VerifymailComponent', () => {
  let component: VerifymailComponent;
  let fixture: ComponentFixture<VerifymailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifymailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifymailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
