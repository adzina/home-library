/**
 * Loan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'loans',
  attributes: {
    to_collectionID: {type: 'string', required: true},
    from_collectionID: {type: 'string', required: true},
    bookID: {type: 'string', required: true},
    rentalDate: {type: 'date', required: true},
    returnDate: {type: 'date'}
  },
  validationMessages: { //hand for i18n & l10n

     to_collectionID: {
       required: 'collectionID is required'
     },
     from_collectionID: {
       required: 'collectionID is required'
     },
     bookID:{
       required: 'bookID is required'
     },
     rentalDate: {
        required: 'RentalDate is required'
     }

    },
};
