import moment from 'moment';
import { getSavedNotes, savedNotes, removeNotes, generateLastEdited } from './notes-functions';

const titleElement = document.getElementById('noteTitle');
const bodyElement = document.getElementById('noteBody');
const removeNote = document.getElementById('removeNotes');
const dateElement = document.getElementById('lastEdited');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(function(note) {
    return note.id === noteId;
});

if (note === undefined) {
    location.assign('/index.html');
};

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener("input", function(event) {
    note.title = event.target.value;
    note.updatedAt = moment().valueof();
    dateElement.textContent = generateLastEdited(note.updatedAt);
    savedNotes(notes);
});

bodyElement.addEventListener("input", function(event) {
    note.body = event.target.value;
    note.updatedAt = moment().valueof();
    dateElement.textContent = generateLastEdited(note.updatedAt);
    savedNotes(notes);
});

removeNote.addEventListener("click", function(event) {
    removeNotes(note.id);
    savedNotes(notes);
    location.assign("/index.html");
});

window.addEventListener('storage', function(event) {
    if (event.key === 'notes') {
        notes = JSON.parse(event.newValue);
        note = notes.find(function(note) {
            return note.id === noteId;
        });
        if (note === undefined) {
            this.location.assign('/index.html');
        }
        titleElement.value = note.title;
        bodyElement.value = note.body;
        dateElement.textContent = generateLastEdited(note.updatedAt);
    }
});