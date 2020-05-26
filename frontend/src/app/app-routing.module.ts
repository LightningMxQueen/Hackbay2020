import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LoginComponent} from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { FriendsComponent } from './components/friends/friends.component';
import { MoneyShopComponent } from './components/money-shop/money-shop.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'home',component: MainNavComponent,
    children:[
      {path:'todo', component: TodoComponent},
      {path:'friends', component: FriendsComponent},
      {path:'shop', component: MoneyShopComponent},
  ]},
  {path:'**',redirectTo: 'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
