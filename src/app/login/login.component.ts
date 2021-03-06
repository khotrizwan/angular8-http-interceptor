import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CityService} from "../city/city.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private cityService: CityService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.cityService.login(loginPayload).subscribe(data => {
      debugger;
      
      if(data.token != undefined) {
        window.localStorage.setItem('token', data.token);
        this.router.navigate(['home']);
      }else {
        this.invalidLogin = true;
        alert("Invalid credentials");
      }
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
  }

}
