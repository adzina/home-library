import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { Collection } from '../../models/collection';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  private collections: Collection[];
  constructor(private _backendService: BackendService,
              private _router: Router) { }


  ngOnInit() {
    this._backendService.getMyCollections(localStorage.getItem("userID")).subscribe(data=>{
      this.collections = data;
    })
  }


}
