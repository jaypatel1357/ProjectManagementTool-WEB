import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttaskcommunicationListComponent } from './projecttaskcommunication-list.component';

describe('ProjecttaskcommunicationListComponent', () => {
  let component: ProjecttaskcommunicationListComponent;
  let fixture: ComponentFixture<ProjecttaskcommunicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjecttaskcommunicationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecttaskcommunicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
