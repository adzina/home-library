import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { User } from '../../models/user';
@Component({
  selector: 'app-rent-a-book',
  templateUrl: './rent-a-book.component.html'
})

export class RentABookComponent implements OnInit {
  private books: Book[];
  private users: User[];
  private user: User;
  private book: Book;
  private error: string;
  private info: string;
  constructor(private _backendService: BackendService,
              private _router: Router) { }


  ngOnInit() {
    this._backendService.getCollectionBooks(localStorage.getItem("collectionID")).subscribe(data=>{
      this.books = data;
    })
    this._backendService.getAllUsers().subscribe(data=>{
      this.users = data;
      let myID = localStorage.getItem("userID");
      this.users = this.users.filter(obj => obj.id !== myID);
    })
  }
  rentBook(form: NgForm){
    let bookID = form.value["book"].id;
    let userID = form.value["user"].id;
    this._backendService.getHomeCollection(userID).subscribe(data=>{
      let to_collectionID = data.id;
      let from_collectionID = localStorage.getItem("collectionID");
      this._backendService.removeBookFromCollection(from_collectionID, bookID).subscribe(res=>{
      },err=>{
        console.log(err)
      });
      this._backendService.addBookToCollection(to_collectionID, bookID).subscribe(res=>{
      },err=>{
        console.log(err)
      });
      this._backendService.rentABook(from_collectionID,to_collectionID, bookID).subscribe(data=>{

        this.info = "Loan successfully registered";
        form.reset();
      })
    })

  }

}
