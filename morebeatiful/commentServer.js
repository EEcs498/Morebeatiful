import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

if (Meteor.isServer) {
  Meteor.methods({
    //Method to add reviews
	//addReview: function(productID,inputWords,ratingDat,userID)
	addReviews: function(ReviewIDNumber, inputWords, ratingDat){
	Products.insert({
		productReviewID: ReviewIDNumber,
        reviewText: inputWords,
		ratingDate: ratingDat,
      });
	},
	
	removeReviews: function(){
      Products.remove({});
    }
  })
}