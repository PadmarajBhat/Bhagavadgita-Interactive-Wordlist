import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BellComponentComponent } from './bell-component.component';

describe('BellComponentComponent', () => {
  let component: BellComponentComponent;
  let fixture: ComponentFixture<BellComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BellComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
