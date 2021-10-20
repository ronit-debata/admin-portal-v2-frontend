import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  studentForm:FormGroup
  constructor(private studentService:StudentService,private router:Router) {
    this.studentForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'dob':new FormControl('',Validators.required),
      'skills': new FormControl('', Validators.required),
      'department': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'state':new FormControl('',Validators.required),
      'city': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'zip': new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')])
    })
  }

  ngOnInit(): void {
  }

  submitStudent(){
    Object.keys(this.studentForm.controls).forEach(field => {
      const control = this.studentForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.studentForm.valid){
      console.log(this.studentForm.value);
      this.studentService.saveStudent(this.studentForm.value).subscribe(() => {
        this.router.navigate(['/student-list'])
      },() => {
        alert("Something Went Wrong")
      })
      
    }
  }

}
