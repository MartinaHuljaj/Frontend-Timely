import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import * as XLSX from 'xlsx';

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
  fileName= 'Projects.xlsx';
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

  ExportToExcel(){
    let element = document.getElementById('excel-table');
    console.log(element);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);

  }


}
