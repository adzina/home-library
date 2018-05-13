import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeCollectionComponent } from './components/home-collection/home-collection.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LibrariesComponent } from './components/libraries/libraries.component';
import { RentABookComponent } from './components/rent-a-book/rent-a-book.component';
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
