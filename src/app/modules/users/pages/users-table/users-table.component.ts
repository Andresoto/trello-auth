import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';

import { DataSourceUser } from './data-source';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  user: User | null = null;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usersService.getUsers()
    .subscribe((users) => {
      console.log(users);
      this.dataSource.init(users);
    }, (error) => {
      console.log(error);
      console.log('Error al iniciar');
    });
    this.authService.user$
    .subscribe(user => {
      this.user = user;
    })
  }

}
