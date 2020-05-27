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

  todos:Todo[];
  donetodos:Todo[];

  constructor(
    private todosService:TodosService,
    private userService:UsersService,
  ) { }

  ngOnInit(): void {
    //var todo:Todo = {difficulty: 2, name: "Test Task 2", description: "Description of Test Task 2", email:sessionStorage.getItem("email")};
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

  checkTodo(_id:string):void{
    this.userService.markTodoAsDone(_id).subscribe(res => {});
  }



}
