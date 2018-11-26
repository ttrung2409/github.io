(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["customer-customer-module"],{

/***/ "./src/app/customer/components/customer-list/customer-list.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/customer/components/customer-list/customer-list.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"customer-list\">\r\n  <toolbar>\r\n    <toolbar-title>Quản lý khách hàng</toolbar-title>\r\n    <actions>\r\n      <button mat-button (click)=\"showSearchView()\">\r\n        <mat-icon>filter_list</mat-icon>\r\n        (F2)\r\n      </button>\r\n    </actions>\r\n  </toolbar>\r\n  <grid [columns]=\"columns\" [dataSource]=\"customers\" (rowClick)=\"onSelect($event)\" (select)=\"onSelect($event)\"></grid>\r\n  <flyout #flyout [containerSelector]=\"'.customer-list'\" (onHide)=\"flyoutView = ''\">\r\n    <content>\r\n      <customer-search #searchView\r\n                       *ngIf=\"flyoutView == 'search'\"\r\n                       (search)=\"onSearch($event)\"\r\n                       (cancel)=\"flyout.hide()\">\r\n      </customer-search>\r\n      <customer #customerView\r\n                *ngIf=\"flyoutView == 'customer'\"\r\n                [id]=\"selectedCustomer.id\"\r\n                (cancel)=\"flyout.hide()\"\r\n                (commit)=\"flyout.hide()\"></customer>\r\n    </content>\r\n  </flyout>\r\n  <button mat-fab>\r\n    <mat-icon>add</mat-icon>\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/customer/components/customer-list/customer-list.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/customer/components/customer-list/customer-list.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/customer/components/customer-list/customer-list.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/customer/components/customer-list/customer-list.component.ts ***!
  \******************************************************************************/
/*! exports provided: CustomerListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerListComponent", function() { return CustomerListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/customer */ "./src/app/models/customer.ts");
/* harmony import */ var _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../widgets/grid/grid.component */ "./src/app/widgets/grid/grid.component.ts");
/* harmony import */ var _services_customer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/customer.service */ "./src/app/services/customer.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _widgets_flyout_flyout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../widgets/flyout/flyout.component */ "./src/app/widgets/flyout/flyout.component.ts");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _customer_customer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../customer/customer.component */ "./src/app/customer/components/customer/customer.component.ts");
/* harmony import */ var _customer_search_customer_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../customer-search/customer-search.component */ "./src/app/customer/components/customer-search/customer-search.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CustomerListComponent = /** @class */ (function () {
    function CustomerListComponent(customerService) {
        this.customerService = customerService;
        this._subscription = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"]();
        this.selectedCustomer = new _models_customer__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.columns = [
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Tên KH',
                field: 'name'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Loại KH',
                field: 'type.name',
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Số ĐT',
                field: 'phoneNumber'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Email',
                field: 'email'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Địa chỉ',
                field: 'address'
            })
        ];
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscription.add(this.customerService.getCustomers().subscribe(function (customers) {
            _this.customers = customers;
        }));
        this._subscription.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(document, 'keyup').subscribe(function (event) {
            switch (event.keyCode) {
                case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6__["Key"].F2:
                    _this.showSearchView();
                    break;
            }
        }));
    };
    CustomerListComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    CustomerListComponent.prototype.onSelect = function (customer) {
        var _this = this;
        this.selectedCustomer = customer;
        this.flyoutView = 'customer';
        this.flyout.show().then(function () {
            _this.customerView.focus();
        });
    };
    CustomerListComponent.prototype.onSearch = function (model) {
        this.flyout.hide();
    };
    CustomerListComponent.prototype.showSearchView = function () {
        var _this = this;
        this.flyoutView = 'search';
        this.flyout.show().then(function () {
            _this.searchView.focus();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('flyout'),
        __metadata("design:type", _widgets_flyout_flyout_component__WEBPACK_IMPORTED_MODULE_5__["FlyoutComponent"])
    ], CustomerListComponent.prototype, "flyout", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('searchView'),
        __metadata("design:type", _customer_search_customer_search_component__WEBPACK_IMPORTED_MODULE_8__["CustomerSearchComponent"])
    ], CustomerListComponent.prototype, "searchView", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('customerView'),
        __metadata("design:type", _customer_customer_component__WEBPACK_IMPORTED_MODULE_7__["CustomerComponent"])
    ], CustomerListComponent.prototype, "customerView", void 0);
    CustomerListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customer-list',
            template: __webpack_require__(/*! ./customer-list.component.html */ "./src/app/customer/components/customer-list/customer-list.component.html"),
            styles: [__webpack_require__(/*! ./customer-list.component.scss */ "./src/app/customer/components/customer-list/customer-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_customer_service__WEBPACK_IMPORTED_MODULE_3__["default"]])
    ], CustomerListComponent);
    return CustomerListComponent;
}());



