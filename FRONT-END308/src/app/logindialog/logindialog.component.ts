import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LogindialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



  login(){
    console.log("login");
    //TODO: rest login then send to current component
  }

  openCreateDialog() {
    console.log("CREATEUSER");
    //TODO: create user modal
    //https://material.angular.io/components/stepper/overview
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
