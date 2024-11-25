import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo.service';

@Pipe({
  name: 'searchTodos'
})
export class SearchTodosPipe implements PipeTransform {

  transform(todos: Todo[] | null, searchTerm: string): Todo[] {
    // check if there is any todos, otherwise return an empty array, the async pipe doesnt handle a null value
    if(!todos) {
      return [];
    }
    // if there is no searchterm, just return the whole todos list
    if(!searchTerm) {
      return todos;
    }

    const inputText = searchTerm.toLowerCase();
    // filter the todos list by checking if the searchterm exists in the todos list
    return todos.filter((todo) => todo.task.toLowerCase().includes(inputText));
  }

}
