import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolepermissionListComponent } from './userrolepermission-list.component';

describe('UserrolepermissionListComponent', () => {
  let component: UserrolepermissionListComponent;
  let fixture: ComponentFixture<UserrolepermissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserrolepermissionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserrolepermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
