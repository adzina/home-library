module.exports = {

	create: function (req, res) {
		const body = req.body
		sails.hooks.email.send(
		 "welcomeEmail",
		 {
			 Name: body.username,
		 },
		 {
			 to: body.email,
			 subject: "Welcome Email"
		 },
		 function(err) {
			 console.log(err || "Mail Sent!");
		 	}
		 )
	 }
};
