import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html'
})

export class AddBookComponent implements OnInit {

  private collectionID = localStorage.getItem("collectionID");
  private error: string;
  private info: string;
  constructor(private _backendService: BackendService,
              private _router: Router) { }

  ngOnInit() {
  }
  add_by_hand(form: NgForm){
    var fromOutside = (<HTMLInputElement>document.getElementById("checkbox")).checked;
    let title = (<HTMLInputElement>document.getElementById("title")).value;
    let author = (<HTMLInputElement>document.getElementById("author")).value;
    let year = (<HTMLInputElement>document.getElementById("year")).value;
    let pages = (<HTMLInputElement>document.getElementById("pages")).value;
    this._backendService.createBook(this.collectionID, title,author,Number(year),Number(pages)).subscribe(bookID=>{
      if(fromOutside){
        this._backendService.rentABook((-1).toString(),this.collectionID, bookID, (-1).toString()).subscribe(data=>{
          this.info = "Loan successfully registered";
        })
      }
      this._backendService.addBookToCollection(this.collectionID,bookID).subscribe(data=>{
        this.info = "Book successfully added";
        form.reset()
      },
      err=>{
        console.log(err._body);
          this.error = "Could not add the book, try again";
      })


    })
  }
  search_book(form: NgForm){
    this._backendService.scrapeWeb(form.value["link"]).subscribe(data=>{
      (<HTMLInputElement>document.getElementById("title")).value = data.title;
      (<HTMLInputElement>document.getElementById("author")).value = data.author;
      (<HTMLInputElement>document.getElementById("year")).value = data.year;
      (<HTMLInputElement>document.getElementById("pages")).value = data.pages;
    })
  }

}
