import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { Loan } from '../../models/loan';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  constructor(private _backendService: BackendService,
              private _router: Router) { }
  private lastReadBook: Book;
  private nowReading: Book[];
  private myLoans: Loan[];
  private myBorrowings: Loan[];
  private oldestReading: Date;
  private nr_books_read: number;
  private nr_pages_read: number;
  private diffDays: number
  private userID = localStorage.getItem("userID");
  ngOnInit() {
    this._backendService.getLastReadBook(this.userID).subscribe(data=>{
      this.lastReadBook = data;
    })
     this._backendService.getNowReading(this.userID).subscribe(data=>{
       this.nowReading = data;
     })
     this._backendService.getStats(this.userID).subscribe(data=>{
       this.nr_books_read = data.nr_books;
       this.nr_pages_read = data.nr_pages;
       this._backendService.getOldestReading(this.userID).subscribe(data=>{
         let oldest = new Date(data);
         let now = new Date()
         var diff = Math.abs(oldest.getTime() - now.getTime());
         this.diffDays = Math.ceil(diff / (1000 * 3600 * 24));
         if(this.diffDays==0) this.diffDays = 1;

       })
     })

    /*
Książki wypożyczone innym użytkownikom oraz książki wypożyczone od innych użytkowników
*/
  }


}
