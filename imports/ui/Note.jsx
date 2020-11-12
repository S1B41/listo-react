import React, { Component } from 'react'
import NoteActions from './NoteActions';
import NoteInfo from './NoteInfo';
import NoteText from './NoteText';

export default class Note extends Component {
  render() {
    return (
      <div className="note col-sm-4 my-3">
        <NoteText />
        <NoteInfo />
        <NoteActions />
      </div>
    );
  };
}