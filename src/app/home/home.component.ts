import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    console.log("Login button clicked");
    console.log("Email:", this.email);
    console.log("Password:", this.password);

    let bodyData = {
      email: this.email,
      password: this.password,
    };

    console.log("Sending request...");

    this.http.post("http://localhost:8081/api/users/login", bodyData, { responseType: 'text' }).subscribe(
      (token: any) => {
        console.log("Token received:", token);
        console.log("Login successful");
        
        this.getUserRoleByEmail(this.email);
        sessionStorage.setItem('userEmail', this.email);
      },
      (error: any) => {
        console.error("Error occurred:", error);
        alert("Incorrect email and password combination");
      }
    );
  }

  getUserRoleByEmail(email: string) {
    this.http.get("http://localhost:8081/api/users/get-role/" + email).subscribe(
      (response: any) => {
        console.log("User role received:", response);
        const userRole = response.roleId;
        const userName = response.name;
        this.router.navigate(['/admin'], { state: { userRole, userName } });
      },
      (error: any) => {
        console.error("Error occurred while getting user role:", error);
      }
    );
  }
}