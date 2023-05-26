import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectportfolioDetailsComponent } from '@pages/projectportfolio-details/projectportfolio-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ApiService } from '@services/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-projectportfolio-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './projectportfolio-list.component.html',
  styleUrls: ['./projectportfolio-list.component.scss']
})
export class ProjectportfolioListComponent {

  displayedColumns: string[] = ['name', 'description', 'ownerId', 'creationDate', 'action'];
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private dialog: MatDialog, private apiService: ApiService) {
    this.dataSource = new MatTableDataSource();
    this.getAllProjectPortfolio();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openPortfolio() {
   const dialogRef = this.dialog.open(ProjectportfolioDetailsComponent)
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val)
          this.getAllProjectPortfolio();
      }
    })
  }

  getAllProjectPortfolio() {
    this.apiService.getAllProjectPortfolio()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.dataSource = new MatTableDataSource(result)
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      })
  }

  updateProjectPortfolio(data: any) {
    const dialogRef = this.dialog.open(ProjectportfolioDetailsComponent,{data});
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val)
          this.getAllProjectPortfolio();
      }
    })
  }

  deleteProjectPortfolio(id: string, projectPortfolio: any) {
    if (confirm("Are You sure to delete " + projectPortfolio.name + " ?")) {
      this.apiService.deleteProjectPortfolio(id)
        .subscribe({
          next: (res) => {
            this.getAllProjectPortfolio();
          }
        })
    }
  }
}
