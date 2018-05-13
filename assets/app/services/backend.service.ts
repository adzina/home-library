import { Observable,Observer } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Injectable} from '@angular/core';
import { AuthHttp} from 'angular2-jwt';

import { Collection } from '../models/collection';
@Injectable()
export class BackendService{
  constructor(private http:AuthHttp){}

  private url = "http://localhost:1337";

  getUrl(){
    return this.url;
  }
  getHomeCollection(id: String): Observable<Collection>{
    let url = this.url+"/collection/homeCollection/"+id;
    return this.http.get(url).map((res:Response)=> res.json())
    .catch(err=>Observable.throw("Error getting collection"))
  }

  createHomeCollection(id:String, name:String): Observable<any>{
    let url = this.url+"/collection";
    let body = JSON.stringify({ownerID: id, name: name});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error creating collection"))
  }

}
