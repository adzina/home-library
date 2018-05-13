module.exports = {
  tableName: 'collectionbooks',
  attributes: {
    bookID: {type: 'string', required: true},
    collectionID: {type: 'string', required: true}
  },
  validationMessages: { //hand for i18n & l10n
     bookID: {
       required: 'UserID is required'
     },
     collectionID: {
       required: 'CollectionID is required'
     }
    },
};
