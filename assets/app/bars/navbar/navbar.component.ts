import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})

export class NavbarComponent{
  user: string;
  isAdmin: boolean;
  constructor(private _router:Router){
  }
  logout(){

    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
  navigate(nr: number){
    switch(nr){
      case(1): this._router.navigate(['./dashboard']);break;
      case(2): this._router.navigate(['./home-collection']);break;
      case(3): this._router.navigate(['./libraries']);break;
    }
  }

}
