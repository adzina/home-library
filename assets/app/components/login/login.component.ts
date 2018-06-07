import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import {Headers,Http} from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  constructor(private _backendService: BackendService,
              private _router: Router,
              private http: Http) { }


  ngOnInit() {
    this.username = "";
    this.password = "";
    document.getElementById("message").style.visibility='hidden';
  }
  login(){
      let url = this._backendService.getUrl()+"/user/login";
      let body = JSON.stringify({username: this.username, password: this.password});

      this.http.post(url, body)
      .map(res => res.json())
      .subscribe(response=>{
        localStorage.setItem('token',response.id_token);
        localStorage.setItem('userID',response.id);
        this._router.navigate(['./dashboard']);

          document.getElementById("password").classList.remove('wrong');
          document.getElementById("username").classList.remove('wrong');
          document.getElementById("message").style.visibility='hidden';
      },err=>{
        document.getElementById("password").classList.add('wrong');
        document.getElementById("username").classList.add('wrong');
        document.getElementById("message").textContent = "Incorrect login or password";
        document.getElementById("message").classList.add("wrong");
        document.getElementById("message").style.visibility='visible';


    });

    }
  register(){
    this._router.navigate(['./register']);
  }
}
