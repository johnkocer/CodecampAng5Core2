import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';  // debug
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Employee } from "./employee.component";

@Injectable()
export class EmployeeService {

   public employeeList: Observable<Employee[]>;
   private _employeeList: BehaviorSubject<Employee[]>;
   private baseUrl: string;
   private dataStore: {
      employeeList: Employee[];
   };

   constructor(private http: Http) {
      this.baseUrl = '/api/';
      this.dataStore = { employeeList: [] };
      this._employeeList = <BehaviorSubject<Employee[]>>new BehaviorSubject([]);
      this.employeeList = this._employeeList.asObservable();
   }

   getAll() {
      this.http.get(`${this.baseUrl}GetAllEmployees`)
         .map(response => response.json())
         .subscribe(data => {
            this.dataStore.employeeList = data;
            this._employeeList.next(Object.assign({}, this.dataStore).employeeList);
         }, error => console.log('Could not load employee.'));
   }

   public addEmployee(newEmployee: Employee) {
      console.log("addEmployee");
      var headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=utf-8');
      console.log('add employee : ' + JSON.stringify(newEmployee));


      this.http.post(`${this.baseUrl}AddEmployee/`, JSON.stringify(newEmployee), { headers: headers })
         .map(response => response.json()).subscribe(data => {
            this.dataStore.employeeList.push(data);
            this._employeeList.next(Object.assign({}, this.dataStore).employeeList);
         }, error => console.log('Could not create todo.'));
   };

   public updateEmployee(newEmployee: Employee) {
      console.log("updateEmployee");
      var headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=utf-8');
      console.log('add employee : ' + JSON.stringify(newEmployee));


      this.http.put(`${this.baseUrl}UpdateEmployee/`, JSON.stringify(newEmployee), { headers: headers })
         .map(response => response.json()).subscribe(data => {
            this.dataStore.employeeList.forEach((t, i) => {
               if (t.id === data.id) { this.dataStore.employeeList[i] = data; }
            });
         }, error => console.log('Could not update employee.'));
   };

   removeItem(employeeId: number) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=utf-8');
      console.log("removeItem:" + employeeId);
      this.http.delete(`${this.baseUrl}DeleteEmployee/${employeeId}`, { headers: headers }).subscribe(response => {
         this.dataStore.employeeList.forEach((t, i) => {
            if (t.id === employeeId) { this.dataStore.employeeList.splice(i, 1); }
         });

         this._employeeList.next(Object.assign({}, this.dataStore).employeeList);
      }, error => console.log('Could not delete employee.'));
   }
   private _serverError(err: any) {
      console.log('sever errorOK:', err);  // debug
      if (err instanceof Response) {
         return Observable.throw(err.json().error || 'backend server error');
         // if you're using lite-server, use the following line
         // instead of the line above:
         //return Observable.throw(err.text() || 'backend server error');
      }
      return Observable.throw(err || 'backend server error');
   }
}