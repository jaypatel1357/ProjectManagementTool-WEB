import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttaskcommunicationDetailsComponent } from './projecttaskcommunication-details.component';

describe('ProjecttaskcommunicationDetailsComponent', () => {
  let component: ProjecttaskcommunicationDetailsComponent;
  let fixture: ComponentFixture<ProjecttaskcommunicationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjecttaskcommunicationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecttaskcommunicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
