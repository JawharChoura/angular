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
            roles: customer.roles.map((role: { name: string }) => role)
          }));
        },
        error => {
          console.error(`Erreur lors de la recherche des utilisateurs avec le terme "${searchTerm}" :`, error);
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

  updateCustomer(customer: any): void {
    this.http.put(`http://localhost:8081/api/users/${customer.id}`, customer).subscribe(
      data => {
        this.getCustomers();
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      }
    );
  }

  updateRoles(customer: any, index: number, roleName: string): void {
    const updatedRole = (document.querySelector(`td:nth-child(9) li:nth-child(${index + 1})`) as HTMLElement).innerText;

    const roleIndex = customer.roles.findIndex((role: string) => role === roleName);
    if (roleIndex > -1) {
      customer.roles[roleIndex] = updatedRole;
      this.http.put(`http://localhost:8081/api/users/${customer.id}`, customer).subscribe(
        data => {
          this.getCustomers();
        },
        error => {
          console.error('Erreur lors de la mise à jour du rôle:', error);
        }
      );
    }
  }

  updateField(customer: any, field: string, event: any): void {
    if (event.target && event.target.innerText) {
      customer[field] = event.target.innerText;
    }
  }
}
