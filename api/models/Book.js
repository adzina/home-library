/**
 * Book.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'books',
  attributes: {
    title: {type: 'string', required: true},
    author: {type: 'string', required: true},
    collectionID: {type: 'string', required: true},
    year: {type: 'date', required: true},
    pages: {type: 'number', required: true }
  },
  validationMessages: { //hand for i18n & l10n
     title: {
       required: 'Title is required'
     },
     author: {
       required: 'Author is required'
     },
     collectionID:{
       required: 'CollectionID is required'
     },
     year:{
       required: 'Year is required'
     },
     pages:{
       required: 'Page count is required'
     }
    },
};
