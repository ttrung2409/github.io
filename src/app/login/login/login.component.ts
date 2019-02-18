import { Component, OnInit } from '@angular/core';
import v8n from 'v8n'
import AuthService from 'src/app/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import ProductService from 'src/app/services/product.service';
import CustomerService from 'src/app/services/customer.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,    
    private notifier: NotifierService,    
    private router: Router,
    private productService: ProductService,
    private customerService: CustomerService) { }

  errors: Map<string, string> = new Map();
  username: string;
  password: string;

  ngOnInit() {
  }

  login() {
    if (!this.validate()) return;
    this.authService.authenticate(this.username, this.password).subscribe(authenticated => {
      if (!authenticated) {
        this.notifier.notify('error', 'Tên đăng nhập hoặc mật khẩu không hợp lệ');
        return;
      }      
    });
  }

  validate() {
    this.errors.clear();
    if (v8n().empty().test(this.username || '')) {
      this.errors.set('username', 'Vui lòng nhập tên đăng nhập');
    }

    if (v8n().empty().test(this.password || '')) {
      this.errors.set('password', 'Vui lòng nhập mật khẩu');
    }

    return this.errors.size == 0;
  }
}
