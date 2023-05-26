import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ViewTaskComponent } from '@pages/view-task/view-task.component';




@Component({
  selector: 'app-add-task',
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

  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {

  users:any[]=[]
  project:any[]=[]
  projectTasks:any[]=[]

  status: string[] = [
    'Active',
    'Inactive',
    'Completed',
  ]

  projecttaskForm = new FormGroup({
    id:new FormControl(''),
    title: new FormControl("", Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    status: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    assignMemberId: new FormControl("",Validators.required),
    reviewerBy: new FormControl("",Validators.required),
    createdBy: new FormControl("",Validators.required),
    projectId: new FormControl("", Validators.required),
   // parenttaskId: new FormControl("", Validators.required),
    // startDate:  new Date(1990, 0, 1)

    
    
});

  constructor(private apiService:ApiService,
     private router:Router,
     private route:ActivatedRoute, 
     private dialogRef: MatDialogRef<ViewTaskComponent>,
     private toaster:ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any){}
   //  c.ompanyForm:FormGroup;

  ngOnInit(){
    this.projecttaskForm.patchValue(this.data);

    this.apiService.getAllUser().subscribe({next:res=>this.users=res})
    this.apiService.getAllProject().subscribe({next:res=>this.project=res})
    this.apiService.getAllProject().subscribe({next:res=>this.projectTasks=res})
 
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.projecttaskForm.controls[controlName].hasError(errorName);
  }
  
 
  onSubmit(){
    debugger
    if (this.data) {
      console.log(this.projecttaskForm.value)
      this.apiService.updateProjectTask(this.data.id, this.projecttaskForm.value)
        .subscribe({
          next: (result) => {
            
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")

          }
        })
    }
    else {
      console.log(this.projecttaskForm.value)
      this.apiService.addProjectTask(this.projecttaskForm.value)
        .subscribe({
          next: (result) => {
            this.dialogRef.close(true)
            this.toaster.success("Data Added Successfully")

          }
        })
    }
  }
}
