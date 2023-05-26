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
import { ProjecttaskcommunicationDetailsComponent } from '@pages/projecttaskcommunication-details/projecttaskcommunication-details.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-projecttaskcommunication-list',
  standalone: true,
  imports: [CommonModule,MatDatepickerModule,MatNativeDateModule,ReactiveFormsModule,MatPaginatorModule,MatTableModule,MatInputModule,MatButtonModule,MatSortModule,MatIconModule,MatDialogModule,MatToolbarModule,MatFormFieldModule],
  templateUrl: './projecttaskcommunication-list.component.html',
  styleUrls: ['./projecttaskcommunication-list.component.scss']
})
export class ProjectTaskCommunicationListComponent {

  displayedColumns: string[] = ['comment','commentBy','parenttask','action'];
  
  
  dataSource!:MatTableDataSource<any>;
 
   startDate = new Date(1990, 0, 1);
 @ViewChild(MatSort) sort!:MatSort
 @ViewChild(MatPaginator) paginator!:MatPaginator
 constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog,) {
  const Users=Array.from({length:100},)
  this.dataSource = new MatTableDataSource()
  this.getProjectTaskCommunication();
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}
getProjectTaskCommunication(){

  // console.log(this.Userform)
  this.apiService.getAllProjectTaskCommunication()
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

deleteprojecttaskcommunication(id:string,projectresource:any){
  if(confirm('Are you sure to delete'))
  this.apiService.deleteProjectTaskCommunication(id)
  .subscribe({
    next:(response)=>{
      this.getProjectTaskCommunication();
    }
  });
}
openprojecttaskcommunication(){
  // debugger
  const dialogRef = this.dialog.open(ProjecttaskcommunicationDetailsComponent);
  dialogRef.afterClosed().subscribe({
    next:(val) => {
        if(val){
          this.getProjectTaskCommunication();
        }
    },
  });
}
 updateProjectTaskCommunication(data:any){
   const dialogRef = this.dialog.open(ProjecttaskcommunicationDetailsComponent,{
     data,
   });
   dialogRef.afterClosed().subscribe({
      next:(val) => {
         if(val){
           this.getProjectTaskCommunication();
         }
     },
   });
}
}
