import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import{MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {MatTableModule  } from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { ApiService } from '@services/api.service';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule  } from "@angular/material/icon";
import {  RouterModule } from '@angular/router';
import { CompanyDetailsComponent } from '@pages/company-details/company-details.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModuleDetailsComponent } from '@pages/module-details/module-details.component';


@Component({
  selector: 'app-module-list',
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
    RouterModule,
    MatProgressBarModule],
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent {
  displayedColumns: string[] = ['moduleName','action'];
  dataSource!:MatTableDataSource<any>;
  /**
   *
  */
 @ViewChild(MatSort) sort!:MatSort
 @ViewChild(MatPaginator) paginator!:MatPaginator


 constructor(public apiService:ApiService,
 // public loaderservive:LoaderService,
  private _dialog:MatDialogModule,
  private dialog:MatDialog) {
   const Users=Array.from({length:100},)
   this.dataSource = new MatTableDataSource()
   this.getModule();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getModule(){
    
    // console.log(this.Userform)
    this.apiService.getAllModule()
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

  deleteModule(id:string,company:any){
    if(confirm('Are you sure to delete'))
    this.apiService.deleteModule(id)
    .subscribe({
      next:(response)=>{
        this.getModule();
      }
    });
  }
  openModule(){
    // debugger
    const dialogRef = this.dialog.open(ModuleDetailsComponent);
    dialogRef.afterClosed().subscribe({
      next:(val) => {
          if(val){
            this.getModule();
          }
      },
    });
  }
  updateModule(data:any){
    const dialogRef = this.dialog.open(ModuleDetailsComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
          if(val){
            this.getModule();
          }
      },
    });
  } 


}