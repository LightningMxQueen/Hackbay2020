import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BottomNavItem } from 'ngx-bottom-nav';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ObjectShopComponent } from '../object-shop/object-shop.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { AddFriendComponent } from '../add-friend/add-friend.component';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
  ) {}

  items: BottomNavItem[] = [
    {icon: 'home', label: 'Garten', routerLink: '/home'},
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
      case "home": {
        this._bottomSheet.open(ObjectShopComponent);
        break;
      }
      default: {
        break;
      }
    }
  }

}
