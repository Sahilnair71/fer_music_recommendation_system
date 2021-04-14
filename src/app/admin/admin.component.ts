import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(7),
    ]),
    // confirmpassword: new FormControl("", [
    //   Validators.required,
    //   Validators.minLength(7),
    // ]),
    username: new FormControl("", Validators.required),
  });

  loginForm = new FormGroup({
    email_1: new FormControl("", Validators.required),
    password_1: new FormControl("", [
      Validators.required,
      Validators.minLength(7),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    const { value, valid } = this.loginForm;

    if (!valid) {
      return;
    } else {
      this.login();
    }
  }
  login() {
    console.log(this.loginForm.value);
    this.authService.SignIn(this.loginForm.value);
  }

  createUser() {
    console.log(this.registerForm.value, "VALUE:");
    this.authService.SignUp(this.registerForm.value);
  }
}
