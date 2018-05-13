/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "comments",
  attributes: {
    date: {type: 'date', required: true},
    text: {type: 'string', required: true},
    bookID: {type: 'string', required: true},
    userID: {type: 'string', required: true},
  },
  validationMessages: { //hand for i18n & l10n
	   date: {
	     required: 'Date is required'
	   },
	   text: {
	     required: 'Text is required'
	   },
	   bookID: {
	     required: 'BookID is required'
	   },
		 userID:{
			 required: 'UserID is required'
		 }
 		},
};
