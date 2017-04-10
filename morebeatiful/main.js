Users = new Mongo.Collection('users');



import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var ReviewIDNumber = 7;


  
Template.reviewList.helpers({
	getReviews() {
		var theReviews = Products.find({});
		//change the 5 to the productid number
		//for users add user id in the add to collect and search by it
		//var theReviews = Products.find({productReviewID:5});
		console.log(theReviews);
		return theReviews;
  },
  
  removeReviws(){
      products.remove({});
    },
});

Template.reviewList.events({
	
	'click .submitR'(event) {
    console.log("Clicked submit");
	
	// Get value from form element
    const inputWords = document.getElementById('inputBox').value;
    console.log("Word submitted is " + inputWords);
	
/* 	//Gets the rating value
	var e = document.getElementById("qRating");
	var ratingNum = e.options[e.selectedIndex].value;
	console.log("ratingNumber is " + ratingNum); */
	
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var rightNow = date+' '+time;
	console.log("right now is "+ rightNow);
	console.log("idnub "+ ReviewIDNumber);
	
	//addReview(ReviewIDNumber++,inputWords,ratingNum,userID,productID)
	//addReview(ReviewIDNumber++,inputWords,ratingNum);
	Meteor.call('addReviews',ReviewIDNumber, inputWords, rightNow);
	},
	
	
	'click .clear'(event) {
		Meteor.call('removeReviews');
  },
});