import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BottomNavModule } from 'ngx-bottom-nav';
import { LoginComponent } from './components/login/login.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MatButtonModule, MatButton} from '@angular/material/button';
import { TodoComponent } from './components/todo/todo.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ObjectShopComponent } from './components/object-shop/object-shop.component';
import { MoneyShopComponent } from './components/money-shop/money-shop.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { MatInputModule } from '@angular/material/input';
import { GardenComponent } from './components/garden/garden.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    TodoComponent,
    FriendsComponent,
    ObjectShopComponent,
    MoneyShopComponent,
    SignupComponent,
    AddTodoComponent,
    AddFriendComponent,
    GardenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BottomNavModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
