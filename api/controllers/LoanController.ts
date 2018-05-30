/**
 * LoanController
 *
 * @description :: Server-side logic for managing loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getBooksRentedFromMe: function(req,res){
    let fromID = req.param("from_collectionID");
    this.getBooksRentedFromMeID(fromID,BooksID=>{
      var output = [];
      async.each(BooksID, function(bookID, cb){
        sails.models.book.findOne({id: bookID[0]})
          .then(function(book){
            let elem = {title: book.title,author: book.author, bookID: book.id, to: bookID[1], loanID: bookID[2], rentalDate: bookID[3], userID: bookID[4]};
            output.push(elem);
            console.log(elem)
            cb();
          }).fail(function(error){
            sails.log.debug("Error in getBooksRentedFromMe");
            sails.log.error(error);
            cb(error);
          })
      }, function(error){
        if(error) {
          sails.log.debug("Error in getBooksRentedFromMe");
          sails.log.error(error);
          return res.negotiate(error);}

        return res.json(output);
      });

  })
  },
  getBooksRentedToMe: function(req,res){
    let fromID = req.param("to_collectionID");
    this.getBooksRentedToMeID(fromID,BooksID=>{
      var output = [];
      async.each(BooksID, function(bookID, cb){
        sails.models.book.findOne({id: bookID[0]})
          .then(function(book){
            let elem = {title: book.title,author: book.author, bookID: book.id, from: bookID[1], loanID: bookID[2], rentalDate: bookID[3], userID: bookID[4]};
            output.push(elem);
            cb();
          }).fail(function(error){
            sails.log.debug("Error in getBooksRentedToMe");
            sails.log.error(error);
            cb(error);
          })
      }, function(error){
        if(error) {
          sails.log.debug("Error in getBooksRentedToMe");
          sails.log.error(error);
          return res.negotiate(error);}

        return res.json(output);
      });

  })
  },
  getBooksRentedFromMeID(_collectionID,callback){
    sails.models.loan.find({from_collectionID:_collectionID})
      .exec(function(err,Loans){
        if(err) {
          sails.log.debug("Error in getBooksID");
          sails.log.error(err);}
        var output = [];
        for(let loan of Loans){
          if(loan.returnDate==""){
            let bundle = []
            bundle.push(loan.bookID)
            bundle.push(loan.to_collectionID)
            bundle.push(loan.id)
            bundle.push(loan.rentalDate)
            bundle.push(loan.userID)
            output.push(bundle)
          }
        }
        return callback(output);
      })
  },

  getBooksRentedToMeID(_collectionID,callback){
    sails.models.loan.find({to_collectionID:_collectionID})
      .exec(function(err,Loans){
        if(err) {
          sails.log.debug("Error in getBooksID");
          sails.log.error(err);}
        var output = [];
        for(let loan of Loans){
          if(loan.returnDate==""){
            let bundle = []
            bundle.push(loan.bookID)
            bundle.push(loan.from_collectionID)
            bundle.push(loan.id)
            bundle.push(loan.rentalDate)
            bundle.push(loan.userID)
            output.push(bundle)
          }
        }
        return callback(output);
      })
  }
};
