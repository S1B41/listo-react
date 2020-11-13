import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const Notes = new Mongo.Collection("notes");

if (Meteor.isServer) {
  Meteor.publish("notes", () => {
    return Notes.find();
  });
}

// if (Meteor.isClient) {
//   Meteor.subscribe('notes');
// }
export default Notes;
