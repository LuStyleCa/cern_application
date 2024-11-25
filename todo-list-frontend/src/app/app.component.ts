import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {Observable} from "rxjs";
import { catchError, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template: `
    <div class="title">
      <h1>
        A list of TODOs
      </h1>
    </div>
    <div class="list">
      <label for="search">Search...</label>
      <input id="search" type="text" [(ngModel)]="searchTerm" >
      <app-progress-bar *ngIf="loading"></app-progress-bar>
      <app-todo-item *ngFor="let todo of todos$ | async | searchTodos : searchTerm" [item]="todo"></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  todos$: Observable<Todo[]>;
  loading: boolean = true;

  searchTerm: string = '';

  constructor(todoService: TodoService) {
    this.todos$ = todoService.getAll().pipe(
      catchError(() => {
        this.loading = false;
        return [];
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
