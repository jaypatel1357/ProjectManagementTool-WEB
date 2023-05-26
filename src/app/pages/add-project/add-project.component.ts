import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from "@angular/material/radio";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-project',
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
templateUrl: './add-project.component.html',
styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {

  
    projectName: string;
    projectId:any;
    form!: FormGroup;
    Users:any[]=[];
    ProjectPortfolios:any[]=[];
    //startDate = new FormControl(new Date());
    //endDate = new FormControl(new Date());

    status: string[] = [
      'Active',
      'Inactive',
      'Completed',
    ]
    
    projectForm = new FormGroup({
    id: new FormControl(null),
      // projectName:new FormControl(null, Validators.required),
      projectName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description:new FormControl('', [Validators.required, Validators.maxLength(200)]),
      startDate:new FormControl( '', Validators.required),
      endDate:new FormControl('', Validators.required),
      // isDelete:new FormControl(null, Validators.required),
      ownerId:new FormControl(null, Validators.required),
      projectLeaderId:new FormControl(null, Validators.required),
      projectPortfolioId:new FormControl(null, Validators.required),
      //creationDate:new FormControl(null, Validators.required),
      status:new FormControl('', [Validators.required, Validators.maxLength(200)]),

    });
    constructor(private fb: FormBuilder, 
      private apiService:ApiService, 
      private router:Router,
      private route:ActivatedRoute,
      private dialogRef:MatDialogRef<AddProjectComponent>,
      private toaster:ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: any) { }


      ngOnInit(){
        let startDate:any=new Date();
        // this.projectForm.get("startDate").patchValue(startDate)
        // console.log(this.data)
        // this.projectForm.get("endDate").patchValue(startDate)
        this.projectForm.patchValue(this.data);
        // this.projectForm.patchValue(this.data);
        
        this.apiService.getAllProjectPortfolio()
          .subscribe({
            next:result =>{
              this.ProjectPortfolios=result;
            }
          })
  
        this.apiService.getAllUser()
        .subscribe({
          next:result =>{
            this.Users=result;
          }
        })
      }

    public hasError = (controlName: string, errorName: string) =>{
      return this.projectForm.controls[controlName].hasError(errorName);
    }
    

    onSubmit(){
      if(this.data) {
        console.log(this.projectForm.value)
        this.apiService.updateProject(this.data.id, this.projectForm.value)
          .subscribe({
            next: (result) => {
              // alert("user Updated")
              this.dialogRef.close(true)
              this.toaster.success("Data Updated Successfully")
  
            }
          })
      }
      else {
        console.log(this.projectForm.value)
        this.apiService.addProject(this.projectForm.value)
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
