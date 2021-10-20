import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currDate=new Date().toISOString().slice(0,10);
  date=this.currDate;
  totalStudents:number=0;
  present:number=0;

  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.gettotal();
  }

  gettotal(){
    this.studentService.getAllUser().subscribe((data)=>{
        data.forEach((student)=>{
          this.totalStudents+=1;
        })
    })
  }

}
