import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { EmployeeService } from "./employeeService";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'employee',
  providers: [EmployeeService],
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  public employeeList: Observable<Employee[]>;

  showEditor = true;
  myName: string;
  newEmployee: Employee;
  constructor(private dataService: EmployeeService) {
    this.newEmployee = new Employee();
  }
  // if you want to debug info  just uncomment the console.log lines.
  ngOnInit() {
    //    console.log("in ngOnInit");
    this.employeeList = this.dataService.employeeList;
    this.dataService.getAll();
  }
  public addEmployee(item: Employee) {
    //console.dir(item);
    //console.log("In addEmployee: " + this.newEmployee);
    let employeeId = this.dataService.addEmployee(this.newEmployee);
       console.dir(employeeId);
  }
  public updateEmployee(item: Employee) {
    //  console.dir(item);
    //console.log("In updateEmployee: " + item);
    this.dataService.updateEmployee(item);
    //    console.log("in updateEmployee:" );
  }
  public deleteEmployee(employeeId: number) {
    //  console.log("in deleteEmployee: " + employeeId);
    this.dataService.removeItem(employeeId);
  }
}

export class Employee {
  public id: number;
  public name: string;
  public gender: string;
  public departmentId: number;
  public salary: number;
}
