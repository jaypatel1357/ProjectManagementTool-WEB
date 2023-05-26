import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@services/api.service';
import { AddProjectComponent } from '@pages/add-project/add-project.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatPaginatorModule} from "@angular/material/paginator"
import { MatTableDataSource, MatTableModule} from "@angular/material/table"
import { MatToolbarModule} from "@angular/material/toolbar"
import {  MatSortModule} from "@angular/material/sort"
import {  MatIconModule} from "@angular/material/icon"
import {  MatDialog, MatDialogModule} from "@angular/material/dialog"
import {MatInputModule} from "@angular/material/input"
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule,
    // BrowserModule,
     FormsModule, 
     Ng2SearchPipeModule,
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
    ],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent {

  projects = []
  dataSource!:MatTableDataSource<any>;
  paginator: any;
  sort: any;
  searchText : any;

  constructor(private service : ApiService, private route : ActivatedRoute,private _dialog : MatDialogModule,private dialog : MatDialog){}
  ngOnInit(): void {
    this.service.getAllProject()
    .subscribe({
      next:(result)=>
      {
        this.projects = result
      }
    })
  }
  
  totaldays(startDate: Date, endDate: Date){
    const time = new Date(endDate).getTime() - new Date(startDate).getTime()
    const days = Math.round(time / (1000 * 3600 * 24)) 
    return days
  } 

  dueday(endDate: Date){
    const time = new Date(endDate).getTime() - new Date().getTime()
    const days = Math.round(time / (1000 * 3600 * 24))
    return days
  }


  getProjects(){   
    this.service.getAllProject()
    .subscribe({
      next:(result)=>
      {
        this.projects = result
        console.log(result)
      }
    })
  }

  openproject(){
    const dialogRef = this.dialog.open(AddProjectComponent);
    dialogRef.afterClosed().subscribe({
      next:(val) => {
          if(val){
            this.getProjects();
          }
      },
    });
  }



}
