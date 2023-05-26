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
  selector: 'app-company-details',
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
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
 
  companyForm= new FormGroup({
    id:new FormControl(''),
    name:new FormControl(null,Validators.required)
  })
 

  constructor(private apiService:ApiService, 
    private router:Router,
     private route: ActivatedRoute,
     private dialogRef: MatDialogRef<CompanyDetailsComponent>,
     private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any){}
    //public companyForm:FormGroup;
   
  
  
  ngOnInit(){
    this.companyForm.patchValue(this.data);
}

public hasError = (controlName: string, errorName: string) =>{
  return this.companyForm.controls[controlName].hasError(errorName);
}


onSubmit(){
 // debugger
  if (this.data) {
    console.log(this.companyForm.value)
    this.apiService.updateCompany(this.data.id, this.companyForm.value)
      .subscribe({
        next: (result) => {
         // alert("Company Updated")
          this.dialogRef.close(true)
          this.toaster.success("Data Updated Successfully")
        }
      })
  }
  else {
    console.log(this.companyForm.value)
    this.apiService.addCompany(this.companyForm.value)
      .subscribe({
        next: (result) => {
         // alert("Company Added Successfully")
          this.dialogRef.close(true)
          this.toaster.success("Data Added Successfully")
        }
      })
  }
}
  
}


