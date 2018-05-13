/**
 * Collection.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'collections',
  attributes: {
    ownerID: {type: 'string', required: true},
    name: {type: 'string', required: true}
  },
  validationMessages: { //hand for i18n & l10n
     name: {
       required: 'Name is required'
     },
     ownerID: {
       required: 'OwnerID is required'
     }
    },
};
