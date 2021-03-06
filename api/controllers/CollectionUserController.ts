declare var sails: any;
import * as async from "async"
module.exports = {
  getCollectionUsers: function(req,res){
    let collectionID = req.param("collectionID");
    this.getUsersID(collectionID,UsersID=>{
      var output = [];
      async.each(UsersID, function(userID, cb){
        sails.models.user.findOne({id: userID})
          .then(function(user){
            output.push({username:user.username, id: user.id, email: user.email, confirmed: user.confirmed});
            cb();
          }).fail(function(error){
            sails.log.debug("Error in getCollectionUsers");
            sails.log.error(error);
            cb(error);
          })
      }, function(error){
        if(error) {
          sails.log.debug("Error in getCollectionUsers");
          sails.log.error(error);
          return res.negotiate(error);}

        return res.json(output);
      });

  })
  },
    getUsersID:function(_collectionID,callback){
      sails.models.collectionuser.find({collectionID:_collectionID})
        .exec(function(err,Users){
          if(err) {
            sails.log.debug("Error in getUsersID");
            sails.log.error(err);}
          var output:string[];
          output=[];
          for(var i=0;i<Users.length;i++){
            output[i]=Users[i].userID;
          }
          return callback(output);
        })
  },

  getUserCollections: function(req,res){
    let userID = req.param("userID");
    this.getCollectionsID(userID,CollectionsID=>{
      var output = [];
      async.each(CollectionsID, function(collectionID, cb){
        sails.models.collection.findOne({id: collectionID})
          .then(function(collection){
            output.push({name:collection.name, id: collection.id, ownerID: collection.ownerID});
            cb();
          }).fail(function(error){
            sails.log.debug("Error in getUserCollections");
            sails.log.error(error);
            cb(error);
          })
      }, function(error){
        if(error) {
          sails.log.debug("Error in getUserCollections");
          sails.log.error(error);
          return res.negotiate(error);}

        return res.json(output);
      });

  })
  },
    getCollectionsID:function(_userID,callback){
      sails.models.collectionuser.find({userID:_userID})
        .exec(function(err,collections){
          if(err) {
            sails.log.debug("Error in getCollecionsID");
            sails.log.error(err);}
          var output:string[];
          output=[];
          for(var i=0;i<collections.length;i++){
            output[i]=collections[i].collectionID;
          }
          return callback(output);
        })
  },
  addUserToCollection: function(req,res){
    sails.models.collectionuser.create({collectionID: req.param("collectionID"),userID: req.param("userID")})
      .exec(function(err, collectionUser){
        if(err){
          if (err.code === 'E_UNIQUE')
            try {
              err = JSON.parse(err.details.last(err.details.length - 'Details: '.length))
              sails.log.error(err);
              return res.serverError(err);
            } catch (e) { return res.serverError(400);}
          else{
            sails.log.error(err);
            return res.serverError(err);
            }
        }
        if(collectionUser){
          sails.log.debug("User added to collection");
          return res.json(200);

        }
      }
      )

    } 
}
