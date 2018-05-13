/**
 * Reading.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "readings",
  attributes: {
    bookID: {type: 'string',required: true},
    userID: {type: 'string',required: true},
    start: {type: 'date', required: true},
    end: {type: 'date', required: true }
  },
  validationMessages: { //hand for i18n & l10n
     start: {
       required: 'Start date is required'
     },
     end: {
       required: 'End date is required'
     },
     bookID: {
       required: 'BookID is required'
     },
     userID:{
       required: 'UserID is required'
     }
    },
};
