import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loadUser();
  }

  loadUser() {
    this.authService.getAllUsers().subscribe((data: any) => {
      this.userList = data.users;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateUser(id: any) {
    const popup = this.dialog.open(UpdateUserComponent, {
      width: '50%',
      data: { usercode: id },
    });
    popup.afterClosed().subscribe((data) => {
      this.loadUser();
    });
  }

  deleteUser(id: string) {
    //console.log(id);
    const deleteConfirm = this.dialog.open(DeleteUserComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: { usercode : id },
    });

    deleteConfirm.afterClosed().subscribe((result) => {
      if (result) {
        this.userList = this.userList.filter((user:any) => 
        {user._id !== id});
        this.loadUser();
      }
    });

  }
}
