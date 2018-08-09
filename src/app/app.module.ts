import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import {NotesService} from './notes.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent
      }
    ])
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
