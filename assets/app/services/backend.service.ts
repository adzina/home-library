import { Observable,Observer } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Injectable} from '@angular/core';
import { AuthHttp} from 'angular2-jwt';

import { Collection } from '../models/collection';
import { Book } from '../models/book';
import { User } from '../models/user';
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
  addUserToCollection(collectionID: String,userID: String): Observable<any>{
    console.log(collectionID, userID);
    let url = this.url+"/collectionUser";
    let body = JSON.stringify({collectionID: collectionID, userID: userID});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error adding user to collection"))
  }
  createBook(collectionID:string, title:string,author:string,
  year:number,pages:number):Observable<string>{
    let url = this.url+"/book";
    let body = JSON.stringify({collectionID: collectionID, title: title, author: author, year: year, pages:pages});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error creating book"))

  }
  addBookToCollection(collectionID:string,bookID:string):Observable<any>{
    let url = this.url+"/collectionBook";
    let body = JSON.stringify({collectionID: collectionID, bookID: bookID, rented: false});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error adding book to collection"))
  }
  getCollectionBooks(collectionID: string): Observable<Book[]>{
    let url = this.url+"/collectionBook/"+collectionID;
    return this.http.get(url).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error getting collection's books"))
  }
  getCollectionUsers(collectionID: string): Observable<User[]>{
    let url = this.url+"/collectionUser/"+collectionID;
    return this.http.get(url).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error getting collection's User"))
  }
}
