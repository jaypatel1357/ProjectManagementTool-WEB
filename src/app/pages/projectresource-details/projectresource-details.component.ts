import { Component, Inject } from '@angular/core';       
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projectresource-details',
  standalone: true,
  imports: [CommonModule,
            MatNativeDateModule,
            MatDatepickerModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatButtonModule,
            MatInputModule,
            MatSelectModule,
            MatDialogModule],
  templateUrl: './projectresource-details.component.html',
  styleUrls: ['./projectresource-details.component.scss']
})
export class ProjectresourceDetailsComponent {

  users:any[]=[]
  project:any[]=[]
  projectresourceForm = new FormGroup({
    id:new FormControl(''),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    projectId: new FormControl("", Validators.required),
    memberId: new FormControl("", Validators.required),
    // startDate:  new Date(1990, 0, 1)

    
    
});

  constructor(private apiService:ApiService,
     private router:Router,
     private route:ActivatedRoute, 
     private dialogRef: MatDialogRef<ProjectresourceDetailsComponent>,
     private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any){}
   //  c.ompanyForm:FormGroup;

  ngOnInit(){
    this.projectresourceForm.patchValue(this.data);
    this.apiService.getAllUser().subscribe({next:res=>this.users=res})
    this.apiService.getAllProject().subscribe({next:res=>this.project=res})
    
 
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.projectresourceForm.controls[controlName].hasError(errorName);
  }
  
 
  onSubmit(){
    if (this.data) {
      console.log(this.projectresourceForm.value)
      this.apiService.updateprojectresource(this.data.id, this.projectresourceForm.value)
        .subscribe({
          next: (result) => {
            //alert("Designation Updated")
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")

          }
        })
    }
    else {
      console.log(this.projectresourceForm.value)
      this.apiService.addprojectresource(this.projectresourceForm.value)
        .subscribe({
          next: (result) => {
           // alert("Designation Added Successfully")
            this.dialogRef.close(true)
            this.toaster.success("Data Added Successfully")

          }
        })
    }
  }
  

}