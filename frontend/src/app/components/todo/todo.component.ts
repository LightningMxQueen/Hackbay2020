import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  todos;

  constructor(
    private todosService:TodosService
  ) { }

  ngOnInit(): void {
    //var todo:Todo = {difficulty: 2, name: "Test Task 2", description: "Description of Test Task 2", email:sessionStorage.getItem("email")};
    //this.todosService.createNewTodoForSelf(todo).subscribe( res => {});
    this.todosService.getAllTodos().subscribe(
      res => {
        this.todos = res;
        console.log(res);
        console.log(this.todos.todos);
      }
    );
  }

}
