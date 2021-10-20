import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  id: number = 0;
  studentForm: FormGroup;
  constructor(private activeRoute: ActivatedRoute,private router:Router,private userService:StudentService) {

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
    this.activeRoute.params.subscribe((paramsData) => {
      this.id = paramsData.id;
      this.userService.getUserByID(this.id).subscribe((data) => {
        console.log(data)
        delete data._id
        this.studentForm.setValue(data)
      })
    })

  }

submitStudent() {
  Object.keys(this.studentForm.controls).forEach(field => {
    const control = this.studentForm.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }
  });

  if(this.studentForm.valid){
    this.userService.updateUserById(this.id,this.studentForm.value).subscribe(() => {
      this.router.navigate(["/student-list"])
    })
  }

}

}
