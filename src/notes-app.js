import uuid from 'uuid';
import moment from 'moment';
import { renderNotes, savedNotes, getSavedNotes } from './notes-functions';

let notes = getSavedNotes(); //if u see in notes-functions.js

const filters = {
    searchText: ''
};

renderNotes(notes, filters);

document.getElementById('createNotes').addEventListener('click', function(event) {
    const id = uuid();
    const timestamp = moment().valueOf();
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    });
    savedNotes(notes); //* *
    location.assign(`edit.html#${id}`);
})

//create an event listener "input" that consoles on the browser what you type on the input element
document.querySelector('#search-text').addEventListener('input', function(event) {
    filters.searchText = event.target.value;
    renderNotes(notes, filters);
})


document.getElementById('filter-by').addEventListener('change', function(event) {
    console.log(event.target.value);
});