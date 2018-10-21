import { Injectable } from '@angular/core';
import { Employee } from './employee.model' ;
import { Http, Response, Headers,RequestOptions , RequestMethod } from '@angular/http' ; 
import { Observable , throwError  } from 'rxjs' ; 
 // import  'rxjs/add/operator/map'  ;
// import { topromise } from  'rxjs/operators' ;   
import { map , tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   seletedEmployee : Employee ; 
   employeeList: Employee[] ; 
  constructor( private http : Http , private httpd: HttpClient ) { }
  



  GetEmployee() : Observable<Employee[]>
  {

  return this.httpd.get<Employee[]>('http://localhost:57108/api/Employees')
      .pipe(
        catchError(this.handleError) 

      );

  }

  DeleteEmployee(id: number) 
  { // codigo del servicio
    return  this.httpd.delete('http://localhost:57108/api/Employees/'+id  )
    .pipe(
   //  map(res => res.json())
   );

 
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }


  PutEmployee(id , emp)
  {
    var body = JSON.stringify(emp) ; 
   var hederOptions = new Headers( { 'Content-Type' : 'application/json' ,
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Origin': '*'

   }) ; 
   

   var requestOptions = new RequestOptions({ method : RequestMethod.Put , headers : hederOptions });
   return  this.http.put('http://localhost:57108/api/Employees/'+id , body , requestOptions)
   .pipe(
    map(res => res.json())
  );
  }



  postEmployee(emp : Employee ) : Observable<Employee> {
  
    var hederOptions = new HttpHeaders( { 'Content-Type' : 'application/json' ,
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Origin': '*'

   }) ; 

   return  this.httpd.post<Employee>('http://localhost:57108/api/Employees' , emp , httpOptions)
   .pipe(
  );

  }

  // funcional produccion

  /*
   postEmployee(emp : Employee ) {



   
   var hederOptions = new Headers( { 'Content-Type' : 'application/json' ,
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Origin': '*'

   }) ; 
   
   var requestOptions = new RequestOptions({ method : RequestMethod.Post , headers : hederOptions });
  return  this.http.post('http://localhost:57108/api/Employees' , body , requestOptions)
   .pipe(
   map(x => x.json())
  );
   
  }
  */

}
