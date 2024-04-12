import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisplacedComponentComponent } from './misplaced-component.component';

describe('MisplacedComponentComponent', () => {
  let component: MisplacedComponentComponent;
  let fixture: ComponentFixture<MisplacedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisplacedComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisplacedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
