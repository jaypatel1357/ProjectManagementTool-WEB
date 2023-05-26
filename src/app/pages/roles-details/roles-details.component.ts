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
  selector: 'app-roles-details',
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
  templateUrl: './roles-details.component.html',
  styleUrls: ['./roles-details.component.scss']
})
export class RolesDetailsComponent {

  rolesForm = new FormGroup({
    id:new FormControl(''),
    name: new FormControl(null, Validators.required),
    description: new FormControl('',[Validators.required, Validators.minLength(20)])
    
});

  constructor(private apiService:ApiService,
     private router:Router,
     private route:ActivatedRoute, 
     private dialogRef: MatDialogRef<RolesDetailsComponent>,
     private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any){}
   //  c.ompanyForm:FormGroup;

  ngOnInit(){
    this.rolesForm.patchValue(this.data);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.rolesForm.controls[controlName].hasError(errorName);
  }
  
 
  onSubmit(){
    if (this.data) {
      console.log(this.rolesForm.value)
      this.apiService.updateRoles(this.data.id, this.rolesForm.value)
        .subscribe({
          next: (result) => {
            //alert("Designation Updated")
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")

          }
        })
    }
    else {
      console.log(this.rolesForm.value)
      this.apiService.addRoles(this.rolesForm.value)
        .subscribe({
          next: (result) => {
           // alert("Roles Added Successfully")
            this.dialogRef.close(true)
            this.toaster.success("Data Added Successfully")

          }
        })
    }
  }
}