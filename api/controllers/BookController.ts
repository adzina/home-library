declare var sails: any;

module.exports = {
  create: function(req,res){
    sails.models.book.findOne({collectionID: req.param("collectionID"),
    title: req.param("title"), author: req.param("author"), year: req.param("year"),
    pages:req.param("pages")}).exec(function(err:any, book:any){
      console.log(book)
      if(book!=undefined)
        return res.serverError("This book already is in the collection");
      else{
        return sails.models.book.create({collectionID: req.param("collectionID"),
        title: req.param("title"), author: req.param("author"), year: req.param("year"),
        pages:req.param("pages")})
        .exec(function (err:any, book:any){
           if (err) {
             sails.log.debug("Error in: creating book");
             sails.log.error(err);
             return res.serverError(err); }

           sails.log.debug("Book created");
           return res.json(book.id);

         });
      }
    })

  }
};
