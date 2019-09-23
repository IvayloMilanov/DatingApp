import { Component, OnInit } from '@angular/core';
import { AlertifyService } from './_services/alertify.service';
import { User } from './_models/User';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.authService.changeMemberUrl(this.authService.getCurrentUserPhotoUrl());
    }
  }
}
