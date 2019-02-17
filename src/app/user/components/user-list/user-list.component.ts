import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import UserService from 'src/app/services/user.service';
import User from 'src/app/models/user';
import { UserComponent } from '../user/user.component';
import { MatList } from '@angular/material';
import * as $ from 'jquery'
import { Subscription, fromEvent } from 'rxjs';
import { Key } from 'ts-keycode-enum';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private el: ElementRef) { }

  @ViewChild(UserComponent) userComponent;

  users: User[] = [];

  ngOnInit() {
    this.userService.all().subscribe(users => this.users = users);

    this._subscription.add(fromEvent(window, 'resize').subscribe(e => {
      this.resize();
    }));

    this._subscription.add(fromEvent(document, 'keydown').subscribe((e: KeyboardEvent) => {
      switch (e.keyCode) {
        case Key.F2:
          this.new();
          break;
        case Key.F9:
          this.save();
          break;
      }
    }));
  }

  ngAfterViewInit() {
    this.resize();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  resize() {
    $(this.el.nativeElement).find('.list').height($(window).height() - $('.toolbar').outerHeight(true) - 12);
  }

  select(event, user: User) {
    $(this.el.nativeElement).find('.list .mat-list-item-content').css('background-color', 'transparent');
    $(event.target).addClass('background-color', '#b5d1ff');
    this.userComponent.load(user.id);
  }

  new() {
    this.userComponent.new();
  }

  save() {
    this.userComponent.save().then(user => {
      let index = this.users.findIndex(x => x.id == user.id);
      if (index == -1) this.users.push(user);
      else this.users[index] = user;
    });
  }
}
