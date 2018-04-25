import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent {

  user_name = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)])
  password = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)])

  constructor(public dialogRef: MatDialogRef<LogindialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public router: Router) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login() {
    this.dialogRef.close();
    this.router.navigate(['']);
  }

  createAccount() {
    console.log("CREATE ACCOUNT");
    this.dialogRef.close();
    this.router.navigate(['register']);
  }

  getPasswordMessage() {
    return this.user_name.hasError('required') ? 'You must enter a value' :
      this.user_name.hasError('max') ? 'Greater than 10 chars' :
        this.user_name.hasError('min') ? 'Not a least 2 chars' :
          '';
  }

  getUserNameMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('max') ? 'Greater than 10 chars' :
        this.password.hasError('min') ? 'Not a least 2 chars' :
          '';
  }
}
