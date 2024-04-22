import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { GerersectionComponent } from './gerersection/gerersection.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';
import { ViewpropertiesComponent } from './viewproperties/viewproperties.component';
import { EdituserComponent } from './edituser/edituser.component';

const routes: Routes = [
  {
    path:'auth',
    component:AuthComponent,
    children:[
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'customer_list',component:CustomerlistComponent},
      {path:'view_user',component:ViewUserComponent},
      {path:'edit_user',component:EdituserComponent},
      {path:'viewproject',component:ViewprojectComponent},
      {path:'gerersection',component:GerersectionComponent},
      {path:'viewproperties',component:ViewpropertiesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
