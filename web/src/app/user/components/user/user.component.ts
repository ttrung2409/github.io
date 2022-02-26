import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import User from 'web/src/app/models/user';
import UserService from 'web/src/app/services/user.service';
import Permission from 'web/src/app/models/permission';
import v8n from 'v8n'
import { NotifierService } from 'angular-notifier';
import { MatSelectionList } from '@angular/material';
import * as _ from 'lodash'
import { FormGroupDirective } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {

  constructor(
    private userService: UserService,
    private notifier: NotifierService,
    private changeDetector: ChangeDetectorRef) { }

  @ViewChild(MatSelectionList) permissionList;
  @ViewChild('form') form: FormGroupDirective;

  user: User = new User();
  errors: Map<string, string> = new Map();
  allPermissions: Permission[] = [];
  showPermissions: boolean = true;

  ngOnInit() {
    this.userService.allPermissions().subscribe(permissions => this.allPermissions = permissions);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  new() {
    this.reset();
    this.user = new User();
  }

  load(id) {
    this.reset();
    this.userService.get(id).subscribe(user => {
      this.user = user;
    });
  }

  reset() {
    this.form.resetForm();
    this.errors.clear();
    this.showPermissions = false;
    setTimeout(() => this.showPermissions = true);
  }

  save() {
    if (!this.validate()) return Promise.reject();

    return new Promise((resolve, reject) => {
      let user = _.cloneDeep(this.user);
      user.permissions = [];
      for (let option of this.permissionList.selectedOptions.selected) {
        user.permissions.push({ permissionId: option.value });
      }

      this.userService.save(user).subscribe(user => {
        this.notifier.notify('success', 'Lưu thành công');
        this.user = user;
        this.user.confirmPassword = '';
        resolve(_.cloneDeep(user));
      }, err => this.notifier.notify('error', err.error));
    });
  }

  validate() {
    this.errors.clear();
    if (v8n().empty().test(this.user.name || '')) {
      this.errors.set('name', 'Vui lòng nhập họ tên');
    }

    if (v8n().empty().test(this.user.username || '')) {
      this.errors.set('username', 'Vui lòng nhập tên đăng nhập');
    }

    if (!this.user.id && v8n().empty().test(this.user.password || '')) {
      this.errors.set('password', 'Vui lòng nhập mật khẩu');
    }

    if (!this.user.id && v8n().empty().test(this.user.confirmPassword || '')) {
      this.errors.set('confirmPassword', 'Vui lòng nhập lại mật khẩu');
    }

    if (!!this.user.password && this.user.password != this.user.confirmPassword) {
      this.errors.set('confirmPassword', 'Mật khẩu không giống nhau');
    }

    return this.errors.size == 0;
  }

  hasPermission(id) {
    return this.user.permissions.some(x => x.permissionId == id);
  }
}
