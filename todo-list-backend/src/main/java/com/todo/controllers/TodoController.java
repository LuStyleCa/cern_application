package com.todo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.entities.Todo;
import com.todo.services.TodoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/todos")
public class TodoController {

    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
    
    @GetMapping("/all")
    public List<Todo> getAllTodos() {
       return todoService.getAllTodos();
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable("id") Long todoId) {
        todoService.deleteTodoById(todoId);
    }


}
