import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './body.html';
import { Profile } from '../api/profile.js';
import { Products } from '../api/products.js';
import { Session } from 'meteor/session'
import './accounts-config.js';
/*Profile.insert({
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });*/


//Router.route('/product');
Router.route('/', {
  template: 'home'
  });
/*Router.route('/product/:_id',{
  template: 'product'
});*/
Router.route('/product/:_id', function(){
  this.subscribe('product');
  this.render('product', {
    data: function(){
      console.log(this.params._id);
      return Products.findOne({_id: this.params._id});
    }
  });
});
/*Router.route('/product/:input',function(){
    this.render('product');
});*/
Template.product.onCreated(function productOnCreated() {
  Session.set("product_name", "Cheek to Chic Swish & Pop Blushe");
});
Template.product.helpers({
  products_c: function(){
    console.log(this.brand);
  },
});
Template.home.helpers({
  prod_ducts(){
    return Products.find({ });
  },
});
