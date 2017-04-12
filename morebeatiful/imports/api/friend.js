import { Mongo } from 'meteor/mongo';
export const Friend = new Mongo.Collection('friend');
export const Friend_re = new Mongo.Collection('friend_re');
Meteor.methods({
  remove_f: function(user_f, user_t) {
    Friend_re.remove({user_f:user_f, user_t: user_t});
    console.log("_id");
  },
  });
