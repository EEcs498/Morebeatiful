import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './body.html';
import '../api/profile.js';
import { Profile } from '../api/profile.js';
import { Products } from '../api/products.js';
import { Scores } from '../api/scores.js';
import { Wish_list} from '../api/wish_list.js';
import { Own_list} from '../api/own_list.js';
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
      console.log(this.params._id);
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
});
Template.home.helpers({
  prod_ducts(){
    return Products.find({ });
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
    console.log(Meteor.user().username || Meteor.user().profile.name);
    return Meteor.user().username || Meteor.user().profile.name;
  },
  wish_items: function(){
    console.log("wish_now")
    return Wish_list.find({
      user_id: Meteor.userId()
      });
  },
  own_items: function(){
    console.log("own_now")
    return Own_list.find({
      user_id: Meteor.userId()
      });
  },
  profiles: function(){
    return Profile.find({
      user_id: Meteor.userId()
      });
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
  }
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

});
Accounts.onLogin(function(options, user) {
  var exists = Profile.find({owner: Meteor.userId()}).count();
  if (exists == 0)
  {
    Profile.insert({
          createdAt: new Date(), // current time
          owner: Meteor.userId(),
          username: Meteor.user().username || Meteor.user().profile.name,
          /*hair_color: "not",
          eye_color: "not",
          skin_type: "not",*/
        });
  }
})
