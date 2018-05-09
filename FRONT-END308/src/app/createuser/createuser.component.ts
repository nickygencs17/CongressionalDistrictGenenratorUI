import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../entities/user';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  user = new User();
  public state_id;
  string;
  email = new FormControl('', [Validators.required, Validators.email]);
  user_name = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  first_name = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  last_name = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  address = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  state = new FormControl('', [Validators.required]);
  zip = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  password_two = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);
  states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

  constructor(private http: HttpClient, private router: Router, public user_service: UserService) {
  }

  ngOnInit() {
  }

  createNewAccount(_password,_password_two) {

    if (_password !== _password_two) {
      alert("Passwords do not match");
    }
    else {
      this.user.username = this.user_name.value;
      this.user.user_password = this.password.value;
      this.user.city = this.city.value;
      this.user.address = this.address.value;
      this.user.zip = this.zip.value;
      this.user.first_name = this.first_name.value;
      this.user.last_name = this.last_name.value;
      this.user.state_id = this.state_id;
      this.user.role = "ROLE_USER";
      this.user_service.createUser(this.user);
    }
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

  getPasswordOneMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('max') ? 'Greater than 10 chars' :
        this.password.hasError('min') ? 'Not a least 2 chars' :
          '';
  }

  getPasswordTwoMessage() {
    return this.password_two.hasError('required') ? 'You must enter a value' :
      this.password_two.hasError('max') ? 'Greater than 10 chars' :
        this.password_two.hasError('min') ? 'Not a least 2 chars' :
          '';
  }

  getAddressMessage() {
    return this.address.hasError('required') ? 'You must enter a value' :
      this.address.hasError('max') ? 'Greater than 10 chars' :
        this.address.hasError('min') ? 'Not a least 2 chars' :
          '';
  }

  getZipMessage() {
    return this.zip.hasError('required') ? 'You must enter a value' :
      this.zip.hasError('max') ? 'Greater than 6 chars' :
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

  changeState(new_state_id) {
    this.state_id = new_state_id;
  }
}
