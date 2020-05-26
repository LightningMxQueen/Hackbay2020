import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BottomNavItem } from 'ngx-bottom-nav';
import { LoginComponent} from '../login/login.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';


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
  ) {}

  items: BottomNavItem[] = [
    {icon: 'home', label: 'Garten', routerLink: '/home'},
    {icon: 'add', label: 'ToDos', routerLink: '/home/todo'},
    {icon: 'group', label: 'Freunde', routerLink: '/home/friends'},
    {icon: 'storefront', label: 'Shop', routerLink: '/home/shop'},
  ];

  show_objects():void{
    this._bottomSheet.open(LoginComponent);
  }

}
