import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LoginComponent} from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { FriendsComponent } from './components/friends/friends.component';
import { MoneyShopComponent } from './components/money-shop/money-shop.component';
import { SignupComponent } from './components/signup/signup.component';
import { GardenComponent } from './components/garden/garden.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path: 'home', redirectTo: '/home/garden', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'home',component: MainNavComponent,
    children:[
      {path:'todo', component: TodoComponent},
      {path:'friends', component: FriendsComponent},
      {path:'shop', component: MoneyShopComponent},
      {path:'garden', component: GardenComponent},
  ]},
  {path:'**',redirectTo: 'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
