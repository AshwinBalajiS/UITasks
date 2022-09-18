import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { VirtualTimeScheduler } from 'rxjs';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from './employeedashboard.model';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.scss']
})
export class EmployeedashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showupdate!: boolean;
  formvalue: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      employeeID: [''],
      employeeName: [''],
      emailID: [''],
      mobileNumber: [''],
      position: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee() {
    this.formvalue.reset();
    this.showAdd = true;
    this.showupdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.employeeName = this.formValue.value.employeeName;
    this.employeeModelObj.id = this.formValue.value.employeeID;
    this.employeeModelObj.emailid = this.formValue.value.emailID;
    this.employeeModelObj.mobilenumber = this.formValue.value.mobileNumber;
    this.employeeModelObj.position = this.formValue.value.position;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe({
        next: () => {
          // console.log(res);
          alert("Employee Added Sucessfully")
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        error: (err) => {
          console.log("Something Went Wrong");
        }
      })
  }

  getAllEmployee(): void {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee deleted");
        this.getAllEmployee();
      })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showupdate = true;
    this.employeeModelObj.id = row.id;
    this.formvalue.controls['employeeName'].setValue(row.employeeName);
    this.formvalue.controls['employeeID'].setValue(row.employeeID);
    this.formvalue.controls['emailID'].setValue(row.emailID);
    this.formvalue.controls['mobileNumber'].setValue(row.mobileNumber);
    this.formvalue.controls['position'].setValue(row.position);
    this.formvalue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.employeeName = this.formValue.value.employeeName;
    this.employeeModelObj.employeeID = this.formValue.value.employeeID;
    this.employeeModelObj.emailID = this.formValue.value.emailID;
    this.employeeModelObj.mobileNumber = this.formValue.value.mobileNumber;
    this.employeeModelObj.position = this.formValue.value.position;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe({
        next: () => {
          alert("updated Sucessfully");
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        error: (err) => {
          console.log("Something Went Wrong");
          console.log(err);
        }
      })
  }
}

