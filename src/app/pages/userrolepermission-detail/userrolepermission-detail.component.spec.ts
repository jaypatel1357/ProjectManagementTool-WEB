import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolepermissionDetailComponent } from './userrolepermission-detail.component';

describe('UserrolepermissionDetailComponent', () => {
  let component: UserrolepermissionDetailComponent;
  let fixture: ComponentFixture<UserrolepermissionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserrolepermissionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserrolepermissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
