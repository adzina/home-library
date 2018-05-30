declare var sails: any;
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

  afterValidate: function (values, cb) {
    sails.models.collectionuser.findOne({
        collectionID: values.collectionID,
        userID: values.userID
    }).exec(function(err, foo){
        if(err) return cb(err);
        if(foo) {var x = {
                    code: 'E_UNIQUE',
                    details: 'Invalid',
                    model: 'collectionuser',
                    invalidAttributes: {},
                    status: 400}
                    return cb(x);}
        cb(null, values);
    });
}
};
