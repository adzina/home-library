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
    document.getElementById("message").style.visibility = "hidden";

  }
  register(){
    if(this.username==""){
      document.forms["register-form"].getElementsByTagName("input")[0].classList.add("wrong");
      return 0
    }
    if(this.email==""){
      document.forms["register-form"].getElementsByTagName("input")[1].classList.add("wrong");
      return 0
    }
    if (!this.validateEmail(this.email)){
      document.forms["register-form"].getElementsByTagName("input")[1].classList.add("wrong");
      document.getElementById("message").textContent = "Incorrect email";
      document.getElementById("message").classList.add("wrong");
      document.getElementById("message").style.visibility = "visible";

      return 0
    }
    if(this.password==""){
      document.forms["register-form"].getElementsByTagName("input")[2].classList.add("wrong");
      document.forms["register-form"].getElementsByTagName("input")[3].classList.add("wrong");
      document.getElementById("message").textContent = "Type in a password";
      document.getElementById("message").classList.add("wrong");
      document.getElementById("message").style.visibility = "visible";
      return 0
    }
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
        console.log(error);
        document.getElementById("message").textContent = error._body;
        document.getElementById("message").classList.add("wrong");
        document.getElementById("message").style.visibility = "visible";

      })
    }
    else{
      document.forms["register-form"].getElementsByTagName("input")[2].classList.add("wrong");
      document.forms["register-form"].getElementsByTagName("input")[3].classList.add("wrong");
      document.getElementById("message").textContent = "Passwords do not match";
      document.getElementById("message").classList.add("wrong");
      document.getElementById("message").style.visibility = "visible";
    }
  }
  register2(){
    let body = {username: this.username,
                password: this.password,
                email: this.email};
    return this._http.post('http://localhost:1337/email/', body);
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
