import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { Collection } from '../../models/collection';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home-collection.component.html'
})

export class HomeCollectionComponent implements OnInit {
  constructor(private _backendService: BackendService,
              private _router: Router) { }
  private userID: string
  private collection: Collection
  private info: string
  private error: string
  ngOnInit() {
    this.userID = localStorage.getItem("userID")
    this.getMyCollection()
  }
  getMyCollection(){
    this._backendService.getHomeCollection(this.userID).subscribe(data=>{
      this.collection = data;
    },
      err=>{
        console.log(err)
      })
  }
  createCollection(form: NgForm) {
    console.log(form.value["name"])
    this._backendService.createHomeCollection(this.userID, form.value["name"])
    .subscribe(data=>{
      this.info = "Collection successfully created"
    },
      err=>{
        this.error = "Could not create collection, try again"
      })
  }
  navigate_book(){
    this._router.navigate(['./add-book']);
  }
  navigate_user(){
    this._router.navigate(['./add-user']);

  }
  navigate_rent(){
    this._router.navigate(['./rent-a-book']);

  }
}
