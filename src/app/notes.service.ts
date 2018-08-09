import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

interface InsertData {
  message: String;
  status: Boolean;
}

interface ViewNote {
  _id: String;
  note_title: String;
  note_description: String;
}

interface DeleteNote {
  message: String;
  status: Boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {
  }

  insertNote(note_title, note_description) {
    console.log(note_title, note_description);
    return this.http.post<InsertData>('/note', {
      note_title,
      note_description
    });
  }

  getNoteData(): Observable<ViewNote[]> {
    return this.http.get<ViewNote[]>('/note');
  }

  deleteNoteData(note_id) {
    return this.http.delete<DeleteNote>('/note/' + note_id);
  }
}
