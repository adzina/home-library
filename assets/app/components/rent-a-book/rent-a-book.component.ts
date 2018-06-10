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
  private users: User[]=[];
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
      let myID = localStorage.getItem("userID");
      for(let i of data){
        if(i.id!=myID)
          this.users.push(i)
      }
    })
  }
  rentBook(form: NgForm){
    if(form.value["book"]==undefined){
      document.getElementById("book").classList.add("wrong");
    }
    else{
      document.getElementById("book").classList.remove("wrong");
      let from_collectionID = localStorage.getItem("collectionID");
      let bookID = form.value["book"].id;
      let user = form.value["user"];

      if(user==undefined){
        this._backendService.removeBookFromCollection(from_collectionID, bookID).subscribe(res=>{
        },err=>{
          console.log(err)
        });
        this._backendService.rentABook(from_collectionID,(-1).toString(), bookID, (-1).toString()).subscribe(data=>{

          this.info = "Outside loan successfully registered";
          form.reset();
        })
      }
      else{
        this._backendService.getHomeCollection(user.id).subscribe(data=>{
          let to_collectionID = data.id;
          this._backendService.removeBookFromCollection(from_collectionID, bookID).subscribe(res=>{
          },err=>{
            console.log(err)
          });
          this._backendService.addBookToCollection(to_collectionID, bookID).subscribe(res=>{
          },err=>{
            console.log(err)
          });
          this._backendService.rentABook(from_collectionID,to_collectionID, bookID, user.id).subscribe(data=>{

            this.info = "Loan successfully registered";
            form.reset();
          })
        })
      }

    }


  }

}
