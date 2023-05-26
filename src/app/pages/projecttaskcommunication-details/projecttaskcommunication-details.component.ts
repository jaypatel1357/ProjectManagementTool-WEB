import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-projecttaskcommunication-details',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './projecttaskcommunication-details.component.html',
  styleUrls: ['./projecttaskcommunication-details.component.scss']
})
export class ProjecttaskcommunicationDetailsComponent {

  users:any[]=[]  
  projecttasks:any[]=[]
  projecttaskcommunicationForm = new FormGroup({
    id:new FormControl(''),
    comment: new FormControl("", Validators.required),
    commentBy: new FormControl("", Validators.required),
    // userId: new FormControl("", Validators.required),
    parenttaskId: new FormControl("", Validators.required)
    // createdOn: new FormControl("", Validators.required),
    // startDate:  new Date(1990, 0, 1)

});

  constructor(private apiService:ApiService,
     private router:Router,
     private route:ActivatedRoute, 
     private dialogRef: MatDialogRef<ProjecttaskcommunicationDetailsComponent>,
     private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any){}
   //  c.ompanyForm:FormGroup;

  ngOnInit(){
    this.projecttaskcommunicationForm.patchValue(this.data);
    this.apiService.getAllUser().subscribe({next:res=>this.users=res})
    this.apiService.getAllProjectTask().subscribe({next:res=>this.projecttasks=res})
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.projecttaskcommunicationForm.controls[controlName].hasError(errorName);
  }
  
 
  onSubmit(){
    //debugger
    if (this.data) {
      console.log(this.projecttaskcommunicationForm.value)
      this.apiService.updateProjectTaskCommunication(this.data.id, this.projecttaskcommunicationForm.value)
        .subscribe({
          next: (result) => {
            //alert("Designation Updated")
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")

          }
        })
    }
    else {
      console.log(this.projecttaskcommunicationForm.value)
      this.apiService.addProjectTaskCommunication(this.projecttaskcommunicationForm.value)
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