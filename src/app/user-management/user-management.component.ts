import { Component } from '@angular/core';
import { ApiService } from '../api-service';
import { NgFor } from '@angular/common';
import { DynamicTableComponent } from '../shared/dynamic-table/dynamic-table.component';
import { IDynamicTableAction } from '../shared/dynamic-table-action.model';

interface IUser {
  id: number,
  email: string,
  role: string,
  createdOn: string,
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [NgFor, DynamicTableComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  users: IUser[] = []
  options: IDynamicTableAction = {
    actionName: 'Remove Access',
  };

  constructor(private apiService: ApiService) {
    this.getUsers();
  }

  getUsers() {
    this.apiService.get<IUser[]>(`./assets/json/users.json`).subscribe((res: IUser[]) => {
      this.users = res;
    })
  }

  delete(user: IUser) {
    console.log(user); // do something
  }
}
