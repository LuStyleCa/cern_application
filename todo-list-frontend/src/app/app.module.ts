import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {FormsModule} from "@angular/forms";
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import { SearchTodosPipe } from './pipes/search-todos.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    ProgressBarComponent,
    SearchTodosPipe
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
