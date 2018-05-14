import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { Collection } from '../../models/collection';
import { Book } from '../../models/book';
import { User } from '../../models/user';
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
  private books: Book[];
  private users: User[];
  ngOnInit() {
    this.userID = localStorage.getItem("userID")
    this.getMyCollection()
  }
  getMyCollection(){
    this._backendService.getHomeCollection(this.userID).subscribe(data=>{
      this.collection = data;
      this._backendService.getCollectionBooks(this.collection.id).subscribe(data=>{
        this.books = data;
      },err=>{
        console.log(err)
      })

      this._backendService.getCollectionUsers(this.collection.id).subscribe(data=>{
        this.users = data;
      },err=>{
        console.log(err)
      })
    },
      err=>{
        console.log(err)
      })
  }
  createCollection(form: NgForm) {
    console.log(form.value["name"])
    this._backendService.createHomeCollection(this.userID, form.value["name"])
    .subscribe(data=>{
        this._backendService.addUserToCollection(data.id, this.userID).subscribe(data=>{
          this.info = "Collection successfully created";
          this._router.navigate(["./home-collection"]);
        })

    },
      err=>{
        this.error = "Could not create collection, try again";
      })
  }
  navigate_book(){
    localStorage.setItem("collectionID",this.collection.id);
    this._router.navigate(['./add-book']);
  }
  navigate_user(){
    this._router.navigate(['./add-user']);

  }
  navigate_rent(){
    this._router.navigate(['./rent-a-book']);

  }
}
