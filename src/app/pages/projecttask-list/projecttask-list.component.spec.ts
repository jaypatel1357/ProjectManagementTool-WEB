import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttaskListComponent } from './projecttask-list.component';

describe('ProjecttaskListComponent', () => {
  let component: ProjecttaskListComponent;
  let fixture: ComponentFixture<ProjecttaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjecttaskListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecttaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
