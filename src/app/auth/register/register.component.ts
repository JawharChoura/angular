import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  company: string = "";
  city: string = "";
  phoneNumber: string = "";
  role_id: string = "";
  

  constructor(private http: HttpClient){

  }
  

  save()
  {
    let role = { id: this.role_id };
    let roles = [role];
    let bodyData = {
      "firstName" : this.firstName,
      "lastName" : this.lastName,
      "email" : this.email,
      "password" : this.password,
      "confirmPassword" : this.confirmPassword,
      "company" : this.company,
      "city" : this.city,
      "phoneNumber": this.phoneNumber,
      roles: roles
    };
    
    this.http.post("http://localhost:8081/api/users/register",bodyData,{responseType: "text"}).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("Registrated Successfully");
    });
  }
   
   

}
