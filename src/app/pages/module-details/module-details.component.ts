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
  selector: 'app-module-details',
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
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent {
  constructor(private apiService:ApiService,
     private router:Router,
     private route:ActivatedRoute,
    private dialogRef: MatDialogRef<ModuleDetailsComponent>,
    private toaster:ToastrService,
   @Inject(MAT_DIALOG_DATA) public data: any){}

  moduleForm = new FormGroup({
    id:new FormControl(''),
    moduleName: new FormControl(null, Validators.required)
});

  ngOnInit(){
   
    this.moduleForm.patchValue(this.data)
  } 

  public hasError = (controlName: string, errorName: string) =>{
    return this.moduleForm.controls[controlName].hasError(errorName);
  }
  onSubmit(){
    if (this.data) {
      console.log(this.moduleForm.value)
      this.apiService.updateModule(this.data.id, this.moduleForm.value)
        .subscribe({
          next: (result) => {
           // alert("Company Updated")
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")
          }
        })
    }
    else {
      console.log(this.moduleForm.value)
      this.apiService.addModule(this.moduleForm.value)
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

 
