import { async, TestBed } from '@angular/core/testing';
import { NgShowHideModule } from './ng-show-hide.module';

describe('NgShowHideModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgShowHideModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgShowHideModule).toBeDefined();
  });
});
