/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getBooksComments: function(req,res){
		let bookID = req.param("bookID");
		console.log("komentarze");
		console.log(bookID);
		sails.models.comment.find({bookID: bookID}).exec(function(err,comments){
					console.log(comments);
					return res.json(comments);

			})
		}
	};
