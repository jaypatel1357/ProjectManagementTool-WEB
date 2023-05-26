import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeamMembersComponent } from '@pages/team-members/team-members.component';
import { AddProjectComponent } from '@pages/add-project/add-project.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-project-description',
  standalone: true,
  imports: [CommonModule, TeamMembersComponent,RouterModule,MatDialogModule,MatNativeDateModule],
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss']
})
export class ProjectDescriptionComponent {
  project : any =[]
  id = ''

  constructor(private service: ApiService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog){

  }

  ngOnInit(): void {
    
    if(this.route.snapshot.params['id']){
      this.id =this.route.snapshot.params['id']
      this.service.getProject(this.id).subscribe((data)=>{
        this.project = data
        console.log(data)
      })
    }
  }


  DeleteProject(id:string){
    if(confirm('Are you sure to delete'))
    this.service.deleteProject(id)
    .subscribe({
      next:(response)=>{
       this.router.navigate(['view-project'])
      }
    });
  }

  UpdateProject(data:any){
    console.log(data)
    const dialogRef = this.dialog.open(AddProjectComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        console.log(val);
        
        this.service.getProject(this.id).subscribe((data)=>{
          this.project = data
          console.log(data)
        })
          
      },
    });
  }
}
