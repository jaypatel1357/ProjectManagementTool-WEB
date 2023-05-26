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
import { UserroleDetailsComponent } from '@pages/userrole-details/userrole-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule  } from "@angular/material/icon";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-userrole-list',
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
  templateUrl: './userrole-list.component.html',
  styleUrls: ['./userrole-list.component.scss']
})
export class UserroleListComponent {
//  Userform:any[]=[];
displayedColumns: string[] = ['userId', 'roleId','action'];
dataSource!:MatTableDataSource<any>;
/**
 *
*/
@ViewChild(MatSort) sort!:MatSort
@ViewChild(MatPaginator) paginator!:MatPaginator


constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog) {
 const Userroles=Array.from({length:100},)
 this.dataSource = new MatTableDataSource()
 this.getUserRole();
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
getUserRole(){
  
  // console.log(this.Userform)
  this.apiService.getAllUserRole()
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

deleteuserrole(id:string,user:any){
  if(confirm('Are you sure to delete'))
  this.apiService.deleteUserRole(id)
  .subscribe({
    next:(response)=>{
      this.getUserRole();
    }
  });
}
openuserrole(){
  // debugger
  const dialogRef = this.dialog.open(UserroleDetailsComponent);
  dialogRef.afterClosed().subscribe({
    next:(val) => {
        if(val){
          this.getUserRole();
        }
    },
  });
}
updateuserrole(data:any){
  const dialogRef = this.dialog.open(UserroleDetailsComponent,{
    data,
  });
  dialogRef.afterClosed().subscribe({
    next:(val) => {
      console.log(val);
      
        // if(val){
          this.getUserRole();
        // }
    },
  });
}

}