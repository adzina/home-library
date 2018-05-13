declare var sails: any;

module.exports = {
	create: function(req,res){
		let ownerID= req.param("ownerID"),
				name= req.param("name");

		return sails.models.collection.create({ownerID:ownerID,
																		name: name})
			.exec(function (err:any, collection:any){
			 if (err) {
				 sails.log.debug("Error in: creating collection");
				 sails.log.error(err);
				 return res.serverError(err); }

			 sails.log.debug("Collection created");
			 return res.json(200);

		 });

	},
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
