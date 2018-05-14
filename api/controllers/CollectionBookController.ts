declare var sails: any;
import * as async from 'async';
module.exports = {
	getCollectionBooks: function(req,res){
		let collectionID = req.param("collectionID");
		this.getBooksID(collectionID,BooksID=>{
			var output = [];
			async.each(BooksID, function(bookID, cb){
				sails.models.book.findOne({id: bookID})
					.then(function(book){
						output.push(book);
						cb();
					}).fail(function(error){
						sails.log.debug("Error in getCollectionBooks");
						sails.log.error(error);
						cb(error);
					})
			}, function(error){
				if(error) {
					sails.log.debug("Error in getCollectionBooks");
					sails.log.error(error);
					return res.negotiate(error);}

				return res.json(output);
			});

	})
},
		getBooksID:function(_collectionID,callback){
		  sails.models.collectionbook.find({collectionID:_collectionID})
		    .exec(function(err,Books){
		      if(err) {
            sails.log.debug("Error in getBooksID");
            sails.log.error(err);}
		      var output:string[];
		      output=[];
		      for(var i=0;i<Books.length;i++){
		        output[i]=Books[i].bookID;
		      }
		      return callback(output);
		    })
},
};
