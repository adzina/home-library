import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rent-a-book',
  templateUrl: './rent-a-book.component.html'
})

export class RentABookComponent implements OnInit {
  constructor(private _backendService: BackendService,
              private _router: Router) { }


  ngOnInit() {
  }


}
