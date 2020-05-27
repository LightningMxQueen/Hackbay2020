import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    private userService:UsersService
  ) { }

  ngOnInit(): void {
    this.showLoginGif();
    var email:string = sessionStorage.getItem("email");
    if(email){
      this.userService.checkIfUserExists(email).subscribe(
        res => {
          if(res) {
            this.router.navigate(['/home'])
          }
        }
      )
    }
  }

  logout():void{
    sessionStorage.clear();
  }

  login(email:string):void{
    if (email ==""){return}
    this.userService.checkIfUserExists(email)
    .subscribe(
      res =>
      {if(res){
          sessionStorage.setItem("email",email)
          this.router.navigate(['/home'])
        }else{
          this.router.navigate(['/signup'])
        }
      }
    )
  }

  showLoginGif(){
    document.getElementById("contentLogin").style.display = "none";
    setTimeout( () => {
      document.getElementById("gifLogin").style.display = "none";
      document.getElementById("contentLogin").style.display = "block";
    }, 1000 );
  }

}
