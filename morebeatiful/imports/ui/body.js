import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './body.html';
import '../api/profile.js';
import { Profile } from '../api/profile.js';
import { Products } from '../api/products.js';
import { Friend } from '../api/friend.js';
import { Friend_re } from '../api/friend.js';
import { Scores } from '../api/scores.js';
import { Wish_list} from '../api/wish_list.js';
import { Own_list} from '../api/own_list.js';
import { Review} from '../api/review.js';
import { Session } from 'meteor/session'
import './accounts-config.js';
/*Profile.insert({
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });*/
    /*Router.route('/product/:_id',{
      template: 'product'
    });*/

//Router.route('/product');
var ReviewIDNumber = 7;
Router.route('/', {
  template: 'home'
  });
Router.route('/product/:_id', function(){
  this.subscribe('product');
  this.render('product', {
    data: function(){
      console.log(this.params._id);
      return Products.findOne({_id: this.params._id});
    }
  });
});
Router.route('/profile/:_id', function(){
  this.subscribe('profile');
  this.render('profile', {
    data: function(){
      console.log(this.params._id + "1");
      Session.set("p_id", this.params._id);
      return Profile.findOne({_id: this.params._id});
    }
  });
});

/*Router.route('/product/:input',function(){
    this.render('product');
});*/
Template.product.onCreated(function productOnCreated() {

});
Template.product.helpers({
  products_b: function(){
    return this.brand;
  },
  products_n: function (){
    return this.name;
  },
  products_t: function (){
    return this.type;
  },
  products_p: function (){
    return this.price;
  },
  src : function(){
    return this.src;
  },
  point: function (){
    var number = Scores.find({product_id: this._id}).count();
    var point = "";
    if(number == 0)
    {
      point = "no reviews avaliable";
    }
    else
    {
      var arry = Scores.find({product_id: this._id}).fetch();
      var points =  _.pluck(arry, "score");
      var sum_p = _.reduce(points, function(sum, score){
      return sum + parseFloat(score);
    }, 0);
      point = sum_p / number;
      console.log(sum_p);
      console.log(point);
    }

    return point;
  },
  user_id(){
    return Meteor.userId();
  },
  getReviews(){
    return Review.find({product_id: this._id});
  },
  /*removeReviws(){
    Review.remove({$and: [{user_id: Meteor.userId()}, {product_id: this._id}]});
  },*/
  user_name: function(){
    console.log("profile");
    console.log(Meteor.user().username || Meteor.user().profile.name);
    return Meteor.user().username || Meteor.user().profile.name;
  },
});
Template.home.helpers({
  prod_ducts(){
    return Products.find({ });
  },
  user_id(){
    return Meteor.userId();
  },
});
Template.body.helpers({
  user_id(){
    return Meteor.userId();
  },
});
Template.profile.helpers({
  user_name: function(){
    console.log("profile");
    //console.log(Meteor.user().username || Meteor.user().profile.name);
    var arry = Profile.findOne({owner: Session.get("p_id")}, {username: 1});
    //return Meteor.user().username || Meteor.user().profile.name;

    if (Session.get("p_id") == Meteor.userId())
    {
      Session.set("c_user", false);
    }
    else
    {
      Session.set("c_user", true);
    }
    console.log(Session.get("c_user") + "c_user");

    return arry.username;
  },
  wish_items: function(){
    console.log("wish_now")
    return Wish_list.find({
      user_id: Session.get("p_id")
      });
  },
  own_items: function(){
    console.log("own_now")
    return Own_list.find({
      user_id: Session.get("p_id")
      });
  },
  profiles: function(){
    return Profile.find({
      owner: Session.get("p_id")
      });
  },
  c_users: function(){
    return Session.get("c_user")
  },
  user_id: function(){
    return Meteor.userId();
  },
  friend_f: function(){
    console.log(Session.get("p_id"));
    console.log(Friend_re.find({user_t: Session.get("p_id")}));
    return Friend_re.find({user_t: Session.get("p_id")});
  },
  friends: function(){
    return Friend.find({f1:Meteor.userId()});
  }

});
Template.home.events({
  'keydown .new-task': function(event, instance){
      console.log("keydown");
      console.log(event.keyCode);
      if((event.keyCode == 13))
      {
        event.preventDefault();
        const target = event.target;
        const text = target.value;
        var number = Products.find({name: text}).count();
        if (number != 0)
        {
          var arry = Products.findOne({name: text}, {_id: 1});
          console.log(arry._id);
          Router.go('/product/' + arry._id);
          return false;
        }
        else
        {
          target.value ='';
          confirm("No results");
          return false;
        }
      }
  },
});
Template.profile.events({
  "submit #sel": function(event, template){
    event.preventDefault();
    console.log("sel");
    console.log(hair.color.value);
    console.log(eye.color.value);
    console.log(skin.type.value);
    //Profile.update({_id : this._id},{$set:{hair_color : hair.color.value,
      // eye_color : eye.color.value, skin_type: skin.type.value}});\
    var _id = Session.get("p_id");
    Meteor.call('profile_update', _id, hair.color.value, eye.color.value, skin.type.value);
  },
  "click #ffff": function(event, template){
    event.preventDefault();
    var user1 = Meteor.userId();
    var user2 = Session.get("p_id");
    if(user1 != user2)
    {
      if (Friend_re.find({$and: [{user_f: user1}, {user_t: user2}]}).count() == 0)
      {
        if(Friend_re.find({$and: [{user_f: user2}, {user_t: user1}]}).count() != 0)
        {
          console.log("1");
        }
        else
        {
          confirm("Requeste Sent");
          Friend_re.insert({
            user_f: user1, user_t: user2, createdAt: new Date(),
          });
          console.log(Session.get("p_id"));
          console.log(Meteor.userId());
        }
      }
      else
      {
        confirm("Requeste Already Sent");
      }
    }
    else{
      confirm("You are already your own friend");
    }
  },
  "submit #add_f": function(event, template){
    console.log("123");
    event.preventDefault();
    var name = add_f.add.value;
    var exists = Profile.find({username: name}).count();
    if(exists == 0)
    {
      confirm("User Not Found");
    }
    else
    {
      var user1 = Meteor.userId();
      var user = Profile.findOne({username: name}, {owner: 1});
      var user2 = user.owner;
      var user_n = (Profile.findOne({owner: Meteor.userId()}, {username: 1})).username;
      if(user1 != user2)
      {
        if (Friend_re.find({$and: [{user_f: user1}, {user_t: user2}]}).count() == 0)
        {
          if(Friend_re.find({$and: [{user_f: user2}, {user_t: user1}]}).count() != 0)
          {
            console.log("1");
          }
          else
          {
            confirm("Requeste Sent");
            Friend_re.insert({
              user_f: user1, user_t: user2, createdAt: new Date(), usern_f: user_n
            });
            console.log(Session.get("p_id"));
            console.log(Meteor.userId());
          }
        }
        else
        {
          confirm("Requeste Already Sent");
        }
      }
      else{
        confirm("You are already your own friend");
      }
    }
    console.log(name);
  },
  "click .accept": function(event){
    event.preventDefault();
    console.log("click");
    console.log(event.target.id);
    var arry = Profile.findOne({owner: event.target.id}, {username: 1});
    var f2_n = arry.username;
    arry = Profile.findOne({owner: Meteor.userId()}, {username: 1});
    var f1_n = arry.username;
    Friend.insert({f1: Meteor.userId(), f2: event.target.id, f1_n: f1_n, f2_n: f2_n});
    Friend.insert({f2: Meteor.userId(), f1: event.target.id, f1_n: f2_n, f2_n: f1_n});
    Meteor.call('remove_f', event.target.id, Meteor.userId());
    confirm("Accepted");
  },
  "click .decline": function(event){
    event.preventDefault();
    console.log("click");
    console.log(event.target.id);
    Meteor.call('remove_f', event.target.id, Meteor.userId());
    confirm("Do you really want to decline?");
  },

});
Template.product.events({
  "submit #quality": function(event, template){
    event.preventDefault();
    var point = quality.point.value;
    console.log(point);
    //store points in database
    Scores.insert({
      user_id: Meteor.userId(), product_id: this._id, score: point, createdAt: new Date()
      });
  },
  "submit #wish": function(event, template){
    event.preventDefault();
    var num = Wish_list.find({$and: [{user_id: Meteor.userId()}, {product_id: this._id}]}).count();
    if (num == 0)
    {
      Wish_list.insert({
        user_id: Meteor.userId(), product_id: this._id, product_name: this.name, createdAt: new Date()
        });
        console.log("no add")
    }
  },
  "submit #owned": function(event, template){
    event.preventDefault();
    var num = Own_list.find({$and: [{user_id: Meteor.userId()}, {product_id: this._id}]}).count();
    if (num == 0)
    {
      Own_list.insert({
        user_id: Meteor.userId(), product_id: this._id, product_name: this.name, createdAt: new Date()
        });
        console.log("no add")
    }
  },
  'click .submitR'(event) {
   console.log("Clicked submit");

 // Get value from form element
    const inputWords = document.getElementById('inputBox').value;
    console.log("Word submitted is " + inputWords);

/* 	//Gets the rating value
+	var e = document.getElementById("qRating");
+	var ratingNum = e.options[e.selectedIndex].value;
+	console.log("ratingNumber is " + ratingNum); */

   var today = new Date();
   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var rightNow = date+' '+time;
   console.log("right now is "+ rightNow);
   console.log("idnub "+ ReviewIDNumber);

   //addReview(ReviewIDNumber++,inputWords,ratingNum,userID,productID)
   //addReview(ReviewIDNumber++,inputWords,ratingNum);
   Review.insert({reviewer_id : Meteor.userId(), username: Meteor.user().username || Meteor.user().profile.name, product_id: this._id, reviewText: inputWords,
     ratingDate: rightNow});
   },


 'click .clear'(event) {
   review_i.inputBox.value = "";
 },
});

Accounts.onLogin(function(options, user) {
  var exists = Profile.find({owner: Meteor.userId()}).count();
  if (exists == 0)
  {
    Profile.insert({
          createdAt: new Date(), // current time
          owner: Meteor.userId(),
          username: Meteor.user().username || Meteor.user().profile.name,
          hair_color: "not",
          eye_color: "not",
          skin_type: "not",
        });
  }
})
Tracker.autorun(function() {
  var userId = Meteor.userId();
  if (!userId) {
    Router.go('/');  // go 'home' on logout
  }
});
