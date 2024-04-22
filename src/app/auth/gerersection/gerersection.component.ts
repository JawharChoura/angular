import { Component } from '@angular/core';

@Component({
  selector: 'app-gerersection',
  templateUrl: './gerersection.component.html',
  styleUrls: ['./gerersection.component.css']
})
export class GerersectionComponent {
  
    section = [
      { nomauteur: 'section 1', email: 'auteur1@example.com', numtel: '123456789' },
      { nomauteur: 'section 2', email: 'auteur2@example.com', numtel: '987654321' },
      { nomauteur: 'section ALI', email: 'auteur1@example.com', numtel: '123456789' },
      { nomauteur: 'section QQ', email: 'auteur1@example.com', numtel: '123456789' },
  
      // Ajoutez autant d'objets d'auteur que nécessaire
    ];
  }

