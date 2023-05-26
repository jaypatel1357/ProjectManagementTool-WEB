import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '@services/api.service';
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatPaginatorModule} from "@angular/material/paginator"
import { MatTableDataSource, MatTableModule} from "@angular/material/table"
import { MatToolbarModule} from "@angular/material/toolbar"
import {  MatSortModule} from "@angular/material/sort"
import {  MatIconModule} from "@angular/material/icon"
import {  MatDialog, MatDialogModule} from "@angular/material/dialog"
import {MatInputModule} from "@angular/material/input"
import { ProjectDetailsComponent } from '@pages/project-details/project-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-project-list',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {

  displayedColumns: string[] = ['projectName', 'description','Duration', 'ownerId', 'projectLeaderId', 'projectPortfolioId','creationDate', 'status', 'action'];
  dataSource!:MatTableDataSource<any>;
  paginator: any;
  sort: any;
  //startDate=new Date(1990,0,1);
 // endDate=new Date(1990,0,1);

  constructor(private apiService:ApiService,private _dialog:MatDialogModule,private dialog:MatDialog) {
    const Projects=Array.from({length:100},)
    this.dataSource = new MatTableDataSource()
    this.getProjects();
   }
    
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    getProjects(){
      this.apiService.getAllProject()
      .subscribe({
        next:(result)=>
        {
          console.log(result)
          this.dataSource=new MatTableDataSource(result);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
         
        }
      })
    }

    DeleteProject(id:string,project:any){
      if(confirm('Are you sure to delete'))
      this.apiService.deleteProject(id)
      .subscribe({
        next:(response)=>{
          this.getProjects();
        }
      });
    }
    openproject(){
      // debugger
      const dialogRef = this.dialog.open(ProjectDetailsComponent);
      dialogRef.afterClosed().subscribe({
        next:(val) => {
            if(val){
              this.getProjects();
            }
        },
      });
    }
    UpdateProject(data:any){
      console.log(data)
      const dialogRef = this.dialog.open(ProjectDetailsComponent,{
        data,
      });
      dialogRef.afterClosed().subscribe({
        next:(val) => {
          console.log(val);
          
            
              this.getProjects();
            
        },
      });
    }
  
  }