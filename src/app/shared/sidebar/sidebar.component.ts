import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRole!: number;
  userName: string = '';
  userEmail: string = '';
  menuVisible = false;
  constructor(private http: HttpClient, private router: Router) {}
  navigateToCustomerList() {
    this.router.navigate(['/auth/customer_list']);
  }

  navigateToUserProfile() {
    this.router.navigate(['/auth/view_user']);
  }
  navigateToAccountSettings() {
    this.router.navigate(['/auth/edit_user']);
  }
  ngOnInit() {
    const state = window.history.state;
    this.userRole = state?.userRole || 0;
    this.userName = state?.userName || '';
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      this.getUserInfo(userEmail);
    }
  }

  getUserInfo(email: string) {
    this.http.get<any>(`http://localhost:8081/api/users/get-info/${email}`).subscribe(
      (response: any) => {
        console.log("User info received:", response);
        this.userName = response.firstName + ' ' + response.lastName; // Concaténation du prénom et du nom
      },
      (error: any) => {
        console.error("Error occurred while getting user info:", error);
      }
    );
  }

  navigateToViewProject() {
    this.router.navigate(['/auth/viewproject']);
  }
  navigateToGererSection() {
    this.router.navigate(['/auth/gerersection']);
  }
  navigateToViewProperties() {
    this.router.navigate(['/auth/viewproperties']);
  }
  
}
