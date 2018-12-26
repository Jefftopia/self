import { async, TestBed } from '@angular/core/testing';
import { GeomModule } from './geom.module';

describe('GeomModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GeomModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GeomModule).toBeDefined();
  });
});
