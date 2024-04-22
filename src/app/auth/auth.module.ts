import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';
import { ViewComponent } from './viewproject/view/view.component';
import { EditComponent } from './viewproject/edit/edit.component';
import { CreateComponent } from './viewproject/create/create.component';
import { GerersectionComponent } from './gerersection/gerersection.component';
import { ViewpropertiesComponent } from './viewproperties/viewproperties.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    CustomerlistComponent,
    ViewUserComponent,
    ViewprojectComponent,
    ViewComponent,
    EditComponent,
    CreateComponent,
    GerersectionComponent,
    ViewpropertiesComponent,
    EdituserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
