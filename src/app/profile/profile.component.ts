import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { passwordMatchValidator } from './passValidator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  showAlert: boolean = false;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  oldPassword: any = 'admin1234';
  showUnMatched: boolean = false;
  minPw = 8;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (localStorage.getItem('oldPass')) {
      this.oldPassword = localStorage.getItem('oldPass');
      console.log(this.oldPassword);
    } else {
      localStorage.setItem('oldPass', this.oldPassword);
      console.log('Pass Saved for the first time');
    }

    this.formGroup = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(this.minPw)]],
        password2: ['', [Validators.required]],
        oldPass: ['', [Validators.required, Validators.minLength(this.minPw)]],
      },
      { validator: passwordMatchValidator }
    );
  }

  resetPassword() {

    this.oldPassword = this.oldPassword.toString().trim()

    if (this.oldPass.value.trim() == this.oldPassword) {
      this.oldPassword = this.password2.value;
      localStorage.setItem('oldPass', this.oldPassword);
      alert('Password Updated Succsessfully');
    } else {
      alert('Old Password Dosent Match');
      this.oldPass.setValue(' ');
      this.password.setValue(' ');
      this.password2.setValue(' ');
    }
    console.log(this.oldPass.value);
    console.log(this.password.value);
    console.log(this.password2.value);
  }


  get oldPass() {
    return this.formGroup.get('oldPass');
  }
  get password() {
    return this.formGroup.get('password');
  }
  get password2() {
    return this.formGroup.get('password2');
  }

  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch'))
      this.password2.setErrors([{ passwordMismatch: true }]);
    else this.password2.setErrors(null);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
