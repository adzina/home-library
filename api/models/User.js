var bcrypt=require("bcryptjs");

module.exports = {
  tableName: "users",
	attributes: {
		username: {type:'string',required:'true',unique: true},
		email: {type:'email', required: 'true', unique: true},
		password: {type: 'string', required: 'true'},
		confirmed: {type: 'boolean', required: 'true'},
  },
	validationMessages: { //hand for i18n & l10n
	   username: {
	     required: 'Name is required',
			 unique: 'This username is already used'
	   },
	   email: {
	     email: 'Provide valid email address',
	     required: 'Email is required',
	     unique: 'This email is already used'
	   },
	   password: {
	     required: 'Password is required'
	   },
		 confirmed:{
			 required: 'Set the confirmed value'
		 }
 		},

		beforeCreate: function (values, cb) {
	   // Hash password
	   bcrypt.hash(values.password, 10, function (err, hash) {
	     if (err) return cb(err);
	     values.password = hash;
	     cb();
	   });
	 },

	 beforeUpdate: function(valuesToUpdate, cb){
	   bcrypt.hash(valuesToUpdate.password, 10, function (err, hash) {
	     if (err) return cb(err);
	     valuesToUpdate.password = hash;
	     cb();
	   });
	 }

}
