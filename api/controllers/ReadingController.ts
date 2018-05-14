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
  }
};
