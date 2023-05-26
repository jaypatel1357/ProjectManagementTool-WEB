import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseApiUrl: string = environment.baseApiUrl;
 
    constructor(private http: HttpClient) { }

    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    //Company
    getAllCompany(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/company/getAll')
    }

    getCompany(id: string): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/company?id=' + id)
    }


    addCompany(addCompanyRequest): Observable<any> {
        addCompanyRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/api/company', addCompanyRequest)
    }

    updateCompany(id: string, Company: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/api/company?id=' + id, Company)
    }
    deleteCompany(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/api/company?id=' + id)
    }
    //Designation
    getAllDesignation(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/designation/getall')
    }

    getDesignation(id: string): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/designation?id=' + id)
    }


    addDesignation(addDesignationRequest): Observable<any> {
        addDesignationRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/api/designation', addDesignationRequest)
    }

    updateDesignation(id: string, designation: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/api/designation?id=' + id, designation)
    }
    deleteDesignation(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/api/designation?id=' + id)
    }
    //Module
    getAllModule(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/module/getall')
    }

    getModule(id: string): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/module?id=' + id)
    }


    addModule(addModuleRequest): Observable<any> {
        addModuleRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/api/module', addModuleRequest)
    }

    updateModule(id: string, module: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/api/module?id=' + id, module)
    }
    deleteModule(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/api/module?id=' + id)
    }
    //user
    getAllUser(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/getalluser')
    }

    getByUserId(id: string): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/getuser?id=' + id);
    }

    addUser(adduserRequest): Observable<any> {
        adduserRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/adduser', adduserRequest)
    }

    updateUser(id: string, user: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/updateuser', user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/deleteuser?id=' + id);
    }
    //Roles

    getAllRoles(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/roles/getall')
    }

    getRoles(id: string): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/roles?id=' + id)
    }


    addRoles(addRolesRequest): Observable<any> {
        addRolesRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/api/roles', addRolesRequest)
    }

    updateRoles(id: string, roles: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/api/roles?id=' + id, roles)
    }
    deleteRoles(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/api/roles?id=' + id)
    }
    //Project

    getAllProject(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/project/getall')
    }
    getProject(id: string): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/project?id=' + id)
    }
    addProject(addProjectRequest): Observable<any> {
        addProjectRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/api/project', addProjectRequest)
    }
    updateProject(id: string, project: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/api/project?id=' + id, project)
    }
    deleteProject(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/api/project?id=' + id)
    }
    //Projectportfolio

    getAllProjectPortfolio():Observable<any>{
        return this.http.get<any>(this.baseApiUrl+'/api/ProjectPortfolio/GetAll');
    }

    getProjectPortfolio(id:string):Observable<any>{
        return this.http.get<any>(this.baseApiUrl+'/api/ProjectPortfolio?id='+id);
    }

    addProjectPortfolio(addProjectPortfolioRequest):Observable<any>{
        addProjectPortfolioRequest.id='00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl+'/api/ProjectPortfolio',addProjectPortfolioRequest);
    }

    updateProjectPortfolio(id:string,projectPortfolio):Observable<any>{
        return this.http.put<any>(this.baseApiUrl+'/api/ProjectPortfolio',projectPortfolio);
    }

    deleteProjectPortfolio(id:string):Observable<any>{
        return this.http.delete<any>(this.baseApiUrl+'/api/ProjectPortfolio?id='+id);
    }

    //ProjectResource

    getAllprojectresource(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/projectresource/getall')
    }

    getprojectresource(id: string): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/projectresource?id=' + id)

    }

    addprojectresource(addprojectresourceRequest): Observable<any> {
        addprojectresourceRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/api/projectresource', addprojectresourceRequest)
    }

    deleteprojectresource(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/api/projectresource?id=' + id)

    }

    updateprojectresource(id: string, projectresource: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/api/projectresource?id=' + id, projectresource)
    }

    //projectTask
    getAllProjectTask(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/projecttask/getall')
    }

    getProjectTask(id: string): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/projecttask?id=' + id)

    }

    addProjectTask(addProjectTaskRequest): Observable<any> {
        addProjectTaskRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/api/projecttask', addProjectTaskRequest)
    }

    deleteProjectTask(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/api/ProjectTask?id=' + id)

    }

    updateProjectTask(id: string, projecttask: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/api/projecttask?id=' + id, projecttask)
    }

    //userroles
    getAllUserRole(): Observable<any> {
        return this.http.get<any>(this.baseApiUrl + '/api/UserRole/GetAll')
    }

    // getByUserId(id: string): Observable<any> {
    //     return this.http.get<any>(this.baseApiUrl + '/getuser?id=' + id);
    // }

    addUserRole(adduserrolesRequest): Observable<any> {
        adduserrolesRequest.id = '00000000-0000-0000-0000-000000000000';
        return this.http.post<any>(this.baseApiUrl + '/api/UserRole', adduserrolesRequest)
    }

    updateUserRole(id: string, userroles: any): Observable<any> {
        return this.http.put<any>(this.baseApiUrl + '/api/UserRole', userroles);
    }

    deleteUserRole(id: string): Observable<any> {
        return this.http.delete<any>(this.baseApiUrl + '/api/UserRole?id=' + id);
    }
        //UserRolePermission
        getAllUserRolePermission(): Observable<any> {
            return this.http.get<any>(this.baseApiUrl + '/api/UserRolePermission/GetAll')
        }
        getUserRolesPermission(id:string):Observable<any>{
            return this.http.get<any>(this.baseApiUrl + '/api/UserRolePermission?id='+ id)
        }
        addUserRolePermission(addUserRolePermissionRequest):Observable<any> {
            addUserRolePermissionRequest.id = '00000000-0000-0000-0000-000000000000';
            return this.http.post<any>(this.baseApiUrl + '/api/UserRolePermission', addUserRolePermissionRequest)
        }
        updateUserRolePermission(id: string, userrolepermission: any):Observable<any> {
            return this.http.put<any>(this.baseApiUrl + '/api/UserRolePermission?id=' + id,userrolepermission)
        }
        deleteUserRolePermission(id: string):Observable<any> {
            return this.http.delete<any>(this.baseApiUrl + '/api/UserRolePermission?id=' + id )
        }

        //projecttaskcommunication
        getProjectTaskCommunication(id:string):Observable<any>{
            return this.http.get<any>(this.baseApiUrl + '/api/projecttaskcommunication?id='+ id)
    
        }
        
         updateProjectTaskCommunication(id:string,projecttaskcommunication:any): Observable<any> {
             return this.http.put<any>(this.baseApiUrl + '/api/projecttaskcommunication?id='+ id,projecttaskcommunication)
         }
    
         getAllProjectTaskCommunication():Observable<any>{
            return this.http.get<any>(this.baseApiUrl + '/api/projecttaskcommunication/getall')
        }
    
        addProjectTaskCommunication(addProjectTaskCommunicationRequest):Observable<any>{
            addProjectTaskCommunicationRequest.id = '00000000-0000-0000-0000-000000000000';
            return this.http.post<any>(this.baseApiUrl + '/api/ProjectTaskCommunication',addProjectTaskCommunicationRequest)
        }
    
        deleteProjectTaskCommunication(id:string):Observable<any>{
            return this.http.delete<any>(this.baseApiUrl + '/api/projecttaskcommunication?id='+ id)
    
        }



  getTeamMembers(id : string){
    return this.http.get(`${this.baseApiUrl}/api/ProjectResource?id=`+id)
  }

  getProjectTasks(id : string){
    return this.http.get(`${this.baseApiUrl}/getTasks?id=` + id)
  }
  getTask(id : string){
    return this.http.get(`${this.baseApiUrl}/Get?id=` + id)
  }

}