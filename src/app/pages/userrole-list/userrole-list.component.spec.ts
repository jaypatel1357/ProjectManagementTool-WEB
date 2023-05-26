import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleListComponent } from './userrole-list.component';

describe('UserroleListComponent', () => {
  let component: UserroleListComponent;
  let fixture: ComponentFixture<UserroleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserroleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserroleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
