import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.sass']
})
export class AddFriendComponent implements OnInit {

  constructor(
    private userService:UsersService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  addFriend(email:string):void{
    this.userService.addNewFriend(email).subscribe(res => {});
    this.bottomSheet.dismiss();
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/friends']);
  }); 
  }

}
