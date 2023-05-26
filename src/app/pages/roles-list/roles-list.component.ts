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
import {  ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RolesDetailsComponent } from '@pages/roles-details/roles-details.component';

@Component({
  selector: 'app-Roles-list',
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
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {
  displayedColumns: string[] = ['name','description','action'];
  dataSource!:MatTableDataSource<any>;
  /**
   *
  */
 @ViewChild(MatSort) sort!:MatSort
 @ViewChild(MatPaginator) paginator!:MatPaginator
 constructor(private apiService:ApiService,private router:Router,private route:ActivatedRoute,private dialog:MatDialog) {
  const Users=Array.from({length:100},)
  this.dataSource = new MatTableDataSource()
  this.getAllRoles();
 }
 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }
 getAllRoles(){
   
   // console.log(this.Userform)
   this.apiService.getAllRoles()
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

 deleteroles(id:string,roles:any){
   if(confirm('Are you sure to delete'))
   this.apiService.deleteRoles(id)
   .subscribe({
     next:(response)=>{
       this.getAllRoles();
     }
   });
 }
 openroles(){
   // debugger
   const dialogRef = this.dialog.open(RolesDetailsComponent);
   dialogRef.afterClosed().subscribe({
     next:(val) => {
         if(val){
           this.getAllRoles();
         }
     },
   });
 }
 updateroles(data:any){
   const dialogRef = this.dialog.open(RolesDetailsComponent,{
     data,
   });
   dialogRef.afterClosed().subscribe({
     next:(val) => {
         if(val){
           this.getAllRoles();
         }
     },
   });
 }
 }