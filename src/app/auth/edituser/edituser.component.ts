import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  userForm: FormGroup;
  userEmail: string = '';
  userId: number | null = null;
  isUpdateSuccessful: boolean = false;
  userInfo: any = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      city: [''],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      this.userEmail = userEmail;
      this.getUserInfo(userEmail);
    }
  }

  getUserInfo(email: string) {
    this.http.get<any>(`http://localhost:8081/api/users/get-info/${email}`).subscribe(
      (response: any) => {
        console.log("User info received:", response);
        this.userId = response.id;
        this.userForm.patchValue({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          company: response.company || '',
          city: response.city || '',
          phoneNumber: response.phoneNumber || ''
        });
      },
      (error: any) => {
        console.error("Error occurred while getting user info:", error);
      }
    );
  }

  onSubmit(): void {
    if (!this.userId) {
      console.error('User ID is not available.');
      return;
    }

    const url = `http://localhost:8081/api/users/update-details/${this.userId}`;

    const userData = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      company: this.userForm.value.company || '',
      city: this.userForm.value.city || '',
      phoneNumber: this.userForm.value.phoneNumber || ''
    };

    console.log('Updating user data:', userData);

    this.http.put(url, userData).subscribe(
      () => {
        console.log('User information updated successfully.');
        this.isUpdateSuccessful = true;
        setTimeout(() => {
          this.isUpdateSuccessful = false;
        }, 1000); // Supprime le message de succès après 3 secondes
      },
      (error: HttpErrorResponse) => {
        console.error('An error occurred while updating user information:', error);
        console.error('Detailed error:', error.error);
      }
    );
  }
}
