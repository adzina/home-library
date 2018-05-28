import { Observable,Observer } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Injectable} from '@angular/core';
import { AuthHttp} from 'angular2-jwt';

import { Collection } from '../models/collection';
import { Book } from '../models/book';
import { User } from '../models/user';
import { Reading } from '../models/reading';
import { Loan } from '../models/loan';

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
    .catch(err=>Observable.throw("Error getting collection"));
  }
  getCollectionByID(id: String): Observable<Collection>{
    let url = this.url+"/collection/"+id;
    return this.http.get(url).map((res:Response)=> res.json())
    .catch(err=>Observable.throw("Error getting collection"));
  }
  createHomeCollection(id:String, name:String): Observable<any>{
    let url = this.url+"/collection";
    let body = JSON.stringify({ownerID: id, name: name});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error creating collection"));
  }
  addUserToCollection(collectionID: String,userID: String): Observable<any>{
    let url = this.url+"/collectionUser";
    let body = JSON.stringify({collectionID: collectionID, userID: userID});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error adding user to collection"));
  }
  createBook(collectionID:string, title:string,author:string,
  year:number,pages:number):Observable<string>{
    let url = this.url+"/book";
    let body = JSON.stringify({collectionID: collectionID, title: title, author: author, year: year, pages:pages});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error creating book"));

  }
  addBookToCollection(collectionID:string,bookID:string):Observable<any>{
    let url = this.url+"/collectionbook";
    let body = JSON.stringify({collectionID: collectionID, bookID: bookID});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error adding book to collection"));
  }
  removeBookFromCollection(collectionID:string,bookID:string):Observable<any>{
    let url = this.url+"/collectionbook/remove";
    let body = JSON.stringify({collectionID: collectionID, bookID: bookID});
    return this.http.post(url, body).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error removing book from collection"));
  }
  getCollectionBooks(collectionID: string): Observable<Book[]>{
    let url = this.url+"/collectionBook/"+collectionID;
    return this.http.get(url).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error getting collection's books"));
  }
  getCollectionUsers(collectionID: string): Observable<User[]>{
    let url = this.url+"/collectionUser/"+collectionID;
    return this.http.get(url).map((res: Response)=> res.json())
    .catch(err=> Observable.throw("Error getting collection's User"));
  }

  getMyCollections(userID: string): Observable<Collection[]>{
    let  url = this.url+"/userCollection/"+userID;
    return this.http.get(url).map((res:Response)=> res.json())
    .catch(err=> Observable.throw("Error getting my collections"));
  }
  getAllUsers(): Observable<User[]>{
    let url = this.url+"/user";
    return this.http.get(url).map((res:Response)=> res.json())
    .catch(err=> Observable.throw("Error getting all users"));
  }
  rentABook(from_collectionID: string, to_collectionID:string, bookID: string): Observable<any>{
    let url = this.url+"/loan";
    let now = new Date();
    let body = JSON.stringify({from_collectionID:from_collectionID,
      to_collectionID:to_collectionID,
      bookID: bookID,
      rentalDate:now,
      returnDate: ""});
    return this.http.post(url, body).map((res:Response)=> res.json())
    .catch(err=>Observable.throw("Error renting a book"));
  }
  findMyBorrowings(from_collectionID: string): Observable<Loan[]>{
    let url = this.url+"/loan/booksRentedFromMe/"+from_collectionID;
    return this.http.get(url).map((res:Response)=> res.json())
    .catch(err=>Observable.throw("Error finding rented books"));
  }
  findMyLoans(to_collectionID: string): Observable<Loan[]>{
    let url = this.url+"/loan/booksRentedToMe/"+to_collectionID;
    return this.http.get(url).map((res:Response)=> res.json())
    .catch(err=>Observable.throw("Error finding lend books"));
  }
  returnBook(loanID: string): Observable<any>{
    let url = this.url + "/loan/"+loanID;
    let now = new Date();
    let body = JSON.stringify({returnDate:now})
    return this.http.put(url, body).map((res:Response)=> res.json())
    .catch(err=>Observable.throw("Error returning book"));
  }
  addReading(bookID: string,userID:string): Observable<any>{
    let url = this.url+"/reading";
    let now = new Date();
    let body = JSON.stringify({userID:userID, bookID: bookID, start:now, end:""});
    return this.http.post(url, body).map((res:Response)=> res.json())
    .catch(err=>Observable.throw("Error adding a reading a book"));
  }
  updateReading(bookID: string,userID:string): Observable<any>{
    let url = this.url+"/reading";
    let now = new Date();
    let body = JSON.stringify({userID:userID, bookID: bookID, end:now});
    return this.http.put(url, body).map((res:Response)=> res.json())
    .catch(err=>Observable.throw("Error finishing reading a book"));
  }
  getReadings(): Observable<Reading[]>{
    let url = this.url+"/reading";
    return this.http.get(url).map((res:Response)=>res.json())
    .catch(err=>Observable.throw("Error getting readings"));
  }
  getLastReadBook(userID:string): Observable<Book>{
    let url = this.url+"/reading/lastRead/"+userID;
    return this.http.get(url).map((res:Response)=>res.json())
    .catch(err=>Observable.throw("Error getting last read book"));
  }
  getNowReading(userID: string): Observable<Book[]>{
    let url = this.url+"/reading/nowRead/"+userID;
    return this.http.get(url).map((res:Response)=>res.json())
    .catch(err=>Observable.throw("Error getting now read books"));
  }
  getOldestReading(userID:string): Observable<any>{
    let url = this.url+"/reading/oldest/"+userID;
    return this.http.get(url).map((res:Response)=>res.json())
    .catch(err=>Observable.throw("Error getting oldest reading"));
  }
  getStats(userID:string): Observable<any>{
    let url = this.url+"/reading/stats/"+userID;
    return this.http.get(url).map((res:Response)=>res.json())
    .catch(err=>Observable.throw("Error getting reading stats"));
  }
  findUserByEmail(email: string): Observable<any>{
    let url = this.url+"/user/find/"+email;
    return this.http.get(url).map((res:Response)=>res.json())
    .catch(err=>Observable.throw("Error finding user"));
  }
}
