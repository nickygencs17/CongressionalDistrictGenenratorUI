import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {LogindialogComponent} from "../logindialog/logindialog.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  name: string;
  password: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(LogindialogComponent, {
      height: '400px',
      width: '600px',
      data: { name: this.name, password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.name = result;
      //TODO: LOG IN

    });
  }

}
