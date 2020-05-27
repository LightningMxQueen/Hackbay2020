import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TodosService } from 'src/app/services/todos.service';
import { User,Friend, UserRegistration } from 'src/app/models/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit {

  friends:Friend[];
  
  constructor(
    private todosService:TodosService,
    private userService:UsersService,
  ) { }

  ngOnInit(): void {
    //this.userService.addNewFriend("thomas-test2").subscribe(res => {});
    this.userService.getFriendsOfUser().subscribe(
      res => {
        this.friends = res;
      }
    );
  }

  calculateUserProgress(level:number, points:number){
    return points/(level*10);
  }

}
