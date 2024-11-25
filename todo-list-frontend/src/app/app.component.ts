import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
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
        (click)="removeTask(todo.id)">
      </app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  todos$: Observable<Todo[]> = this.todoService.getAll();
  loading: boolean = false;
  searchTerm: string = '';

  constructor(private todoService: TodoService) {
    this.todoService.loadingSubject.asObservable().subscribe(loading => {
      this.loading = loading;
    });
  }

  removeTask(taskId: number) {
    this.todoService.remove(taskId).pipe(
      catchError(() => {
        console.log("Removing todo failed by a stroke of bad luck, please try again.")
        return [];
      }),
    ).subscribe();
  }
}
