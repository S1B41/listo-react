import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/collections/links';
import Notes from '/imports/collections/notes';

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });
  }
  if (Notes.find().count() === 0) {
    Notes.insert({ name: 'test', createdAt: new Date() });
  }
});
