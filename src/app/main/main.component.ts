import {Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public notes = [];
  updateVisibility = false;
  constructor(private Note: NotesService) {
  }

  ngOnInit() {
    this.viewNote();
  }

  toggleUpdate() {
    this.updateVisibility = !this.updateVisibility;
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
    const result = confirm('Are you sure want to delete?');
    if (result === true) {
      this.Note.deleteNoteData(id).subscribe(data => {
        if (data.status = true) {
          alert(data.message);
          this.viewNote();
        } else {
          alert(data.message);
        }
      });
    } else {

    }
  }

  updateNote(event, id) {
    event.preventDefault();
    const target = event.target;
    const new_note_title = target.querySelector('#note_title_update').value;
    const new_note_description = target.querySelector('#note_description_update').value;
    let result = confirm('Are you sure want to update?');
    if (result = true) {
      console.log(new_note_title, new_note_description, id);
      this.Note.updateNote(new_note_title, new_note_description, id).subscribe(data => {
        if (data.status = true) {
          alert(data.message);
          this.toggleUpdate();
          this.viewNote();
        } else {
          alert(data.message);
        }
      });
    }
  }
}
