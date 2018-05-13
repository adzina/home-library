import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html'
})

export class AddBookComponent implements OnInit {
  constructor(private _backendService: BackendService,
              private _router: Router) { }


  ngOnInit() {
  }


}
