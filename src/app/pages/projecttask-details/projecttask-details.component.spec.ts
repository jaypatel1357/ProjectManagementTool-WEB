import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttaskDetailsComponent } from './projecttask-details.component';

describe('ProjecttaskDetailsComponent', () => {
  let component: ProjecttaskDetailsComponent;
  let fixture: ComponentFixture<ProjecttaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjecttaskDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecttaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
