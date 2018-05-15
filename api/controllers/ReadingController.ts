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
}
