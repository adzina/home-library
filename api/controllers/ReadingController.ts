/**
 * ReadingController
 *
 * @description :: Server-side logic for managing loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req,res){
    var data = { bookID: req.param("bookID"), userID: req.param("userID"), end: req.param("end") };
    sails.models.reading.update({bookID: req.param("bookID"), userID: req.param("userID")}, data, function(err, updated) {

              return res.json(updated);
            })
  },
  getLastRead: function(req, res){
    let userID = req.param("userID");
    this.getReadingID(userID, readingID=>{
      sails.models.book.findOne({id: readingID}).exec(function(err,book){
        console.log(book);
        return res.json(book);
      })
    })
  },

getReadingID:function(_userID,callback){
  sails.models.reading.find({userID:_userID}).sort('end DESC').exec(function(err,readings){
    return callback(readings[0].bookID)
    })
  },
getNowRead:function(req,res){
  let userID = req.param("userID");
  this.getNowReadingID(userID, ReadingID=>{
    var output = [];
    async.each(ReadingID,function(readingID,cb){
      sails.models.book.findOne({id: readingID}).exec(function(err,book){
        output.push(book);
        cb();
      });
    }, function(error){
      if(error) {
        sails.log.debug("Error in getNowRead");
        sails.log.error(error);
        return res.negotiate(error);}
      sails.log.debug("Books now read found");
      sails.log.debug(output)
      return res.json(output);
    })

    })
  },
getNowReadingID:function(_userID,callback){
    sails.models.reading.find({userID:_userID}).sort('start DESC').exec(function(err,readings){
      let output = [];
      for(let reading of readings){
        if(reading.end==""){
          output.push(reading.bookID);
        }
      }
      return callback(output)
      })
  },
countReadBooks: function(req,res){
  let userID = req.param("userID");
  this.getAllReadingID(userID, ReadingID=>{
    var nr_books = 0;
    var nr_pages = 0;
    async.each(ReadingID,function(readingID,cb){
      sails.models.book.findOne({id: readingID}).exec(function(err,book){
        nr_books+=1;
        nr_pages+=Number(book.pages);
        cb();
      });
    }, function(error){
      if(error) {
        sails.log.debug("Error in countReadBooks");
        sails.log.error(error);
        return res.negotiate(error);}
      sails.log.debug("Nr of books and pages found");
      sails.log.debug(nr_books)
      sails.log.debug(nr_pages)
      return res.json({nr_books:nr_books,nr_pages: nr_pages});
    })

    })
  },
  getAllReadingID:function(_userID,callback){
      sails.models.reading.find({userID:_userID}).exec(function(err,readings){
        let output = []
        for(let r of readings){
          output.push(r.bookID)
        }
        return callback(output)
        })
    },
  getOldestReading:function(req,res){
    let userID = req.param("userID");
    return sails.models.reading.find({userID:userID}).sort('start ASC').exec(function(err,readings){
      if(err){
        sails.log.debug("Error in countReadBooks");
        sails.log.error(err);
        return res.negotiate(err);
      }
      let output = 0
      if(readings.length!=0)
        output = readings[0].start
      sails.log.debug("Oldest reading found");
      sails.log.debug(output)
      return res.json(output);
    })
  }
}
