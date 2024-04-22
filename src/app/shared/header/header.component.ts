import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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
        this.userName = response.firstName + ' ' + response.lastName;
        this.userEmail = response.email;
      },
      (error: any) => {
        console.error("Error occurred while getting user info:", error);
      }
    );
  }

  registration() {
    this.router.navigate(['/auth/register']);
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}
