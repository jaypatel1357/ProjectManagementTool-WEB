import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectportfolioDetailsComponent } from './projectportfolio-details.component';

describe('ProjectportfolioDetailsComponent', () => {
  let component: ProjectportfolioDetailsComponent;
  let fixture: ComponentFixture<ProjectportfolioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectportfolioDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectportfolioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
