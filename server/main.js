import { Meteor } from "meteor/meteor";
import Notes from "/imports/collections/notes";

Meteor.startup(() => {
  if (Notes.find().count() === 0) {
    Notes.insert({ name: "test", createdAt: new Date() });
  }
});
