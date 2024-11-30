import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent {
  isSignUpMode = true;
  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  onSwitch() {
    this.isSignUpMode = !this.isSignUpMode;
  }
}
