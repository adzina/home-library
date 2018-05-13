module.exports = {
  tableName: 'collectionusers',
  attributes: {
    userID: {type: 'string', required: true},
    collectionID: {type: 'string', required: true}
  },
  validationMessages: { //hand for i18n & l10n
     userID: {
       required: 'UserID is required'
     },
     collectionID: {
       required: 'CollectionID is required'
     }
    },
};
