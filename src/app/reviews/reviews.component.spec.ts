import { ComponentFixture, TestBed } from '@angular/core/testing';

import { reviewscomponent } from './reviews.component';

describe('reviewscomponent', () => {
  let component: reviewscomponent;
  let fixture: ComponentFixture<reviewscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ reviewscomponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(reviewscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
