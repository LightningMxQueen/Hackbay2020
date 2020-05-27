import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Todo } from 'src/app/models/Todo';
import { TodosService } from 'src/app/services/todos.service';
import { UsersService } from 'src/app/services/users.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.sass']
})
export class AddTodoComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver
    ,private todoService:TodosService
    ,private userService:UsersService
    ,private bottomSheet: MatBottomSheet
    ,private router:Router) { }

  availableTodos:Observable<Todo[]>;

  ngOnInit(): void {
    this.availableTodos = this.todoService.getAllTodos()//.subscribe(res => this.availableTodos=res)
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  addTodo(todo:Todo){
    this.userService.addNewTodo(todo).subscribe(res => {
      this.bottomSheet.dismiss();
      this.router.navigateByUrl('/home',{skipLocationChange:true}).then(() =>{
        this.router.navigate(['/home/todo'])
      })
    })
  }

}
