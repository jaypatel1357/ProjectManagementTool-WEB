import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { TaskBlockComponent } from '@pages/task-block/task-block.component';
import { AddTaskComponent } from '@pages/add-task/add-task.component';


import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAccordion} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '@services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule,
            RouterModule,
            MatMenuModule,
            TaskBlockComponent,
            AddTaskComponent,
            MatExpansionModule,
            MatInputModule,
            MatDialogModule,
            Ng2SearchPipeModule,
            MatDatepickerModule,
            MatNativeDateModule,
            ReactiveFormsModule,
            FormsModule,
            MatPaginatorModule,
            MatTableModule,
            MatButtonModule,
            MatSortModule,
            MatIconModule,
            MatToolbarModule,
            MatFormFieldModule
            
            ],
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit{
  displayedColumns: string[] = ['title','assignmemberId','startDate','endDate','status','action'];

  projects : any;
  projectTask : any =[]
  paramId: string;
  panelOpenState = false;
  searchText : any;

  dataSource! : MatTableDataSource<any[]>

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(Component, {static: true}) component: Component;

  constructor(private service: ApiService,private _dialog:MatDialogModule,private dialog:MatDialog)
  {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.service.getAllProject()
    .subscribe({
      next:(result)=>
      {
        this.projects = result
        console.log(this.projects)
      }
    })
  }

  // getprojecttask(id : string){
  //   this.service.getProjectTasks(id)
  //   .subscribe({
  //     next:(result : any)=>
  //     {
  //       console.log(result)
  //       // this.projectTask = result
  //       this.dataSource = new MatTableDataSource(result)
  //       // this.dataSource.sort=this.sort;x
  //       // this.dataSource.paginator=this.paginator;

  //     }
  //   })
  // }

  openprojecttask(){
    // debugger
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe({
      next:(val) => {
      },
    });
  }

  expand(id : string){
    this.paramId = id;
    const data = this.service.getProjectTasks(id).subscribe((data : any) => {
      this.dataSource=new MatTableDataSource(data)
      this.projectTask = data
      console.log(this.dataSource)
      
    })
}

  


}
