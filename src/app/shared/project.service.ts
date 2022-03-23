import { Injectable } from '@angular/core';
import { Project } from './project.model';
import {HttpClient } from "@angular/common/http"
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  readonly baseUrl="https://localhost:44396/api/Project"
  formData:Project=new Project();

  getProjectsList():Observable<any[]>{
    return this.http.get<any>(this.baseUrl);
  }

  postStartProject(){
    console.log(this.formData);
    return this.http.post(this.baseUrl,this.formData).subscribe();
  }

  putEndProject(){
    console.log(this.formData);
    return this.http.put(`${this.baseUrl}?projectId=${this.formData.projectId}`,this.formData).subscribe();
  }


}
