import { Mongo } from 'meteor/mongo';
export const Profile = new Mongo.Collection('profile');

Meteor.methods({
  profile_update: function(_id, hair_color,eye_color, skin_type) {
    console.log(Profile.find({_id: _id}));
    Profile.update({owner : _id},{$set:{hair_color : hair_color,
       eye_color : eye_color, skin_type: skin_type}});
    console.log(_id);
  },
  });
