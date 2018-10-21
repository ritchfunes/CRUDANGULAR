import { Component, OnInit } from '@angular/core';
import { EmployeeService} from '../shared/employee.service' ; 
import { Employee } from '../shared/employee.model' ; 
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms' ;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

 employees: Employee[];
  constructor( private employeeService: EmployeeService , private toastr: ToastrService) { }

  ngOnInit() {

  this.getHeroes();
  this.resetForm() ; 

//  this.employeeService.GetEmployee() ; 

  }

  onDelete(id: number)
  { 
    if(confirm('are you sure delete this record')== true)
    {
      
    this.employeeService.DeleteEmployee(id)
    .subscribe( x => {
      this.getHeroes();
     this.toastr.warning('delete record successly', 'Employee register');
    } );
    }
    
    // ts del componente funcional
    /*
    if(confirm('are you sure delete this record')== true)
    {
      
    this.employeeService.DeleteEmployee(id)
    .subscribe( x => {
      this.employeeService.GetEmployee() ; 
     this.toastr.warning('delete record successly', 'Employee register');
      //  console.log(employees.data) ;
    } );
    }
    */

  }

  showForEdit( emp: Employee)
  {
    this.employeeService.seletedEmployee = Object.assign({}, emp);; 
  }

  getHeroes(): void {
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
    this.getHeroes() ; 
   // this.employeeService.GetEmployee() ;
    this.toastr.success('add success', 'Employee register');
   }) ;
   
   } // fin del if 
   else {
 // update 
 this.employeeService.PutEmployee(form.value.EmployeeId , form.value).
 subscribe( data => {
  this.resetForm(form) ; 
  this.getHeroes() ; 
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
