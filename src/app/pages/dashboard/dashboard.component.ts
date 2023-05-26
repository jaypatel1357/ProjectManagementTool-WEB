import {Component, ViewChild} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '@services/api.service';
import { UserDetailsComponent } from '@pages/user-details/user-details.component';
import { MatSort } from '@angular/material/sort';
import { CompanyDetailsComponent } from '@pages/company-details/company-details.component';
import { DesignationDetailsComponent } from '@pages/designation-details/designation-details.component';
import { MatPaginator } from '@angular/material/paginator';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    displayedColumns: string[] = ['srno','Name', 'designationName', 'action'];
    dataSource!:MatTableDataSource<any>;

    @ViewChild(MatSort) sort!:MatSort
    @ViewChild(MatPaginator) paginator!:MatPaginator
  totalproject: any;
  totalportfolio: any;
  totaltask: any;
  totaluser: any;
    
    constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog) {
        const Users=Array.from({length:100},)
        this.dataSource = new MatTableDataSource()
        this.getUser();
        this.apiService.getAllProject().subscribe({next:(result)=>this.totalproject=result.length})
        this.apiService.getAllProjectPortfolio().subscribe({next:(result)=>this.totalportfolio=result.length})
        this.apiService.getAllProjectTask().subscribe({next:(result)=>this.totaltask=result.length})
        // this.getCompany();
       }
       applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
          this.dataSource.sort=this.sort;
        //   this.dataSource.paginator=this.paginator;
        }
      }
      //company
      opencompany(){
        // debugger
        const dialogRef = this.dialog.open(CompanyDetailsComponent);
        dialogRef.afterClosed().subscribe({
          next:(val) => {
              if(val){
                this.getUser();
              }
          },
        });
      }
      opendesignation(){
        // debugger
        const dialogRef = this.dialog.open(DesignationDetailsComponent);
        dialogRef.afterClosed().subscribe({
          next:(val) => {
              if(val){
                this.getUser();
              }
          },
        });
      }
     //User
    getUser(){
    
        // console.log(this.Userform)
        this.apiService.getAllUser()
        .subscribe({
          next:(result)=>
          {
            console.log(result)
            this.totaluser=result.length
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

      //avtar

    //   getInitials(nameString , i){
    //     const fullName = nameString.split(' ');
    // const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    // return initials.toUpperCase();
    //   }
      
      getShortName(firstName) { 
        return firstName.split(' ').map(n => n[0]).join('');
        
      }
//       getShortLName(lastName){
//         return lastName.split(' ').map(n => n[0]).join('');

//       }
}
