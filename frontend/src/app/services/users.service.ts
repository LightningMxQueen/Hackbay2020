import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User,Friend, UserRegistration } from 'src/app/models/User';
import { Todo } from 'src/app/models/Todo';
import { InventoryObject } from 'src/app/models/Inventory';

import { AppSettings } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  //check if there is a user for given email 
  checkIfUserExists(email:string):Observable<boolean>{
    return this.http
      .get<boolean>(AppSettings.API_ENDPOINT + "/user/" + email +"/exists")
      .pipe(map(res => res))
  }

  // get User overview
  getUserOverview():Observable<User>{
    return this.http
      .get<User>(AppSettings.API_ENDPOINT + "/user/" + sessionStorage.getItem("email") + "/info")
      .pipe(map(res => res['info']))
  }

  //get the friends of the User
  getFriendsOfUser():Observable<Friend[]>{
    return this.http
      .get<Friend[]>(AppSettings.API_ENDPOINT + "/user/" + sessionStorage.getItem("email") + "/friends")
      .pipe(map(res => res['result']))
  }

  //get the todos of a User 
  getTodosOfUser():Observable<Todo[]>{
    return this.http
      .get<Todo[]>(AppSettings.API_ENDPOINT +"/user/"+ sessionStorage.getItem("email") + "/todos")
      .pipe(map(res => res['todos']))
  }

  //get the inventory of a User
  getInventoryOfUser():Observable<InventoryObject[]>{
    return this.http
      .get<InventoryObject[]>(AppSettings.API_ENDPOINT +"/user/"+sessionStorage.getItem("email") + "/inventory")
      .pipe(map( res => res['inventory']))
  }

  //create a new User
  createNewUser(user:UserRegistration):Observable<User>{
    return this.http
      .post<any>(AppSettings.API_ENDPOINT+"/user/register",user)
  }

  //user1 adds user2 as a friend
  addNewFriend(friendName:string):Observable<String>{
    let friendship = {
      email:sessionStorage.getItem("email"),
      friend:friendName
    }

    return this.http
      .post<any>(AppSettings.API_ENDPOINT+"/user/friends",friendship)
  } 

  //add a new todo for User
  addNewTodo(todo:Todo):Observable<Todo>{
    let todoooo = {
      email: sessionStorage.getItem("email"),
      todo_id:todo._id
    }
    return this.http
      .post<any>(AppSettings.API_ENDPOINT+"/user/todos",todoooo)
  }

  //get done todos for user
  getDoneTodosOfUser():Observable<Todo[]>{
    return this.http
      .get<Todo[]>(AppSettings.API_ENDPOINT +"/user/"+ sessionStorage.getItem("email") + "/donetodos")
      .pipe(map(res => res['todos']))
  }

  //move todo of user to done
  markTodoAsDone(todoId:string):Observable<string>{
    let item = {email: sessionStorage.getItem("email"), todo_id: todoId};
    return this.http.post<any>(
      AppSettings.API_ENDPOINT + "/todos/check", item
    );
  }
}
