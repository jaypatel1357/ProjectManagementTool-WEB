import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '@services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table' 
import { ActivatedRoute, Router } from '@angular/router';
import { AddTaskComponent } from '@pages/add-task/add-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-task-block',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatTableModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './task-block.component.html',
  styleUrls: ['./task-block.component.scss']
})
export class TaskBlockComponent implements OnInit{

  taskData : any = []

 constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog, private route: ActivatedRoute, private router: Router) {
  const Users=Array.from({length:100},)

 }
  ngOnInit(): void {
   const id = this.route.snapshot.params['id']
    this.apiService.getTask(id).subscribe((data) =>{
      this.taskData = data
      console.log(this.taskData)
   })
  }


//  applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();

//   if (this.dataSource.paginator) {
//     this.dataSource.paginator.firstPage();
//   }

// }


deleteprojecttask(){
  const id = this.route.snapshot.params['id']
  if(confirm('Are you sure to delete'))
  this.apiService.deleteProjectTask(id)
  .subscribe({
    next:()=>{
     this.router.navigate(['view-task'])
  }
})
}
// openprojecttask(){
  // debugger
  // const dialogRef = this.dialog.open(ProjecttaskDetailsComponent);
  // dialogRef.afterClosed().subscribe({
  //   next:(val) => {
  //       if(val){
  //         this.getprojecttask();
  //       }
  //   },
  // });
// }
 updateprojectreource(data:any){
   const dialogRef = this.dialog.open(AddTaskComponent,{
     data,
   });
   dialogRef.afterClosed().subscribe({
      next:(val) => {
         if(val){
          this.apiService.getTask(this.route.snapshot.params['id']).subscribe((data) =>{
            this.taskData = data
            console.log(this.taskData)
         }
   )};
}

  })
 }
}
