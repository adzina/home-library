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
  private currentlyRead: Book[];
  private availableToMe: Book[];
  private readings: Reading[];
  private loans: Loan[];
  ngOnInit() {
    this.userID = localStorage.getItem("userID")
    this.getMyCollection()
  }
  getMyCollection(){
    this._backendService.getHomeCollection(this.userID).subscribe(data=>{
      this.collection = data;

      this.getMyLoans();

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
  getMyLoans(){
    this._backendService.findMyLoans(this.collection.id).subscribe(data=>{
      this.loans = data;
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
  createCollection(form: NgForm) {
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
  read(book: Book){
    this._backendService.addReading(book.id, this.userID).subscribe(data=>{
      this.divideBooks();
    })
  }
  return(loan: Loan){
    this._backendService.removeBookFromCollection(loan.to, loan.bookID.toString()).subscribe(data1=>{
      this._backendService.addBookToCollection(this.collection.id, loan.bookID).subscribe(data2=>{
        this._backendService.returnBook(loan.loanID).subscribe(data3=>{
          this.getMyLoans()
          this.divideBooks()
        })
      });
    })


  }
  finish(book: Book){
    this._backendService.updateReading(book.id, this.userID).subscribe(data=>{
      this.divideBooks();
    })
  }
}
