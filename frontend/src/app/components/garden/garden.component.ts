import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ObjectShopComponent } from '../object-shop/object-shop.component';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.sass']
})
export class GardenComponent implements OnInit {

  user:User;

  constructor(
    private userService:UsersService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.userService.getUserOverview().subscribe(res => this.user = res)
  }

  calculateUserProgress(level:number, points:number){
    return (points/(level*10))*100;
  }

  openShopForField():void{
    console.log("TEST");
    this.dialog.open(ObjectShopComponent);
  }

}
