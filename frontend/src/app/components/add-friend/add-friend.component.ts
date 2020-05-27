import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.sass']
})
export class AddFriendComponent implements OnInit {

  constructor(
    private userService:UsersService,
  ) { }

  ngOnInit(): void {
  }

}
