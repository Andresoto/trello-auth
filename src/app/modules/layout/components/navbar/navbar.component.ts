import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/user.model';

import { AuthService } from "@services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user: User | null = null;
  // user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.authService.getProfile()
    // .subscribe(resp => {
    //   this.user = resp;
    // })
    this.authService.user$
    .subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    console.log("Se cerro la sesión");
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
