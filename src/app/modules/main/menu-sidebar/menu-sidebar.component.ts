import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-home',
        path: ['/']
    },
    {
        name: 'User',
        iconClasses: 'fas fa-user',
        path: ['/user-list']
    },
    {
        name: 'Company',
        iconClasses: 'fas fa-city',
        path: ['/company-list']
    },
    {
        name: 'Designation',
        iconClasses: 'far fa-id-card',
        path: ['/designation-list']
    },
    {
        name: 'Project',
        iconClasses: 'fas fa-folder',        
        children: [
            {
                name: 'Projects',
                iconClasses: 'far fa-address-book',
                path: ['/view-project']
            },
            {
                name : 'Tasks',
                iconClasses: 'far fa-address-book',
                path: ['/view-task']
            }
        ]

},
    {
        name: 'Module',
        iconClasses: 'fab fa-buffer',
        path: ['/module-list']
    },
    {
        name: 'Roles',
        iconClasses: 'fas fa-id-card-alt',
        path: ['/roles-list']
    },
    {
        name: 'ProjectResource',
        iconClasses: 'fas fa-tools',
        path: ['/projectresource-list']
    },
    {
        name: 'ProjectPortfolio',
        iconClasses: 'far fa-list-alt',
        path: ['/projectportfolio-list']
    },
    {
        name: 'UserRoles',
        iconClasses: 'fas fa-chalkboard-teacher',
        path: ['/userrole-list']
    },
    {
        name: 'UserRolesPermission',
        iconClasses: 'fas fa-user-lock',
        path: ['/userrolepermission-list']
    },
    {
        name: 'ProjectTaskCommunication',
        iconClasses: 'fas fa-people-arrows',
        path: ['/projecttaskcommunication-list']
    }
    
];
