import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincodeComponent } from './logincode.component';

describe('LogincodeComponent', () => {
  let component: LogincodeComponent;
  let fixture: ComponentFixture<LogincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogincodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
