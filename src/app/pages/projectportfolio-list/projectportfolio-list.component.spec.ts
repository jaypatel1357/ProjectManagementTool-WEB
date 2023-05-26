import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectportfolioListComponent } from './projectportfolio-list.component';

describe('ProjectportfolioListComponent', () => {
  let component: ProjectportfolioListComponent;
  let fixture: ComponentFixture<ProjectportfolioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectportfolioListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectportfolioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
