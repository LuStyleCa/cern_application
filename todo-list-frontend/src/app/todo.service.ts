import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { Todo } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  loadingSubject = new BehaviorSubject<boolean>(false);

  private baseUrl = 'http://localhost:8099/api/todos';

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    this.loadingSubject.next(true);
    return this.http.get<Todo[]>(`${this.baseUrl}/all`).pipe(
      tap((todos) => this.todosSubject.next(todos)),
      finalize(() => this.loadingSubject.next(false)),
      catchError((error) => {
        console.error('Error fetching todos:', error);
        throw error;
      })
    )
  }

  remove(id: number): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const currentTodos = this.todosSubject.getValue();
        this.todosSubject.next(currentTodos.filter(todo => todo.id !== id));
      }),
      finalize(() => this.loadingSubject.next(false)),
      catchError((error) => {
        console.error('Error deleting todo:', error);
        throw error;
      })
    );
  }
}
