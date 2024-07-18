import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartRateInfoComponent } from './heart-rate-info.component';

describe('HeartRateInfoComponent', () => {
  let component: HeartRateInfoComponent;
  let fixture: ComponentFixture<HeartRateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartRateInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeartRateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
