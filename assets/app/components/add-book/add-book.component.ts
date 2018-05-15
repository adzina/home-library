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
    this._backendService.createBook(this.collectionID, form.value["title"],form.value["author"],
    form.value["year"],form.value["pages"]).subscribe(bookID=>{
      this._backendService.addBookToCollection(this.collectionID,bookID).subscribe(data=>{
        this.info = "Book successfully added";
        form.reset();
      },
    err=>{
        this.error = "Could not add the book, try again";
    })
    })
  }

}
