import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";

export interface Todo {
  id: number;
  task: string;
  priority: 1 | 2 | 3;
}

let mockData: Todo[] = [
  { id: 0, task: 'Implement loading - frontend only', priority: 1 },
  { id: 1, task: 'Implement search - frontend only', priority: 2 },
  { id: 2, task: 'Implement delete on click - frontend only', priority: 1 },
  { id: 3, task: 'Replace mock service by integrating backend', priority: 3 },
];

function removeFromMockData(id: number) {
  mockData = mockData.filter(todo => todo.id !== id);
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosSubject = new BehaviorSubject<Todo[]>(mockData);
  loadingSubject = new BehaviorSubject<boolean>(false);

  getAll(): Observable<Todo[]> {
    this.loadingSubject.next(true);
    return this.todosSubject.asObservable().pipe(
      delay(2000),
      map(data => {
        this.loadingSubject.next(false);
        return data;
      })
    );
  }

  remove(id: number): Observable<void> {
    this.loadingSubject.next(true);

    return new Observable<void>(observer => {
      if (Math.random() < .8) {
        removeFromMockData(id);
        this.todosSubject.next(mockData);
        observer.next();
      } else {
        observer.error('Failed');
      }
      observer.complete();
    })
  }
}
