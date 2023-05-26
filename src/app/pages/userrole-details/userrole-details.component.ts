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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userrole-details',
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
    ReactiveFormsModule],
  templateUrl: './userrole-details.component.html',
  styleUrls: ['./userrole-details.component.scss']
})
export class UserroleDetailsComponent {
  users: any[] = [];
  roles: any[] = [];
  userroleForm = new FormGroup({
    id: new FormControl(null),
    // userName: new FormControl(null, Validators.required),
    // roleName: new FormControl(null, Validators.required),
    userId: new FormControl(null, Validators.required),
    roleId: new FormControl(null, Validators.required)
  })

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<UserroleDetailsComponent>,
    private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.userroleForm.patchValue(this.data);
    this.apiservice.getAllUser()
      .subscribe({
        next: (result) => {
          this.users = result;
        }
      })
    this.apiservice.getAllRoles()
      .subscribe({
        next: (result) => {
          this.roles = result;
        }
      })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.userroleForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    // debugger
    if (this.data) {
      console.log(this.userroleForm.value)
      this.apiservice.updateUserRole(this.data.id, this.userroleForm.value)
        .subscribe({
          next: (result) => {
            // alert("UserRole Updated")
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")

          }
        })
    }
    else {
      console.log(this.userroleForm.value)
      this.apiservice.addUserRole(this.userroleForm.value)
        .subscribe({
          next: (result) => {
            // alert("UserRole Added Successfully")
            this.dialogRef.close(true)
            this.toaster.success("Data Added Successfully")

          }
        })
    }
  }
}