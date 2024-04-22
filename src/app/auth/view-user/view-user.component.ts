import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userName: string = '';
  userLastName: string = '';
  userEmail: string = '';
  userCompany: string = '';
  userCity: string = '';
  userPhoneNumber: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch user data and populate the properties
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      this.getUserInfo(userEmail);
    }
  }

  getUserInfo(email: string) {
    this.http.get<any>(`http://localhost:8081/api/users/get-info/${email}`).subscribe(
      (response: any) => {
        console.log("User info received:", response);
        this.userName = response.firstName;
        this.userLastName = response.lastName;
        this.userEmail = response.email;
        this.userCompany = response.company;
        this.userCity = response.city;
        this.userPhoneNumber = response.phoneNumber;
      },
      (error: any) => {
        console.error("Error occurred while getting user info:", error);
      }
    );
  }
}
