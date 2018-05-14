declare var sails: any;

module.exports = {

	getHomeCollection: function(req,res){
		let ownerID = req.param("ownerID");
		console.log(ownerID)
		return sails.models.collection.findOne({ownerID:ownerID})
		.exec(function (err:any, collection:any){
       if (err) {
         sails.log.debug("Error in: finding collection");
         sails.log.error(err);
         return res.serverError(err); }

       sails.log.debug("Collection found");
			 sails.log(collection)
       return res.json(collection);

     });
	}
};
