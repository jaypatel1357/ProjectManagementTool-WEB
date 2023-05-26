import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectresourceDetailsComponent } from './projectresource-details.component';

describe('ProjectresourceDetailsComponent', () => {
  let component: ProjectresourceDetailsComponent;
  let fixture: ComponentFixture<ProjectresourceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectresourceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectresourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
