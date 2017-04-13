
Template.productReviews.helpers({
	getReviews(){
		var userID = Meteor.userId();
		var userReviewlist = Review.find({user_id: userID});
		return userReviewlist;
	},
})