/***/ }),

/***/ "./src/app/customer/components/customer-search/customer-search.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/customer/components/customer-search/customer-search.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ui grid\">\r\n  <div class=\"sixteen wide column\">\r\n    <mat-form-field>\r\n      <input #customerNameInput matInput [(ngModel)]=\"model.name\" placeholder=\"Tên KH\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"eight wide column\">\r\n    <mat-form-field>\r\n      <input matInput [(ngModel)]=\"model.phoneNumber\" placeholder=\"Số ĐT\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"eight wide column\">\r\n    <dropdown [options]=\"customerTypes\"\r\n              [valueMember]=\"'id'\"\r\n              [displayMember]=\"'name'\"\r\n              [(model)]=\"model.typeId\"\r\n              [label]=\"'Loại KH'\">\r\n    </dropdown>\r\n  </div>\r\n  <div class=\"sixteen wide column\">\r\n    <mat-form-field>\r\n      <input matInput [(ngModel)]=\"model.email\" placeholder=\"Email\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"sixteen wide column\">\r\n    <mat-form-field>\r\n      <input matInput [(ngModel)]=\"model.address\" placeholder=\"Địa chỉ\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"sixteen wide column\">\r\n    <dropdown [options]=\"[{value: 1, text: 'Hoạt động'},{value: 0, text: 'Không hoạt động'}]\"\r\n              [label]=\"'Tình trạng'\"\r\n              [(model)]=\"model.isActive\">\r\n    </dropdown>\r\n  </div>\r\n  <div class=\"actions\">\r\n    <button mat-flat-button (click)=\"doCancel()\">Hủy (Esc)</button>\r\n    <button mat-flat-button (click)=\"doSearch()\" color=\"primary\">Tìm (F4)</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/customer/components/customer-search/customer-search.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/customer/components/customer-search/customer-search.component.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/customer/components/customer-search/customer-search.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/customer/components/customer-search/customer-search.component.ts ***!
  \**********************************************************************************/
/*! exports provided: CustomerSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerSearchComponent", function() { return CustomerSearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_customer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/customer.service */ "./src/app/services/customer.service.ts");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CustomerSearchComponent = /** @class */ (function () {
    function CustomerSearchComponent(customerService) {
        this.customerService = customerService;
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.search = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.model = {};
    }
    CustomerSearchComponent.prototype.onKeyup = function (e) {
        switch (e.keyCode) {
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_2__["Key"].Escape:
                this.doCancel();
                break;
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_2__["Key"].F4:
                this.doSearch();
                break;
        }
    };
    CustomerSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerService.getCustomerTypes().subscribe(function (types) { return _this.customerTypes = types; });
    };
    CustomerSearchComponent.prototype.focus = function () {
        $(this.customerNameInput.nativeElement).focus();
    };
    CustomerSearchComponent.prototype.doCancel = function () {
        this.cancel.emit();
    };
    CustomerSearchComponent.prototype.doSearch = function () {
        this.search.emit();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CustomerSearchComponent.prototype, "cancel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CustomerSearchComponent.prototype, "search", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('customerNameInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CustomerSearchComponent.prototype, "customerNameInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], CustomerSearchComponent.prototype, "onKeyup", null);
    CustomerSearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'customer-search',
            template: __webpack_require__(/*! ./customer-search.component.html */ "./src/app/customer/components/customer-search/customer-search.component.html"),
            styles: [__webpack_require__(/*! ./customer-search.component.scss */ "./src/app/customer/components/customer-search/customer-search.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_customer_service__WEBPACK_IMPORTED_MODULE_1__["default"]])
    ], CustomerSearchComponent);
    return CustomerSearchComponent;
}());



/***/ }),

/***/ "./src/app/customer/components/customer/customer.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/customer/components/customer/customer.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ui grid\">\r\n  <div class=\"sixteen wide column\">\r\n    <mat-form-field>\r\n      <input #customerNameInput matInput [(ngModel)]=\"customer.name\" placeholder=\"Tên KH\" required />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"eight wide column\">\r\n    <dropdown [options]=\"customerTypes\"\r\n              [valueMember]=\"'id'\"\r\n              [displayMember]=\"'name'\"\r\n              [(model)]=\"customer.typeId\"\r\n              [label]=\"'Loại KH'\">\r\n    </dropdown>\r\n  </div>\r\n  <div class=\"eight wide column\">\r\n    <mat-form-field>\r\n      <input matInput [(ngModel)]=\"customer.phoneNumber\" placeholder=\"Số ĐT\" required />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"sixteen wide column\">\r\n    <mat-form-field>\r\n      <input matInput [(ngModel)]=\"customer.email\" placeholder=\"Email\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"sixteen wide column\">\r\n    <mat-form-field>\r\n      <input matInput [(ngModel)]=\"customer.address\" placeholder=\"Địa chỉ\" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"sixteen wide column\">\r\n    <mat-checkbox [(ngModel)]=\"customer.isActive\">Hoạt động</mat-checkbox>\r\n  </div>\r\n  <div class=\"actions\">\r\n    <button mat-flat-button (click)=\"doCancel()\">Hủy (Esc)</button>\r\n    <button mat-flat-button color=\"primary\" (click)=\"save()\">Lưu (F4)</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/customer/components/customer/customer.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/customer/components/customer/customer.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/customer/components/customer/customer.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/customer/components/customer/customer.component.ts ***!
  \********************************************************************/
