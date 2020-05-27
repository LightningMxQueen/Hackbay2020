import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { UserRegistration } from '../../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  constructor(
    private router:Router,
    private userService:UsersService
  ) { }

  ngOnInit(): void {
  }

  register_user(email:string):void{
    if (email===""){return}
    var user:UserRegistration = {name:"name", email:email, city:"nuremberg"};
    this.userService.createNewUser(user).subscribe(
      res => {
        if(res){
          sessionStorage.setItem("email", email)
          this.router.navigate(['/home'])
        }
        else {
          this.router.navigate(['/home'])
        }
      }
    )
  }

}
