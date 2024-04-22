import { Component } from '@angular/core';

@Component({
  selector: 'app-viewproperties',
  templateUrl: './viewproperties.component.html',
  styleUrls: ['./viewproperties.component.css']
})
export class ViewpropertiesComponent {
  propertiess = [
    { nomproperties: 'properties 1', email: 'properties1@example.com', numtel: '123456789' },
    { nomproperties: 'properties 2', email: 'properties2@example.com', numtel: '987654321' },
    { nomproperties: 'properties ALI', email: 'properties1@example.com', numtel: '123456789' },
    { nomproperties: 'properties QQ', email: 'properties1@example.com', numtel: '123456789' },

    // Ajoutez autant d'objets d'properties que nécessaire
  ];
}
