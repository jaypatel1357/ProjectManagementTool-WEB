import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '@services/api.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { DialogRef } from "@angular/cdk/dialog";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-userrolepermission-detail',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './userrolepermission-detail.component.html',
  styleUrls: ['./userrolepermission-detail.component.scss']
})
export class UserrolepermissionDetailComponent {
  roles: any[] = [];
  modules: any[] = [];
  userrolepermissionForm = new FormGroup({
    id: new FormControl(null),
    userRoleId: new FormControl(null, Validators.required),
    moduleId: new FormControl(null, Validators.required),
  })

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<UserrolepermissionDetailComponent>,
    private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.userrolepermissionForm.patchValue(this.data);
    this.apiservice.getAllRoles()
      .subscribe({
        next: (result) => {
          this.roles = result;
        }
      })
    this.apiservice.getAllModule()
      .subscribe({
        next: (result) => {
          this.modules = result;
        }
      })
  }

  onSubmit() {
    // debugger
    if (this.data) {
      console.log(this.userrolepermissionForm.value)
       this.apiservice.updateUserRolePermission(this.data.id, this.userrolepermissionForm.value)
        .subscribe({
         next: (result) => {
           // alert("user Updated")
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")

          }
      })
    }
    else {
      console.log(this.userrolepermissionForm.value)
      this.apiservice.addUserRolePermission(this.userrolepermissionForm.value)
        .subscribe({
          next: (result) => {
            // alert("user Added Successfully")
            this.dialogRef.close(true)
            this.toaster.success("Data Added Successfully")

          }
        })
    }
  }
}
