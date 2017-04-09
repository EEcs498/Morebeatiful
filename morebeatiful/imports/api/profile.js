import { Mongo } from 'meteor/mongo';
export const Profile = new Mongo.Collection('profile');

Meteor.methods({
  profile_update: function(_id, hair_color,eye_color, skin_type) {
    Profile.update({_id : _id},{$set:{hair_color : hair_color,
       eye_color : eye_color, skin_type: skin_type}});
  },
  });
