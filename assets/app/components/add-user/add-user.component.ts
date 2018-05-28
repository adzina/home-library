import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  info: string;
  email: string;
  confirmed_password: string;
  constructor(private _http: Http,
    private _backendService: BackendService) { }

  ngOnInit() {
  }

  send_invite(form: NgForm) {
    let collectionID = localStorage.getItem("collectionID");
    this._backendService.findUserByEmail(this.email).subscribe(data => {
      if (data.id != "")
        this._backendService.addUserToCollection(collectionID, data.id).subscribe(d => {
          this.info = "User successfully added to collection";
          form.reset();
        })
      else
      //TODO: wyslac maila z zaproszeniem do kolekcji, niech przekierowuje do strony
      // register and add to collection. Po wprowadzeniu username i password user zostanie
      //dodany do kolekcji
      console.log("TODO");
    })

  }
}
