package com.todo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.todo.entities.Todo;
import com.todo.repositories.TodoRepository;

@Service
public class TodoService {

    private TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
    
    public void deleteTodoById(Long todoId) {
        todoRepository.deleteById(todoId);
    }
}
