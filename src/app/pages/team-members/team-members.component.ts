import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit{
members : any = []

constructor(private service: ApiService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    
    this.service.getTeamMembers(id).subscribe(x => {
      this.members = x
    })
  }

}
