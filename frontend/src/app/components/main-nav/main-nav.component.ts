import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BottomNavItem } from 'ngx-bottom-nav';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ObjectShopComponent } from '../object-shop/object-shop.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { AddFriendComponent } from '../add-friend/add-friend.component';
import { GardenComponent } from '../garden/garden.component';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  PageName: String = "Garten"

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      switch(this.router.url.split("/").pop()){
        case "shop": {
          this.PageName = "Shop";
          document.getElementById("fab").style.display = "none";
          break;
        }
        case "friends": {
          this.PageName = "Freunde";
          document.getElementById("fab").style.display = "block";
          break;
        }
        case "todo": {
          this.PageName = "To Do's";
          document.getElementById("fab").style.display = "block";
          break;
        }
        case "garden": {
          this.PageName = "Garten";
          document.getElementById("fab").style.display = "block";
          break;
        }
        default: {
          document.getElementById("fab").style.display = "block";
        }
      }
  });
  }

  items: BottomNavItem[] = [
    {icon: 'home', label: 'Garten', routerLink: '/home/garden'},
    {icon: 'add', label: 'ToDos', routerLink: '/home/todo'},
    {icon: 'group', label: 'Freunde', routerLink: '/home/friends'},
    {icon: 'storefront', label: 'Shop', routerLink: '/home/shop'},
  ];

  show_objects():void{
    switch(this.router.url.split("/").pop()){
      case "todo": {
        this._bottomSheet.open(AddTodoComponent);
        break;
      }
      case "friends": {
        this._bottomSheet.open(AddFriendComponent);
        break;
      }
      case "garden": {
        this._bottomSheet.open(ObjectShopComponent);
        break;
      }
      default: {
        break;
      }
    }
  }

  ngOnInit():void{
    this.redirectIfNotAuth();
  }

  redirectIfNotAuth():void{
    if(!sessionStorage.getItem("email")){
      this.router.navigate(['/login'])
    }
  }

}
