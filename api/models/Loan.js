/**
 * Loan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'loans',
  attributes: {
    collectionBookID: {type: 'string', required: true},
    userID: {type: 'string', required: true},
    rentalDate: {type: 'date', required: true},
    returnDate: {type: 'date'}
  },
  validationMessages: { //hand for i18n & l10n

     collectionBookID: {
       required: 'collectionBookID is required'
     },
     userID:{
       required: 'UserID is required'
     },
     rentalDate: {
        required: 'RentalDate is required'
     }

    },
};
