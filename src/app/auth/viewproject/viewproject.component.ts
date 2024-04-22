import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewproject',
  templateUrl: './viewproject.component.html',
  styleUrls: ['./viewproject.component.css']
})
export class ViewprojectComponent {
  auteurs = [
    { nomauteur: 'Auteur 1', email: 'auteur1@example.com', numtel: '123456789' },
    { nomauteur: 'Auteur 2', email: 'auteur2@example.com', numtel: '987654321' },
    { nomauteur: 'Auteur ALI', email: 'auteur1@example.com', numtel: '123456789' },
    { nomauteur: 'Auteur QQ', email: 'auteur1@example.com', numtel: '123456789' },
    // Ajoutez autant d'objets d'auteur que nécessaire
  ];

  constructor(private router: Router) { }

  retournerAuMenu() {
    this.router.navigate(['/admin']);
  }
}
