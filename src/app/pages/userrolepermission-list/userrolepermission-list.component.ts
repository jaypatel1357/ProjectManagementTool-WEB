import { Component, ViewChild, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import{MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {MatTableModule  } from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { ApiService } from '@services/api.service';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UserDetailsComponent } from '@pages/user-details/user-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule  } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { UserrolepermissionDetailComponent } from '@pages/userrolepermission-detail/userrolepermission-detail.component';


@Component({
  selector: 'app-userrolepermission-list',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    RouterModule],
  templateUrl: './userrolepermission-list.component.html',
  styleUrls: ['./userrolepermission-list.component.scss']
})
export class UserrolepermissionListComponent {
//  Userform:any[]=[];
displayedColumns: string[] = [ 'userRoleId', 'moduleId', 'action'];
dataSource!:MatTableDataSource<any>;
/**
 *
*/
@ViewChild(MatSort) sort!:MatSort
@ViewChild(MatPaginator) paginator!:MatPaginator


constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog) {
 const Userrolespermission=Array.from({length:100},)
 this.dataSource = new MatTableDataSource()
 this.getUserRolePermission();
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
getUserRolePermission(){
  
  // console.log(this.Userform)
  this.apiService.getAllUserRolePermission()
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

deleteUserRolePermission(id:string,userrole:any){
  if(confirm('Are you sure to delete'))
  this.apiService.deleteUserRolePermission(id)
  .subscribe({
    next:(response)=>{
      this.getUserRolePermission();
    }
  });
}
openuserrolepermission(){
  // debugger
  const dialogRef = this.dialog.open(UserrolepermissionDetailComponent);
  dialogRef.afterClosed().subscribe({
    next:(val) => {
        if(val){
          this.getUserRolePermission();
        }
    },
  });
}
updateUserRolePermission(data:any){
  const dialogRef = this.dialog.open(UserrolepermissionDetailComponent,{
    data,
  });
  dialogRef.afterClosed().subscribe({
    next:(val) => {
      console.log(val);
      
        // if(val){
          this.getUserRolePermission();
        // }
    },
  });
}


}
