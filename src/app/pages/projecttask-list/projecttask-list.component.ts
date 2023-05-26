import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ApiService } from '@services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjecttaskDetailsComponent } from '@pages/projecttask-details/projecttask-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-projecttask-list',
  standalone: true,
  imports: [CommonModule,MatDatepickerModule,MatNativeDateModule,ReactiveFormsModule,MatPaginatorModule,MatTableModule,MatInputModule,MatButtonModule,MatSortModule,MatIconModule,MatDialogModule,MatToolbarModule,MatFormFieldModule],
  templateUrl: './projecttask-list.component.html',
  styleUrls: ['./projecttask-list.component.scss']
})
export class ProjecttaskListComponent {

  displayedColumns: string[] = ['title','description','status','assignmemberId','reviewerbyId','createdbyId','startDate','endDate','projectId','parentprojecttaskId','action'];
  
  
  dataSource!:MatTableDataSource<any>;
 
   startDate = new Date(1990, 0, 1);
 @ViewChild(MatSort) sort!:MatSort
 @ViewChild(MatPaginator) paginator!:MatPaginator
 constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog,) {
  const Users=Array.from({length:100},)
  this.dataSource = new MatTableDataSource()
  this.getprojecttask();
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}
getprojecttask(){

  // console.log(this.Userform)
  this.apiService.getAllProjectTask()
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

deleteprojecttask(id:string,projecttask:any){
  if(confirm('Are you sure to delete'))
  this.apiService.deleteProjectTask(id)
  .subscribe({
    next:(response)=>{
      this.getprojecttask();
    }
  });
}
openprojecttask(){
  // debugger
  const dialogRef = this.dialog.open(ProjecttaskDetailsComponent);
  dialogRef.afterClosed().subscribe({
    next:(val) => {
        if(val){
          this.getprojecttask();
        }
    },
  });
}
 updateprojecttask(data:any){
   const dialogRef = this.dialog.open(ProjecttaskDetailsComponent,{
     data,
   });
   dialogRef.afterClosed().subscribe({
      next:(val) => {
         if(val){
           this.getprojecttask();
         }
     },
   });
}

}