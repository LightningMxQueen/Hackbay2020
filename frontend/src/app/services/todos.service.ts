import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from 'src/app/models/Todo';

import { AppSettings } from 'src/app/app.config';
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http:HttpClient) { }

  //get all todos
  getAllTodos():Observable<Todo[]>{
    return this.http
      .get<Todo[]>(AppSettings.API_ENDPOINT + "/todos/all")
      .pipe(map(res => res['todos']))
  }

  //create a new Todo and add it to yourself
  createNewTodoForSelf(todo:Todo):Observable<Todo>{
    return this.http
      .post<any>(AppSettings.API_ENDPOINT+"/todos/own",todo)
  }
}
