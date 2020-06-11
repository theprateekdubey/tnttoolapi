package com.tntapi.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tntapi.domain.Todo;
import com.tntapi.service.MapValidationErrorService;
import com.tntapi.service.TodoService;

@RestController
@RequestMapping("/api/todo")
@CrossOrigin
public class TodoController {

	@Autowired
	private TodoService todoService;
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{team_id}/{user_id}")
	public ResponseEntity<?> addTodoTask(@Valid @RequestBody Todo todo, BindingResult result,
			@PathVariable String user_id, @PathVariable String team_id){
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if(errorMap!= null) {
			return errorMap;
		}
		Todo newTodo = todoService.createTodoTask(todo, user_id,team_id);
		return new ResponseEntity<Todo> (newTodo, HttpStatus.CREATED);
	}
	
	@GetMapping("/{team_id}/{user_id}/{task_id}")
	public ResponseEntity<?> getTodo(@PathVariable String team_id, @PathVariable String user_id, @PathVariable String task_id){
		Todo todo = todoService.findTodoByTaskSequence(team_id, user_id, task_id);
		return new ResponseEntity<Todo>(todo,HttpStatus.OK);
	}
	
	@GetMapping("/{team_id}")
	public Iterable<Todo> getTodoTasks(@PathVariable String team_id){
		return todoService.findAllTodoTask(team_id);
	}
	
	@PatchMapping("/{team_id}/{user_id}/{task_id}")
	public ResponseEntity<?> updateTodo(@Valid @RequestBody Todo todo,BindingResult result,@PathVariable String team_id,
			@PathVariable String user_id,@PathVariable String task_id){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(result);
		if(errorMap != null) {
			return errorMap;
		}
		Todo updateTodo = todoService.updateBytaskSequence(todo, team_id, user_id, task_id);
		return new ResponseEntity<Todo> (updateTodo,HttpStatus.OK);
	}
	
	@DeleteMapping("/{user_id}/{task_id}")
	public ResponseEntity<?> deleteTodo(@PathVariable String user_id,@PathVariable String task_id){
		todoService.deleteTodo(user_id, task_id);
		return new ResponseEntity<String >("todo task successfully removed",HttpStatus.OK);
	}
}