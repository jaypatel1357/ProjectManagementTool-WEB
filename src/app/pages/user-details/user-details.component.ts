import { Component, Inject } from '@angular/core';
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
  selector: 'app-user-details',
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
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {


  companies: any[] = [];
  designation: any[] = [];
  errorMessage: string = '';

  userForm = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    companyId: new FormControl(null, Validators.required),
    designationId: new FormControl(null, Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z0-9$@$!%?&].{7,}$')]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(20)])
  })

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.userForm.patchValue(this.data);
    this.apiservice.getAllCompany()
      .subscribe({
        next: (result) => {
          this.companies = result;
        }
      })
    this.apiservice.getAllDesignation()
      .subscribe({
        next: (result) => {
          this.designation = result;
        }
      })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  get email() { return this.userForm.get('email')! };

  onSubmit() {
    // debugger
    if (this.data) {
      console.log(this.userForm.value)
      this.apiservice.updateUser(this.data.id, this.userForm.value)
        .subscribe({
          next: (result) => {
            // alert("user Updated")
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")

          }
        })
    }
    else {
      console.log(this.userForm.value)
      this.apiservice.addUser(this.userForm.value)
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