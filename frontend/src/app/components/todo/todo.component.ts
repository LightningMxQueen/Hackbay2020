import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { Todo } from '../../models/Todo';
import { User } from '../../models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  todos:Todo[] = [];
  donetodos:Todo[] = [];

  constructor(
    private todosService:TodosService,
    private userService:UsersService,
  ) { }

  ngOnInit(): void {
    //var todo:Todo = {difficulty: 2, name: "Test 50", description: "Description of Test Task 2", email:sessionStorage.getItem("email")};
    //this.todosService.createNewTodoForSelf(todo).subscribe( res => {});
    this.userService.getTodosOfUser().subscribe(
      res => {
        this.todos = res;
      }
    );

    this.userService.getDoneTodosOfUser().subscribe(
      res => {
        this.donetodos = res;
      }
    );
  }

  checkTodo(todo:Todo):void{
    this.userService.markTodoAsDone(todo._id).subscribe(res => {});
    this.todos = this.todos.filter(function( obj ) {
      return obj._id!== todo._id;
  });
    this.donetodos = this.donetodos.concat(todo);
  }

  deleteTodo(todo:Todo):void{
    console.log("TEST");
    this.donetodos = this.donetodos.filter(function( obj ) {
      return obj._id!== todo._id;
  });
  }

}