/*! exports provided: CustomerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerComponent", function() { return CustomerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/customer */ "./src/app/models/customer.ts");
/* harmony import */ var _services_customer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/customer.service */ "./src/app/services/customer.service.ts");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(customerService) {
        this.customerService = customerService;
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.commit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.customer = new _models_customer__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    CustomerComponent.prototype.onKeyup = function (e) {
        switch (e.keyCode) {
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3__["Key"].Escape:
                this.doCancel();
                break;
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3__["Key"].F4:
                this.save();
                break;
        }
    };
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerService.getCustomer(this.id).subscribe(function (customer) { return _this.customer = customer; });
        this.customerService.getCustomerTypes().subscribe(function (types) { return _this.customerTypes = types; });
    };
    CustomerComponent.prototype.focus = function () {
        $(this.customerNameInput.nativeElement).focus();
    };
    CustomerComponent.prototype.doCancel = function () {
        this.cancel.emit();
    };
    CustomerComponent.prototype.save = function () {
        this.customerService.save(this.customer);
        this.commit.emit();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], CustomerComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CustomerComponent.prototype, "cancel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CustomerComponent.prototype, "commit", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('customerNameInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CustomerComponent.prototype, "customerNameInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], CustomerComponent.prototype, "onKeyup", null);
    CustomerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'customer',
            template: __webpack_require__(/*! ./customer.component.html */ "./src/app/customer/components/customer/customer.component.html"),
            styles: [__webpack_require__(/*! ./customer.component.scss */ "./src/app/customer/components/customer/customer.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_customer_service__WEBPACK_IMPORTED_MODULE_2__["default"]])
    ], CustomerComponent);
    return CustomerComponent;
}());



/***/ }),

/***/ "./src/app/customer/customer.module.ts":
/*!*********************************************!*\
  !*** ./src/app/customer/customer.module.ts ***!
  \*********************************************/
/*! exports provided: CustomerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerModule", function() { return CustomerModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components_customer_list_customer_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/customer-list/customer-list.component */ "./src/app/customer/components/customer-list/customer-list.component.ts");
/* harmony import */ var _components_customer_customer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/customer/customer.component */ "./src/app/customer/components/customer/customer.component.ts");
/* harmony import */ var _components_customer_search_customer_search_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/customer-search/customer-search.component */ "./src/app/customer/components/customer-search/customer-search.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _widgets_widget_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widgets/widget.module */ "./src/app/widgets/widget.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _customer_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./customer.routing */ "./src/app/customer/customer.routing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var CustomerModule = /** @class */ (function () {
    function CustomerModule() {
    }
    CustomerModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"].forChild(_customer_routing__WEBPACK_IMPORTED_MODULE_8__["routes"]),
                _widgets_widget_module__WEBPACK_IMPORTED_MODULE_6__["WidgetModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]
            ],
            declarations: [
                _components_customer_list_customer_list_component__WEBPACK_IMPORTED_MODULE_2__["CustomerListComponent"],
                _components_customer_customer_component__WEBPACK_IMPORTED_MODULE_3__["CustomerComponent"],
                _components_customer_search_customer_search_component__WEBPACK_IMPORTED_MODULE_4__["CustomerSearchComponent"]
            ],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NO_ERRORS_SCHEMA"]]
        })
    ], CustomerModule);
    return CustomerModule;
}());



/***/ }),

/***/ "./src/app/customer/customer.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/customer/customer.routing.ts ***!
  \**********************************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _components_customer_list_customer_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/customer-list/customer-list.component */ "./src/app/customer/components/customer-list/customer-list.component.ts");

var routes = [
    {
        path: '',
        component: _components_customer_list_customer_list_component__WEBPACK_IMPORTED_MODULE_0__["CustomerListComponent"]
    }
];


/***/ })

}]);
//# sourceMappingURL=customer-customer-module.js.map