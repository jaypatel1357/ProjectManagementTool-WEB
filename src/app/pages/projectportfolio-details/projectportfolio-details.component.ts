import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule,MatRippleModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle, MatDatepickerToggleIcon } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projectportfolio-details',
  standalone: true,
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
   
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  
    // MatDatepickerToggleIcon
  ],
  templateUrl: './projectportfolio-details.component.html',
  styleUrls: ['./projectportfolio-details.component.scss']
})
export class ProjectportfolioDetailsComponent {
  users:any[]=[];
  
  projectPortfolioForm = new FormGroup({
    id:new FormControl(''),
    name: new FormControl(null, Validators.required),
    description: new FormControl("", Validators.required),
    ownerId: new FormControl("", Validators.required),
    // creationDate: new FormControl("",Validators.required)
});

  constructor(private apiService:ApiService,
     private router:Router,
     private route:ActivatedRoute, 
     private dialogRef: MatDialogRef<ProjectportfolioDetailsComponent>,
     private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any){}
   //  c.ompanyForm:FormGroup;

  ngOnInit(){
    this.projectPortfolioForm.patchValue(this.data);
    this.apiService.getAllUser().subscribe({next:res=>this.users=res})
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.projectPortfolioForm.controls[controlName].hasError(errorName);
  }
  
 
  onSubmit(){
    if (this.data) {
      console.log(this.projectPortfolioForm.value)
      this.apiService.updateProjectPortfolio(this.data.id, this.projectPortfolioForm.value)
        .subscribe({
          next: (result) => {
            this.dialogRef.close(true)
            this.toaster.success("Data Updated Successfully")
          }
        })
    }
    else {
      console.log(this.projectPortfolioForm.value)
      this.apiService.addProjectPortfolio(this.projectPortfolioForm.value)
        .subscribe({
          next: (result) => {
            this.dialogRef.close(true)
            this.toaster.success("Data Added Successfully")

          }
        })
    }
  }

  // saveRange(){
  //   console.log(this.projectPortfolioForm.value);
  // }
}
