import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartRateDetailsComponent } from './heart-rate-details.component';

describe('HeartRateDetailsComponent', () => {
  let component: HeartRateDetailsComponent;
  let fixture: ComponentFixture<HeartRateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartRateDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeartRateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
