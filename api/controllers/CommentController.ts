/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getBooksComments: function(req,res){
		let bookID = req.params("bookID");

		sails.models.comment.find({bookID: bookID}).exec(async function(comments,err){
					let prs=[]
					for(let comment of comments){
						let pr = await sails.models.user.findOne({id:comment.userID});
						prs.push(pr);
					}
					
			})
		}
	};
