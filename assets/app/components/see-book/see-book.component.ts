import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { Collection } from '../../models/collection';
import { Book } from '../../models/book';
import { User } from '../../models/user';
import { Comment } from '../../models/comment';
@Component({
  selector: 'app-see-book',
  templateUrl: './see-book.component.html',
  styleUrls: ['./see-book.component.scss']
})

export class SeeBookComponent implements OnInit {
  constructor(private _backendService: BackendService,
              private _router: Router) { }
  private book: Book;
  private info: string;
  private error: string;
  private comments: Comment[];
  ngOnInit() {
    let bookID = localStorage.getItem("bookID");
    this._backendService.getBookByID(bookID).subscribe(book=>{
      this.book = book;
      this._backendService.getBookComments(bookID).subscribe(comments=>{
        for(let comment of comments){
          comment.date = new Date(comment.date);
        }
        this.comments = comments;
        this.comments = comments.sort((obj1, obj2)=>{
          if (obj1.date < obj2.date) return 1
          if (obj1.date > obj2.date) return -1
        })
      })
    })
  }
  addComment(){
    let text = document.getElementsByTagName("textarea")[0].value
    document.getElementsByTagName("textarea")[0].value= "";
    this._backendService.addComment(this.book.id, text, localStorage.getItem("userID")).subscribe(data=>{
      this.comments = [];
      this._backendService.getBookComments(this.book.id).subscribe(comments=>{
        this.comments = comments;
      })
    })
  }




}
