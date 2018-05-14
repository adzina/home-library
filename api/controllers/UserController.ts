declare var sails: any;
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

module.exports = {
  create:function(req,res){
    let username= req.param("username"),
        email= req.param("email"),
        password= req.param("password");

    return sails.models.user.create({username:username,
                                    email: email,
                                    password: password,
                                    confirmed: false})
      .exec(function (err:any, user:any){
       if (err) {
         sails.log.debug("Error in: creating user");
         sails.log.error(err);
         return res.serverError(err); }

       sails.log.debug("User created");
       return res.json(200);

     });

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
