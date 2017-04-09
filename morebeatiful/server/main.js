import { Meteor } from 'meteor/meteor';
import { Profile } from '../imports/api/profile.js';
import { Products } from '../imports/api/products.js';
import { Scores } from '../imports/api/scores.js';
import { Own_list } from '../imports/api/own_list.js';
import { Wish_list } from '../imports/api/wish_list.js';
Meteor.startup(() => {
  // code to run on server at startup
/*  Products.insert({
         brand: "Charlotte Tilbury", type: "Blush", name: "Cheek to Chic Swish & Pop Blushe", price: "$$$", createdAt: new Date()
       });
  Products.insert({
         brand: "Cle De Peau", type: "highlighter", name: "Luminizing Face Enhance", price: "$$$$", createdAt: new Date()
      });
  Products.insert({
         brand: "Cle De Peau", type: "Bronzer", name: "Bronzing Powder Don",price: "$$", createdAt: new Date()
      });
  Products.insert({
             brand: "Chanel", type: "Blush", name: "Powder Blush", price: "$$$",createdAt: new Date()
      });
      */

});
Accounts.onCreateUser(function(options, user) {
  options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  user.profile = options.profile;
  return user;
});
