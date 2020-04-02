import React, { Component } from 'react'
import NoteActions from './NoteActions';
import NoteInfo from './NoteInfo';
import NoteText from './NoteText';

export default class Note extends Component {
    render(){
        return(
            <div>
                <NoteText />
                <NoteInfo />
                <NoteActions />
            </div>
        );
    };
}