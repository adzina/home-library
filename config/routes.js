module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

     '/': {
       view: 'homepage'
     },
     '/register': {
       view: 'homepage'
     },
     '/register-from-invite/:secret/:collID':{
       view: 'homepage'
     },

     'GET /collection/homeCollection/:ownerID': 'CollectionController.getHomeCollection',

     'GET /collectionBook/:collectionID': 'CollectionBookController.getCollectionBooks',
     'POST /collectionBook/remove': 'CollectionBookController.removeBook',

     'GET /collectionUser/:collectionID': 'CollectionUserController.getCollectionUsers',
     'GET /userCollection/:userID': 'CollectionUserController.getUserCollections',
     'POST /collectionUser': 'CollectionUserController.addUserToCollection',

     'GET /comment/booksComments/:bookID': 'CommentController.getBooksComments',

     'GET /loan/booksRentedFromMe/:from_collectionID': 'LoanController.getBooksRentedFromMe',
     'GET /loan/booksRentedToMe/:to_collectionID': 'LoanController.getBooksRentedToMe',

     'POST /reading/update': 'ReadingController.update',

     'GET /reading/myReadings': 'ReadingController.getMyReadings',
     'GET /reading/lastRead/:userID': 'ReadingController.getLastRead',
     'GET /reading/nowRead/:userID': 'ReadingController.getNowRead',
     'GET /reading/stats/:userID': 'ReadingController.countReadBooks',
     'GET /reading/oldest/:userID': 'ReadingController.getOldestReading',
     'PUT /reading': 'ReadingController.update',


     'POST /user': 'UserController.create',
     'GET /user': 'UserController.getAllUsers',
     'POST /user/login': 'UserController.login',
     'GET /user/find/:email': 'UserController.find',
     'GET /user/register/:id/:secret': 'UserController.confirm',
     'POST /user/register-from-invite': 'UserController.confirmAndAddToCollection',

     'POST /scrape': 'ScrapeController.scrape'

};
