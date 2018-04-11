import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  user = new User();
  constructor(private http: HttpClient, private router: Router, public user_service: UserService) { }

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  user_name = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  first_name = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  last_name = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  address = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  city = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  state = new FormControl('', [Validators.required]);
  zip = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  password = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);


  createNewAccount() {
     this.user.username = this.user_name.value;
     this.user.user_password = this.password.value;
     this.user.address = this.address.value;
     this.user.zip = this.zip.value;
     this.user.first_name = this.first_name.value;
     this.user.last_name = this.last_name.value;
     this.user_service.createUser(this.user);


  }

  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];



  getEmailMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getLastNameMessage() {
    return this.last_name.hasError('required') ? 'You must enter a value' :
      this.last_name.hasError('max') ? 'Greater than 10 chars' :
        this.last_name.hasError('min') ? 'Not a least 2 chars' :
          '';
  }

  getFirstNameMessage() {
    return this.first_name.hasError('required') ? 'You must enter a value' :
      this.first_name.hasError('max') ? 'Greater than 10 chars' :
        this.first_name.hasError('min') ? 'Not a least 2 chars' :
          '';
  }

  getUserNameMessage() {
    return this.user_name.hasError('required') ? 'You must enter a value' :
      this.user_name.hasError('max') ? 'Greater than 10 chars' :
        this.user_name.hasError('min') ? 'Not a least 2 chars' :
          '';
  }

  getAddressMessage() {
    return this.address.hasError('required') ? 'You must enter a value' :
      this.address.hasError('max') ? 'Greater than 10 chars' :
        this.address.hasError('min') ? 'Not a least 2 chars' :
          '';
  }

  getPasswordOneMessage() {
    // return this.password_one.hasError('required') ? 'You must enter a value' :
    //   this.password_one.hasError('max') ? 'Greater than 10 chars' :
    //     this.password_one.hasError('min') ? 'Not a least 2 chars' :
    //       '';

  }

  getPasswordTwoMessage() {
    // return this.password_two.hasError('required') ? 'You must enter a value' :
    //   this.password_two.hasError('max') ? 'Greater than 10 chars' :
    //     this.password_two.hasError('min') ? 'Not a least 2 chars' :
    //       '';
  }

  getZipMessage(){
    return this.zip.hasError('required') ? 'You must enter a value' :
      this.zip.hasError('max') ? 'Greater than 5 chars' :
        this.zip.hasError('min') ? 'Not a least 5 chars' :
          '';
  }

  getCityMessage() {
    return this.city.hasError('required') ? 'You must enter a value' :
      this.city.hasError('max') ? 'Greater than 5 chars' :
        this.city.hasError('min') ? 'Not a least 5 chars' :
          '';
  }


  getStateMessage() {
    return this.city.hasError('required') ? 'You must ente a value' :
      '';
  }

}
