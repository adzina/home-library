import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html'
})

export class RentalDetailsComponent implements OnInit {
  constructor(private _backendService: BackendService,
              private _router: Router) { }

  private author = localStorage.getItem("author");
  private title = localStorage.getItem("title");
  private rentalDate = localStorage.getItem("rentalDate");
  private rentedToID = localStorage.getItem("rentedToID");
  private user: User;
  ngOnInit() {
    this._backendService.findUserByID(this.rentedToID).subscribe(user=>{
      this.user = user;
    })
  }


}
