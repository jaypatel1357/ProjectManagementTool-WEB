import { Component, ViewChild } from '@angular/core';    
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";

import { ApiService } from '@services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule  } from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon"
import {MatToolbarModule} from "@angular/material/toolbar"
// import {MatLabelModule} from "@angular/material/la"
import { ProjectresourceDetailsComponent } from '@pages/projectresource-details/projectresource-details.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-projectresource-list',
  standalone: true,
  imports: [CommonModule,MatDatepickerModule,MatNativeDateModule,ReactiveFormsModule,MatPaginatorModule,MatTableModule,MatInputModule,MatButtonModule,MatSortModule,MatIconModule,MatDialogModule,MatToolbarModule,MatFormFieldModule],
  templateUrl: './projectresource-list.component.html',
  styleUrls: ['./projectresource-list.component.scss']
})
export class ProjectresourceListComponent {

  displayedColumns: string[] = ['startDate','endDate','projectId','memberId','action'];
  
  
  dataSource!:MatTableDataSource<any>;
 
   startDate = new Date(1990, 0, 1);
 @ViewChild(MatSort) sort!:MatSort
 @ViewChild(MatPaginator) paginator!:MatPaginator
 constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog,) {
  const Users=Array.from({length:100},)
  this.dataSource = new MatTableDataSource()
  this.getProjectResource();
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}
getProjectResource(){

  // console.log(this.Userform)
  this.apiService.getAllprojectresource()
  .subscribe({
    next:(result)=>
    {
      console.log(result)
      this.dataSource=new MatTableDataSource(result);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      // this.Userform=result
    }
  })
}

deleteprojectresource(id:string,projectresource:any){
  if(confirm('Are you sure to delete'))
  this.apiService.deleteprojectresource(id)
  .subscribe({
    next:(response)=>{
      this.getProjectResource();
    }
  });
}
openprojectresource(){
  // debugger
  const dialogRef = this.dialog.open(ProjectresourceDetailsComponent);
  dialogRef.afterClosed().subscribe({
    next:(val) => {
        if(val){
          this.getProjectResource();
        }
    },
  });
}
//  updateprojectreource(data:any){
//    const dialogRef = this.dialog.open(ProjectresourceDetailsComponent,{
//      data,
//    });
//    dialogRef.afterClosed().subscribe({
//       next:(val) => {
//          if(val){
//            this.getProjectResource();
//          }
//      },
//    });
// }
}