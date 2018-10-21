import { Component, OnInit } from '@angular/core';
import { EmployeeService} from '../shared/employee.service' ; 
import { NgForm } from '@angular/forms' ;
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model' ; 


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];
  constructor( private employeeService: EmployeeService , private toastr : ToastrService ) { }

  ngOnInit() {
  this.resetForm() ; 
  this.refresh() ; 
  }


  refresh(): void {
    this.employeeService.GetEmployee()
    .subscribe(employees => this.employees = employees 
//  console.log(employees.data) ;
    );
    
  }


onSubmit( form : NgForm){
   if(form.value.EmployeeId == null )
   {

   
	this.employeeService.postEmployee(form.value).
	subscribe( data => {
   this.resetForm(form) ; 
  // this.refresh() ; 
   this.employeeService.GetEmployee() ;
	 this.toastr.success('add success', 'Employee register');
  }) ;
  
  } // fin del if 
  else {
// update 
this.employeeService.PutEmployee(form.value.EmployeeId , form.value).
subscribe( data => {
 this.resetForm(form) ; 
 this.refresh() ; 
 //this.employeeService.GetEmployee() ;
 this.toastr.info('Record update success', 'Employee Update');
}) ;

  }

}
   

 resetForm( form? : NgForm){

 if(form != null)
  form.reset() ; 
  this.employeeService.seletedEmployee= {
  EmployeeId:   null ,
  FirstName:  '' , 
  LastName:  '' , 
  EmpCode: '' , 
  Position: '' , 
  Office:  '' 
  }

 }

}
