declare var sails: any;
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

module.exports = {
  create:function(req,res){
    let username= req.param("username"),
        email= req.param("email"),
        password= req.param("password");
    let secret = Math.floor(Math.random() * 100000000);
    return sails.models.user.create({username:username,
                                    email: email,
                                    password: password,
                                    confirmed: false,
                                    secret: secret})
      .exec(function (err:any, user:any){
       if (err) {
         sails.log.debug("Error in: creating user");
         sails.log.error(err);
         return res.serverError("validation error"); }

       sails.log.debug("User created");
       setTimeout(function(){
         sails.models.user.destroy({username:username}).exec(function(){
           console.log("user deleted");
         })
       }, 24*60*60*1000);
       return res.json({secret: secret, id:user.id});


     });

  },
  confirm: function(req,res){
    let id = req.param("id");
    let secret = req.param("secret");
    return sails.models.user.update({id:id,secret: secret},
                                    {registered:true})
                                    .exec(function(user,err){
                                      if(user==null || err)
                                        return res.html("<h2>Your token has timed out</h2>")
                                      console.log("user registred");
                                      return res.html("<h2>You can log in now</h2>");
                                    })
  },
  confirmAndAddToCollection: async function(req,res){
    let id = req.param("id");
    let secret = req.param("secret");
    let collID = req.param("collID");
    let username = req.param("username");
    let email = req.param("email");
    let password = req.param("password");

    await sails.models.user.create({username:username,
                                    email: email,
                                    password: password,
                                    confirmed: true}).exec(function(){
                                      console.log("user created");
                                    });
    await sails.models.collectionuser.update({userID:secret,collectionID: collID},{userID:id}).exec(function(){

        console.log("user created");
    });

    return res.json("You have been added to the collection, you can log in now");
  },
  find: function(req, res){
    sails.models.user.findOne({
      email: req.param("email")
    }).exec(function callback(err, user) {
      if (err) {
        sails.log(err);
        return res.serverError(err);}
      if(user){
        sails.log("user found");
        return res.json({id: user.id});
      }
      if(!user){
        sails.log("no such user")
        return res.json({id: ""});
      }

    })
  },
  login: function(req, res) {
    /**
     * check if the username matches any users
     */
    sails.models.user.findOne({
      username: req.body.username
    }).exec(function callback(err, user) {
      if (err) {
        sails.log(err);
        return res.serverError(err);}
      if (!user) return res.serverError("User not found, please sign up.");


      //check password
      bcrypt.compare(req.body.password, user.password, function(error, matched) {
        if (error) {
          return res.serverError(error);}

        if (!matched) return res.serverError("Invalid password.");

        //save the date the token was generated for already inside toJSON()
        var token = jwt.sign(user.toJSON(), "this is my secret key", {
          expiresIn: '90m'
        });

        //return the token here
        res.json(200, { id_token: token, id: user.id});
      });

    });
},
  getAllUsers: function(req,res){
    return sails.models.user.find()
      .exec(function (err:any, users:any){
       if (err) {
         sails.log.debug("Error in: get all users");
         sails.log.error(err);
         return res.serverError(err); }
      let output = []
       for (let u of users){
         output.push({username: u.username, email: u.email, id: u.id})
       }
       sails.log.debug("Users found");
       return res.json(output);

     });
  }
};
