import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: [
  ]
})
export class ProjectComponent implements OnInit {

  constructor(public service:ProjectService) { }
  clicked:boolean=false;
  ProjectList:any=[];
  ngOnInit(): void {
    this.refreshProjectList();
  }
  displayStyle = "none";

  OnSubmit(){
    this.service.postStartProject();
    window.location.reload();
    
  }

  refreshProjectList(){
    this.service.getProjectsList().subscribe(data=>{
      this.ProjectList=data;
      console.log(this.ProjectList);
    });
  }

  nameProject(selectedProject:Project){
    this.service.formData=selectedProject;
    this.displayStyle = "block";

  }

  putProject(){
    this.service.putEndProject();
    this.displayStyle = "none";
    window.location.reload();
  }

  deleteProject(selectedProject:Project){
    this.service.formData=selectedProject;
    this.service.deleteProject();
    window.location.reload();
  }


}
