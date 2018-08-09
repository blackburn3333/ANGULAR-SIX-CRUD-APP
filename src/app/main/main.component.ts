import {Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public notes = [];

  constructor(private Note: NotesService) {
  }

  ngOnInit() {
    this.viewNote();
  }

  viewNote() {
    this.Note.getNoteData().subscribe(data => this.notes = data);
  }

  insertNote(event) {
    event.preventDefault();
    const target = event.target;
    const note_title = target.querySelector('#note_title').value;
    const note_description = target.querySelector('#note_description').value;

    this.Note.insertNote(note_title, note_description).subscribe(data => {
      console.log(data);
      if (data.status = true) {
        target.querySelector('#note_title').value = '';
        target.querySelector('#note_description').value = '';
        alert(data.message);
        this.viewNote();
      } else {
        alert(data.message);
      }
    });
  }

  deleteNote(id) {
    console.log(id);
    this.Note.deleteNoteData(id).subscribe(data => {
      if (data.status = true) {
        alert(data.message);
        this.viewNote();
      } else {
        alert(data.message);
      }
    });
  }
}
