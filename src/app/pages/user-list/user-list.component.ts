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


@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
//  Userform:any[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'companyId', 'designationId', 'email','phone', 'mobile', 'address','action'];
  dataSource!:MatTableDataSource<any>;
  /**
   *
  */
 @ViewChild(MatSort) sort!:MatSort
 @ViewChild(MatPaginator) paginator!:MatPaginator


 constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog) {
   const Users=Array.from({length:100},)
   this.dataSource = new MatTableDataSource()
   this.getUser();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUser(){
    
    // console.log(this.Userform)
    this.apiService.getAllUser()
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

  deleteuser(id:string,user:any){
    if(confirm('Are you sure to delete'))
    this.apiService.deleteUser(id)
    .subscribe({
      next:(response)=>{
        this.getUser();
      }
    });
  }
  openuser(){
    // debugger
    const dialogRef = this.dialog.open(UserDetailsComponent);
    dialogRef.afterClosed().subscribe({
      next:(val) => {
          if(val){
            this.getUser();
          }
      },
    });
  }
  updateuser(data:any){
    const dialogRef = this.dialog.open(UserDetailsComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        console.log(val);
        
          // if(val){
            this.getUser();
          // }
      },
    });
  }

}
