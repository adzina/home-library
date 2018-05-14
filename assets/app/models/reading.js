export class Reading{
  constructor(public id: string,
              public userID: string,
              public bookID: string,
              public start: Date,
              public end: Date){}
}
