import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectresourceListComponent } from './projectresource-list.component';

describe('ProjectresourceListComponent', () => {
  let component: ProjectresourceListComponent;
  let fixture: ComponentFixture<ProjectresourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectresourceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectresourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
