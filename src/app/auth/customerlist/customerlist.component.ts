import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customers: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.http.get<any[]>(`http://localhost:8081/api/users/with-roles`).subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }
  performSearch(): void {
    const searchTerm = (document.querySelector('.search-input') as HTMLInputElement).value;
  
    if (searchTerm.trim() === '') {
      this.getCustomers();
    } else {
      this.http.get<any[]>(`http://localhost:8081/api/users/by-name/${searchTerm}`).subscribe(
        data => {
          this.customers = data.map(customer => ({
            ...customer,
            roles: customer.roles.map((role: { name: string }) => role.name) // Correction du type de role
          }));
        },
        error => {
          console.error('Erreur lors de la recherche des utilisateurs:', error);
        }
      );
    }
  }  
  deleteCustomer(id: number): void {
    this.http.delete(`http://localhost:8081/api/users/${id}`).subscribe(
      data => {
        this.getCustomers();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      }
    );
  }

}
