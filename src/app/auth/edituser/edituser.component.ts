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
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
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
    const url = `http://localhost:8081/api/users/update-details/${this.userEmail}`;

    const userData = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userEmail,
      company: this.userForm.value.company || '',
      city: this.userForm.value.city || '',
      phoneNumber: this.userForm.value.phoneNumber || ''
    };

    this.http.put(url, userData).subscribe(
      () => {
        console.log('Les informations de l\'utilisateur ont été mises à jour avec succès.');
        this.isUpdateSuccessful = true;
        // Autres actions à effectuer après la mise à jour réussie
        setTimeout(() => {
          this.router.navigate(['/view-user']);
        }, 3000); // Redirige vers la page de visualisation de l'utilisateur après 3 secondes
      },
      (error: HttpErrorResponse) => {
        console.error('Une erreur est survenue lors de la mise à jour des informations de l\'utilisateur :', error);
        // Affichez le message d'erreur complet
        console.error('Erreur détaillée :', error.error);
      }
    );
  }
}
