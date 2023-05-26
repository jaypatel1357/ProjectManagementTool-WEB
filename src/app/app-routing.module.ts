import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { LoginComponent } from '@modules/login/login.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AuthGuard } from '@guards/auth.guard';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { SubMenuComponent } from '@pages/main-menu/sub-menu/sub-menu.component';
import { CompanyDetailsComponent } from '@pages/company-details/company-details.component';
import { CompanyListComponent } from '@pages/company-list/company-list.component';
import { DesignationDetailsComponent } from '@pages/designation-details/designation-details.component';
import { DesignationListComponent } from '@pages/designation-list/designation-list.component';
import { ModuleDetailsComponent } from '@pages/module-details/module-details.component';
import { ModuleListComponent } from '@pages/module-list/module-list.component';
import { RolesDetailsComponent } from '@pages/roles-details/roles-details.component';
import { RolesListComponent } from '@pages/roles-list/roles-list.component';
import { UserDetailsComponent } from '@pages/user-details/user-details.component';
import { ProjectDetailsComponent } from '@pages/project-details/project-details.component';
import { ProjecttaskDetailsComponent } from '@pages/projecttask-details/projecttask-details.component';
import { ProjectresourceDetailsComponent } from '@pages/projectresource-details/projectresource-details.component';
import { ProjectresourceListComponent } from '@pages/projectresource-list/projectresource-list.component';
import { ProjectportfolioDetailsComponent } from '@pages/projectportfolio-details/projectportfolio-details.component';
import { UserroleDetailsComponent } from '@pages/userrole-details/userrole-details.component';
import { UserroleListComponent } from '@pages/userrole-list/userrole-list.component';
import { UserrolepermissionDetailComponent } from '@pages/userrolepermission-detail/userrolepermission-detail.component';
import { UserrolepermissionListComponent } from '@pages/userrolepermission-list/userrolepermission-list.component';
import { ProjecttaskcommunicationDetailsComponent } from '@pages/projecttaskcommunication-details/projecttaskcommunication-details.component';
import { ProjectTaskCommunicationListComponent } from '@pages/projecttaskcommunication-list/projecttaskcommunication-list.component';

import { UserListComponent } from './pages/user-list/user-list.component';
import { ViewProjectComponent } from '@pages/view-project/view-project.component';
import { ProjectDescriptionComponent } from '@pages/project-description/project-description.component';
import { ViewTaskComponent } from '@pages/view-task/view-task.component';
import { TaskBlockComponent } from '@pages/task-block/task-block.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'userList',
                component: UserListComponent 
            },
            {
                path : 'view-project',
                component : ViewProjectComponent
            },
            {
                path : 'view-project/project-description/:id',
                component : ProjectDescriptionComponent
            },
            {
                path : 'view-task',
                component : ViewTaskComponent
            },
            {
                path: 'view-task/task/:id',
                component : TaskBlockComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: 'company-details',
                component: CompanyDetailsComponent
            },
            {
                path: 'company-details/:id',
                component: CompanyDetailsComponent
            },
            {
                path: 'company-list',
                component: CompanyListComponent,
            },
            {
                path: 'designation-details',
                component: DesignationDetailsComponent
            },
            {
                path: 'designation-details/:id',
                component: DesignationDetailsComponent
            },
            {
                path: 'designation-list',
                component: DesignationListComponent
            },
            {
                path: 'module-details',
                component: ModuleDetailsComponent
            },
            {
                path: 'module-details/:id',
                component: ModuleDetailsComponent
            },
            {
                path: 'module-list',
                component: ModuleListComponent
            },
            {
                path: 'roles-details',
                component: RolesDetailsComponent
            },
            {
                path: 'roles-details/:id',
                component: RolesDetailsComponent
            },
            {
                path: 'roles-list',
                component: RolesListComponent
            },
            {
                path: 'user-list',
                //  component: UserListComponent,
                // data:{preload:true},
                // loadChildren:() => import('./pages/user-list/user-list.component').then(com => com.UserListComponent)
                loadComponent: () =>
                    import('./pages/user-list/user-list.component').then((c) => c.UserListComponent),
            },
            {
                path: 'user-details',
                component: UserDetailsComponent
            },
            {
                path: 'user-details/:id',
                component: UserDetailsComponent
            },
            {
                path: 'project-details',
                component: ProjectDetailsComponent
            },
            {
                path: 'project-details/:id',
                component: ProjectDetailsComponent
            },
            {
                path: 'project-list',
                loadComponent: () =>
                    import('./pages/project-list/project-list.component').then((c) => c.ProjectListComponent),
            },
            {
                path: 'projecttask-details',
                component: ProjecttaskDetailsComponent
            },
            {
                path: 'projecttask-details/:id',
                component: ProjecttaskDetailsComponent
            },
            {
                path: 'projecttask-list',
                loadComponent: () =>
                    import('./pages/projecttask-list/projecttask-list.component').then((t) => t.ProjecttaskListComponent),
            },
            {
                path: 'projectresource-details',
                component: ProjectresourceDetailsComponent
            },
            {
                path: 'projectresource-details/:id',
                component: ProjectresourceDetailsComponent
            },
            {
                path: 'projectresource-list',
                component: ProjectresourceListComponent
            },
            {
                path: 'projectportfolio-details',
                component: ProjectportfolioDetailsComponent
            },
            {
                path: 'projectportfolio-details/:id',
                component: ProjectportfolioDetailsComponent
            },
            {
                path: 'projectportfolio-list',
                loadComponent: () =>
                    import('./pages/projectportfolio-list/projectportfolio-list.component').then((c) => c.ProjectportfolioListComponent)
            },
            {
                path: 'userrole-details',
                component: UserroleDetailsComponent
            },
            {
                path: 'userrole-details/:id',
                component: UserroleDetailsComponent
            },
            {
                path: 'userrole-list',
                component: UserroleListComponent
            },
            {
                path: 'userrolepermission-details',
                component: UserrolepermissionDetailComponent
            },
            {
                path: 'userrolepermission-details/:id',
                component: UserrolepermissionDetailComponent
            },
            {
                path: 'userrolepermission-list',
                component: UserrolepermissionListComponent
            },
            {
                path: 'projecttaskcommunication-details',
                component: ProjecttaskcommunicationDetailsComponent
            },
            {
                path: 'projecttaskcommunication-details/:id',
                component: ProjecttaskcommunicationDetailsComponent
            },
            {
                path: 'projecttaskcommunication-list',
                component: ProjectTaskCommunicationListComponent
            },
            {
                path: '',
                component: DashboardComponent
                // loadChildren:() => import('./pages/dashboard/dashboard.component').then(com => com.DashboardComponent)
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
