import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html'
})

export class LibrariesComponent implements OnInit {
  constructor(private _backendService: BackendService,
              private _router: Router) { }


  ngOnInit() {
  }


}
