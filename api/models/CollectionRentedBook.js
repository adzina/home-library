module.exports = {
  tableName: 'collectionrentedbooks',
  attributes: {
    bookID: {type: 'string', required: true},
    collectionID: {type: 'string', required: true},
  },
  validationMessages: { //hand for i18n & l10n
     bookID: {
       required: 'BookID is required'
     },
     author: {
       required: 'Author is required'
     }
    },
};
