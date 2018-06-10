import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeCollectionComponent } from './components/home-collection/home-collection.component';
import { SeeCollectionComponent } from './components/see-collection/see-collection.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LibrariesComponent } from './components/libraries/libraries.component';
import { RentABookComponent } from './components/rent-a-book/rent-a-book.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';
import { RegisterFromInviteComponent } from './components/register-from-invite/register-from-invite.component';
import { SeeBookComponent } from './components/see-book/see-book.component';
// Define the routes
export const routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'home-collection',
    component: HomeCollectionComponent,
  },
  {
    path: 'see-collection',
    component: SeeCollectionComponent,
  },
  {
    path: 'add-book',
    component: AddBookComponent,
  },
  {
    path: 'libraries',
    component: LibrariesComponent,
  },
  {
    path: 'rent-a-book',
    component: RentABookComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'rental-details',
    component: RentalDetailsComponent
  },
  {
    path: 'register-from-invite/:secret/:collID',
    component: RegisterFromInviteComponent
  },
  {
    path: 'see-book',
    component: SeeBookComponent
  },
   { //Redirect urls not found at root
       path: '**',
       redirectTo: ''
     }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
