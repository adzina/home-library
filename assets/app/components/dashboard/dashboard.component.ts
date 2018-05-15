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
  private userID = localStorage.getItem("userID");
  ngOnInit() {
    this._backendService.getLastReadBook(this.userID).subscribe(data=>{
      this.lastReadBook = data;
    })
     this._backendService.getNowReading(this.userID).subscribe(data=>{
       console.log(data);
       this.nowReading = data;
     })
    /*
    Statystyki
czytania: średnia liczba książek na miesiąc/rok, średnia liczba stron na dzień
Ostatnio przeczytana książka
Aktualnie czytane książki
Książki wypożyczone innym użytkownikom oraz książki wypożyczone od innych użytkowników
*/
  }


}
