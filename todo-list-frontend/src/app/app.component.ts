import {Component} from '@angular/core';
import {TodoService} from "./todo.service";
import { Todo } from './models/todo.model';
import {Observable} from "rxjs";
import { catchError } from 'rxjs/operators';


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
      <app-todo-item *ngFor="let todo of todos$ | async | searchTodos : searchTerm" 
        [item]="todo"
        (click)="removeTodoById(todo.id)">
      </app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  todos$: Observable<Todo[]> = this.todoService.todos$;
  loading: boolean = false;
  searchTerm: string = '';

  constructor(private todoService: TodoService) {
    this.todoService.loadingSubject.asObservable().subscribe(loading => {
      this.loading = loading;
    });
    this.todoService.getAllTodos().subscribe();
  }

  removeTodoById(todoId: number) {
    this.todoService.remove(todoId).pipe().subscribe();
  }
}
