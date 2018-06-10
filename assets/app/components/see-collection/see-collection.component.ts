import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { Collection } from '../../models/collection';
import { Book } from '../../models/book';
import { User } from '../../models/user';
import { Reading } from '../../models/reading';
import { Loan } from '../../models/loan';
@Component({
  selector: 'app-dashboard',
  templateUrl: './see-collection.component.html'
})

export class SeeCollectionComponent implements OnInit {
  constructor(private _backendService: BackendService,
              private _router: Router) { }
  private collectionID: string;
  private userID: string;
  private collection: Collection;
  private info: string;
  private error: string;
  private books: Book[];
  private users: User[];
  private currentlyRead: Book[];
  private availableToMe: Book[];
  private readings: Reading[];
  private loans: Loan[];
  ngOnInit() {
    this.collectionID = localStorage.getItem("collectionID");
    this.userID = localStorage.getItem("userID");
    this.getMyCollection()
  }
  getMyCollection(){
    this._backendService.getCollectionByID(this.collectionID).subscribe(data=>{
      this.collection = data;

      this._backendService.getCollectionBooks(this.collection.id).subscribe(data=>{
        this.books = data;
        this.divideBooks();
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

  divideBooks(){
    this._backendService.getReadings().subscribe(data=>{
      this.readings = data;
      this.availableToMe = [];
      this.currentlyRead = [];
      let added :boolean;
      for(let book of this.books){
        added = false;
        for(let reading of this.readings){
          if(book.id == reading.bookID && this.userID == reading.userID && reading.end==""){
            this.currentlyRead.push(book);
            added = true
            break;
          }
        }
        if(!added){
          this.availableToMe.push(book);
        }
      }
    })

  }

  navigate_book(){
    localStorage.setItem("collectionID",this.collection.id);
    this._router.navigate(['./add-book']);
  }


  read(book: Book){
    this._backendService.addReading(book.id, this.userID).subscribe(data=>{
      this.divideBooks();
    })
  }

  finish(book: Book){
    this._backendService.updateReading(book.id, this.userID).subscribe(data=>{
      this.divideBooks();
    })
  }
  seeBook(book:Book){
    localStorage.setItem("bookID", book.id);
    this._router.navigate(['./see-book']);
  }
  toggle(id: string){
    var elem = document.getElementById(id);
    if(elem.className=="hiddenDiv")
      elem.className = "visible"
    else
        elem.className = "hiddenDiv"
  }
}
