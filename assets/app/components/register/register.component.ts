import { Component, OnInit } from '@angular/core';
import { Observable,Observer } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  confirmed_password: string;
  constructor(private _http:Http,
              private _backendService: BackendService,
              private _router: Router) { }

  ngOnInit() {
  }
  register(){
    if(this.password==this.confirmed_password){
      let url = this._backendService.getUrl();
      let body = {username: this.username,
                  password: this.password,
                  email: this.email};
      this._http.post(url+"/user", body)
      .map((res:Response) => res.json())
      .subscribe(res=>{
          this._router.navigate(['']);
      },
      error=>{

      })
    }
  }

}
