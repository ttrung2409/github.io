(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["retail-retail-module"],{

/***/ "./src/app/models/payment.ts":
/*!***********************************!*\
  !*** ./src/app/models/payment.ts ***!
  \***********************************/
/*! exports provided: default, PaymentMethod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentMethod", function() { return PaymentMethod; });
var Payment = /** @class */ (function () {
    function Payment(init) {
        Object.assign(this, init);
    }
    return Payment;
}());
/* harmony default export */ __webpack_exports__["default"] = (Payment);
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["Cash"] = "cash";
})(PaymentMethod || (PaymentMethod = {}));


/***/ }),

/***/ "./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3 mat-dialog-title>Thông tin khách hàng</h3>\r\n<div mat-dialog-content>\r\n  <div class=\"ui grid\">\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Tên khách hàng\" [(ngModel)]=\"customer.name\" required/>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Số điện thoại\" [(ngModel)]=\"customer.phoneNumber\" required/>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Email\" [(ngModel)]=\"customer.email\" />\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Địa chỉ\" [(ngModel)]=\"customer.address\" />\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-flat-button cdkInitialFocus (click)=\"close()\">Hủy (Esc)</button>\r\n  <button mat-flat-button cdkInitialFocus color=\"primary\" (click)=\"save()\">Lưu (F4)</button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.ts ***!
  \****************************************************************************************/
/*! exports provided: AddCustomerDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCustomerDialog", function() { return AddCustomerDialog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_customer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/customer.service */ "./src/app/services/customer.service.ts");
/* harmony import */ var _models_customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/customer */ "./src/app/models/customer.ts");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var AddCustomerDialog = /** @class */ (function () {
    function AddCustomerDialog(dialogRef, data, customerService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.customerService = customerService;
        this.customer = new _models_customer__WEBPACK_IMPORTED_MODULE_3__["default"]();
    }
    AddCustomerDialog.prototype.onKeyup = function (e) {
        switch (e.keyCode) {
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_4__["Key"].F4:
                this.save();
                break;
        }
    };
    ;
    AddCustomerDialog.prototype.ngOnInit = function () {
    };
    AddCustomerDialog.prototype.save = function () {
        this.customerService.save(Object.assign(this.customer, { typeId: 1 }));
        this.close();
    };
    AddCustomerDialog.prototype.close = function () {
        this.dialogRef.close();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], AddCustomerDialog.prototype, "onKeyup", null);
    AddCustomerDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-customer-dialog',
            template: __webpack_require__(/*! ./add-customer-dialog.component.html */ "./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.html"),
            styles: [__webpack_require__(/*! ./add-customer-dialog.component.scss */ "./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_customer_service__WEBPACK_IMPORTED_MODULE_2__["default"]])
    ], AddCustomerDialog);
    return AddCustomerDialog;
}());



/***/ }),

/***/ "./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div mat-dialog-content>\r\n  <p>Không tìm thấy sản phẩm</p>  \r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-flat-button mat-dialog-close cdkInitialFocus color=\"primary\" (click)=\"close()\">OK</button>  \r\n</div>\r\n"

/***/ }),

/***/ "./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.ts ***!
  \************************************************************************************************/
/*! exports provided: NoProductFoundDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoProductFoundDialog", function() { return NoProductFoundDialog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
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
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var NoProductFoundDialog = /** @class */ (function () {
    function NoProductFoundDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    NoProductFoundDialog.prototype.onKeyup = function (e) {
        switch (e.keyCode) {
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_2__["Key"].Enter:
                this.close();
                break;
        }
    };
    NoProductFoundDialog.prototype.ngOnInit = function () {
    };
    NoProductFoundDialog.prototype.close = function () {
        this.dialogRef.close();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NoProductFoundDialog.prototype, "onKeyup", null);
    NoProductFoundDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-no-product-found-dialog',
            template: __webpack_require__(/*! ./no-product-found-dialog.component.html */ "./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.html"),
            styles: [__webpack_require__(/*! ./no-product-found-dialog.component.scss */ "./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], NoProductFoundDialog);
    return NoProductFoundDialog;
}());



/***/ }),

/***/ "./src/app/retail/components/payment/payment.component.html":
/*!******************************************************************!*\
  !*** ./src/app/retail/components/payment/payment.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <div class=\"ui grid\">\r\n    <div class=\"sixteen wide column\">\r\n      <typeahead #customerLookup [options]=\"customers\"\r\n                 [(model)]=\"invoice.customerId\"\r\n                 (search)=\"onSearch($event)\"\r\n                 [isLoading]=\"isLoading\"\r\n                 [valueMember]=\"'id'\"\r\n                 [displayMember]=\"'name'\"\r\n                 [label]=\"'Nhập tên, số điện thoại hoặc email để tìm khách hàng'\"\r\n                 [floatLabel]=\"'never'\"\r\n                 [showOnKeyDown]=\"false\"\r\n                 [requestForOption]=\"requestForCustomer.bind(this)\"\r\n                 [itemTemplate]=\"itemTemplate\">\r\n        <ng-template #itemTemplate let-item=\"item\">\r\n          <div>{{item.name}}</div>\r\n          <div style=\"color: grey; margin-top: 8px\">{{item.phoneNumber}}</div>\r\n          <div style=\"color: grey; margin-top: 8px\">{{item.email}}</div>\r\n        </ng-template>\r\n      </typeahead>\r\n    </div>    \r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Tổng\" number [model]=\"invoice.total\" [readonly]=\"true\" required>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Tiền mặt\" number [(model)]=\"payment.amount\" required>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Tiền thừa\"\r\n               number [model]=\"payment.amount - invoice.total > 0 ? payment.amount - invoice.total : ''\"\r\n               [readonly]=\"true\">\r\n      </mat-form-field>\r\n    </div>\r\n  </div>  \r\n  <div class=\"actions\">\r\n    <button mat-flat-button (click)=\"doCancel()\">Hủy (Esc)</button>\r\n    <button mat-flat-button color=\"primary\" (click)=\"doComplete()\">Hoàn tất (F4)</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/retail/components/payment/payment.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/retail/components/payment/payment.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/retail/components/payment/payment.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/retail/components/payment/payment.component.ts ***!
  \****************************************************************/
/*! exports provided: PaymentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentComponent", function() { return PaymentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_retail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/retail.service */ "./src/app/services/retail.service.ts");
/* harmony import */ var _services_customer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/customer.service */ "./src/app/services/customer.service.ts");
/* harmony import */ var _models_invoice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/invoice */ "./src/app/models/invoice.ts");
/* harmony import */ var _widgets_typeahead_typeahead_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../widgets/typeahead/typeahead.component */ "./src/app/widgets/typeahead/typeahead.component.ts");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _models_payment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../models/payment */ "./src/app/models/payment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(retailService, customerService) {
        this.retailService = retailService;
        this.customerService = customerService;
        this.complete = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.customers = [];
        this.payment = new _models_payment__WEBPACK_IMPORTED_MODULE_6__["default"]();
    }
    PaymentComponent.prototype.onKeyup = function (e) {
        switch (e.keyCode) {
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_5__["Key"].Escape:
                this.doCancel();
                break;
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_5__["Key"].F4:
                this.doComplete();
                break;
        }
    };
    ;
    PaymentComponent.prototype.ngOnInit = function () {
    };
    PaymentComponent.prototype.ngOnChanges = function (changes) {
    };
    PaymentComponent.prototype.onSearch = function (query) {
        var _this = this;
        if (!!this._customerSubscription) {
            this._customerSubscription.unsubscribe();
            this._customerSubscription = null;
        }
        this._customerSubscription = this.customerService.lookup(query).subscribe(function (customers) {
            _this.customers = customers;
        });
    };
    PaymentComponent.prototype.focus = function () {
        this.customerLookup.focus();
    };
    PaymentComponent.prototype.doCancel = function () {
        this.cancel.emit();
    };
    PaymentComponent.prototype.doComplete = function () {
        this.complete.emit();
    };
    PaymentComponent.prototype.requestForCustomer = function (id) {
        return this.customerService.getCustomer(id);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_invoice__WEBPACK_IMPORTED_MODULE_3__["default"])
    ], PaymentComponent.prototype, "invoice", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PaymentComponent.prototype, "complete", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PaymentComponent.prototype, "cancel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('customerLookup'),
        __metadata("design:type", _widgets_typeahead_typeahead_component__WEBPACK_IMPORTED_MODULE_4__["TypeaheadComponent"])
    ], PaymentComponent.prototype, "customerLookup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], PaymentComponent.prototype, "onKeyup", null);
    PaymentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'payment',
            template: __webpack_require__(/*! ./payment.component.html */ "./src/app/retail/components/payment/payment.component.html"),
            styles: [__webpack_require__(/*! ./payment.component.scss */ "./src/app/retail/components/payment/payment.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_retail_service__WEBPACK_IMPORTED_MODULE_1__["default"], _services_customer_service__WEBPACK_IMPORTED_MODULE_2__["default"]])
    ], PaymentComponent);
    return PaymentComponent;
}());



/***/ }),

/***/ "./src/app/retail/components/qty-editor/qty-editor.component.html":
/*!************************************************************************!*\
  !*** ./src/app/retail/components/qty-editor/qty-editor.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <div class=\"ui grid\">\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input #qtyInput matInput placeholder=\"SL\" number [(model)]=\"item.qty\" required>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Giá\" number [(model)]=\"item.price\" required>\r\n        <mat-chip-list matSuffix>\r\n          <mat-chip [selected]=\"item.price == item.product.retailPrice\">Lẻ (L)</mat-chip>\r\n          <mat-chip [selected]=\"item.price == item.product.wholeSalePrice\">Sỉ (S)</mat-chip>\r\n          <mat-chip [selected]=\"item.price == item.product.discountPrice\">Khuyến mãi (K)</mat-chip>\r\n        </mat-chip-list>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n  <div class=\"actions\">\r\n    <button mat-flat-button (click)=\"doCancel()\">Hủy (Esc)</button>\r\n    <button mat-flat-button color=\"primary\" (click)=\"save()\">Lưu (F4)</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/retail/components/qty-editor/qty-editor.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/retail/components/qty-editor/qty-editor.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/retail/components/qty-editor/qty-editor.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/retail/components/qty-editor/qty-editor.component.ts ***!
  \**********************************************************************/
/*! exports provided: QtyEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QtyEditorComponent", function() { return QtyEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_invoiceItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/invoiceItem */ "./src/app/models/invoiceItem.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QtyEditorComponent = /** @class */ (function () {
    function QtyEditorComponent() {
        this.commit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    QtyEditorComponent.prototype.onKeyup = function (e) {
        switch (e.keyCode) {
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_1__["Key"].Escape:
                this.doCancel();
                break;
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_1__["Key"].F4:
                this.save();
                break;
        }
        switch (e.key) {
            case 'l':
                this.item.price = this.item.product.retailPrice;
                break;
            case 's':
                this.item.price = this.item.product.wholeSalePrice;
                break;
            case 'k':
                this.item.price = this.item.product.discountPrice;
                break;
        }
    };
    ;
    QtyEditorComponent.prototype.ngOnInit = function () {
    };
    QtyEditorComponent.prototype.doCancel = function () {
        this.cancel.emit();
    };
    QtyEditorComponent.prototype.save = function () {
        this.commit.emit(this.item);
    };
    QtyEditorComponent.prototype.focus = function () {
        $(this.qtyInput.nativeElement).focus();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_invoiceItem__WEBPACK_IMPORTED_MODULE_2__["default"])
    ], QtyEditorComponent.prototype, "item", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], QtyEditorComponent.prototype, "commit", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], QtyEditorComponent.prototype, "cancel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('qtyInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], QtyEditorComponent.prototype, "qtyInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], QtyEditorComponent.prototype, "onKeyup", null);
    QtyEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'qty-editor',
            template: __webpack_require__(/*! ./qty-editor.component.html */ "./src/app/retail/components/qty-editor/qty-editor.component.html"),
            styles: [__webpack_require__(/*! ./qty-editor.component.scss */ "./src/app/retail/components/qty-editor/qty-editor.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], QtyEditorComponent);
    return QtyEditorComponent;
}());



/***/ }),

/***/ "./src/app/retail/components/retail/retail.component.html":
/*!****************************************************************!*\
  !*** ./src/app/retail/components/retail/retail.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"retail\">\r\n  <toolbar>\r\n    <toolbar-title>Bán lẻ</toolbar-title>\r\n    <actions>\r\n      <button mat-button (click)=\"pay()\">\r\n        <mat-icon>attach_money</mat-icon>\r\n        (F2)\r\n      </button>\r\n      <button mat-button (click)=\"addCustomer()\">\r\n        <mat-icon>person_add</mat-icon>\r\n        (F9)\r\n      </button>\r\n      <button mat-button><mat-icon>print</mat-icon></button>\r\n    </actions>\r\n  </toolbar>  \r\n  <div class=\"row\">\r\n    <div class=\"sixteen wide column\">\r\n      <product-lookup #productLookup\r\n                      [(model)]=\"selectedProductId\"\r\n                      (onSelect)=\"addItem($event)\"\r\n                      [clearOnSelect]=\"true\"\r\n                      (onKeydown)=\"onKeydown($event)\">\r\n      </product-lookup>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <grid #grid [columns]=\"columns\"\r\n            [dataSource]=\"invoice.items\"\r\n            [(selectedIndex)]=\"selectedIndex\"\r\n            (rowClick)=\"onSelect($event)\"\r\n            (select)=\"onSelect($event)\"\r\n            (delete)=\"onDelete($event)\"\r\n            [showFooter]=\"true\">\r\n      </grid>\r\n    </div>\r\n  </div>  \r\n  <flyout #flyout [closable]=\"false\" [containerSelector]=\"'.retail'\" (onHide)=\"onFlyoutHide()\">\r\n    <content>\r\n      <qty-editor #qtyEditor *ngIf=\"flyoutView == 'qtyEditor'\"\r\n                  [item]=\"selectedItem\"\r\n                  (commit)=\"onItemChange($event)\"\r\n                  (cancel)=\"flyout.hide()\"\r\n                  ></qty-editor>\r\n      <payment #paymentView *ngIf=\"flyoutView == 'payment'\"\r\n               [invoice]=\"invoice\"\r\n               (complete)=\"onPaymentComplete($event)\"\r\n               (cancel)=\"flyout.hide()\">\r\n      </payment>\r\n    </content>\r\n  </flyout>\r\n  <button mat-fab color=\"accent\">\r\n    <mat-icon>add</mat-icon>\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/retail/components/retail/retail.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/retail/components/retail/retail.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".retail .mat-form-field-suffix {\n  padding-bottom: 4px !important; }\n"

/***/ }),

/***/ "./src/app/retail/components/retail/retail.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/retail/components/retail/retail.component.ts ***!
  \**************************************************************/
/*! exports provided: RetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RetailComponent", function() { return RetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../widgets/grid/grid.component */ "./src/app/widgets/grid/grid.component.ts");
/* harmony import */ var _models_invoice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/invoice */ "./src/app/models/invoice.ts");
/* harmony import */ var _models_invoiceItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/invoiceItem */ "./src/app/models/invoiceItem.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _widgets_flyout_flyout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../widgets/flyout/flyout.component */ "./src/app/widgets/flyout/flyout.component.ts");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! guid-typescript */ "./node_modules/guid-typescript/dist/guid.js");
/* harmony import */ var guid_typescript__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(guid_typescript__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _widgets_product_lookup_product_lookup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../widgets/product-lookup/product-lookup.component */ "./src/app/widgets/product-lookup/product-lookup.component.ts");
/* harmony import */ var _qty_editor_qty_editor_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../qty-editor/qty-editor.component */ "./src/app/retail/components/qty-editor/qty-editor.component.ts");
/* harmony import */ var _payment_payment_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../payment/payment.component */ "./src/app/retail/components/payment/payment.component.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _no_product_found_dialog_no_product_found_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../no-product-found-dialog/no-product-found-dialog.component */ "./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.ts");
/* harmony import */ var _services_retail_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../services/retail.service */ "./src/app/services/retail.service.ts");
/* harmony import */ var _add_customer_dialog_add_customer_dialog_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../add-customer-dialog/add-customer-dialog.component */ "./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var RetailComponent = /** @class */ (function () {
    function RetailComponent(retailService, dialog, utils) {
        this.retailService = retailService;
        this.dialog = dialog;
        this.utils = utils;
        this.invoice = new _models_invoice__WEBPACK_IMPORTED_MODULE_2__["default"]({ customerId: 1 });
        this.selectedItem = new _models_invoiceItem__WEBPACK_IMPORTED_MODULE_3__["default"]();
    }
    RetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.columns = [
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridColumn"]({
                caption: 'STT',
                field: 'index',
                width: '100px'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridColumn"]({
                caption: 'Tên sản phẩm',
                field: 'product.name'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridColumn"]({
                caption: 'ĐVT',
                field: 'product.uom',
                width: '100px'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridColumn"]({
                caption: 'SL',
                field: 'qty',
                width: '100px'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridColumn"]({
                caption: 'Giá',
                field: 'price',
                width: '180px',
                footer: 'Tổng'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridColumn"]({
                caption: 'Thành tiền',
                field: 'total',
                width: '200px',
                footer: function () {
                    return this.utils.formatNumber(this.invoice.items.reduce(function (acc, item) { return acc += item.total; }, 0));
                }.bind(this)
            })
        ];
        this._subscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(document, 'keyup').subscribe(function (e) {
            switch (e.keyCode) {
                case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6__["Key"].F2:
                    _this.pay();
                    break;
                case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_6__["Key"].F9:
                    _this.addCustomer();
                    break;
            }
            switch (e.key) {
                case '+':
                    _this.invoice.items[_this.selectedIndex].qty++;
                    break;
                case '-':
                    _this.invoice.items[_this.selectedIndex].qty = Math.max(0, _this.invoice.items[_this.selectedIndex].qty - 1);
                    break;
            }
        });
    };
    RetailComponent.prototype.ngAfterViewInit = function () {
        this.productLookup.focus();
    };
    RetailComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    RetailComponent.prototype.addItem = function (product) {
        if (!!product) {
            this.invoice.items.push(new _models_invoiceItem__WEBPACK_IMPORTED_MODULE_3__["default"]({
                id: guid_typescript__WEBPACK_IMPORTED_MODULE_7__["Guid"].create().toString(),
                productId: product.id,
                product: product,
                qty: 1,
                price: product.retailPrice,
                index: this.invoice.items.length + 1
            }));
            this.selectedIndex = this.invoice.items.length - 1;
        }
        else {
            this.dialog.open(_no_product_found_dialog_no_product_found_dialog_component__WEBPACK_IMPORTED_MODULE_13__["NoProductFoundDialog"]);
        }
    };
    RetailComponent.prototype.onKeydown = function (event) {
        this.grid.handleKeyEvent(event);
    };
    RetailComponent.prototype.onSelect = function (item) {
        var _this = this;
        if (!!item) {
            this.selectedItem = _.cloneDeep(item);
            this.flyoutView = 'qtyEditor';
            this.flyout.show().then(function () {
                _this.qtyEditor.focus();
            });
        }
    };
    RetailComponent.prototype.onDelete = function (item) {
        this.invoice.items = this.invoice.items.filter(function (x) { return x.id != item.id; });
        var index = 1;
        for (var _i = 0, _a = this.invoice.items; _i < _a.length; _i++) {
            var item_1 = _a[_i];
            item_1.index = index++;
        }
        this.selectedIndex = Math.min(this.invoice.items.length - 1, this.selectedIndex);
    };
    RetailComponent.prototype.pay = function () {
        var _this = this;
        this.flyoutView = 'payment';
        this.flyout.show().then(function () {
            _this.paymentView.focus();
        });
    };
    RetailComponent.prototype.onItemChange = function (item) {
        this.flyout.hide();
        this.invoice.items = this.invoice.items.map(function (x) { return x.id == item.id ? item : x; });
    };
    RetailComponent.prototype.onPaymentComplete = function () {
        this.flyout.hide();
        this.retailService.save(this.invoice);
        this.new();
    };
    RetailComponent.prototype.new = function () {
        this.invoice = new _models_invoice__WEBPACK_IMPORTED_MODULE_2__["default"]({ customerId: 1 });
    };
    RetailComponent.prototype.onFlyoutHide = function () {
        this.flyoutView = '';
        this.productLookup.focus();
        this.productLookup.clear();
    };
    RetailComponent.prototype.addCustomer = function () {
        this.dialog.open(_add_customer_dialog_add_customer_dialog_component__WEBPACK_IMPORTED_MODULE_15__["AddCustomerDialog"]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('flyout'),
        __metadata("design:type", _widgets_flyout_flyout_component__WEBPACK_IMPORTED_MODULE_5__["FlyoutComponent"])
    ], RetailComponent.prototype, "flyout", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('productLookup'),
        __metadata("design:type", _widgets_product_lookup_product_lookup_component__WEBPACK_IMPORTED_MODULE_8__["ProductLookupComponent"])
    ], RetailComponent.prototype, "productLookup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('qtyEditor'),
        __metadata("design:type", _qty_editor_qty_editor_component__WEBPACK_IMPORTED_MODULE_9__["QtyEditorComponent"])
    ], RetailComponent.prototype, "qtyEditor", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('grid'),
        __metadata("design:type", _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"])
    ], RetailComponent.prototype, "grid", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('paymentView'),
        __metadata("design:type", _payment_payment_component__WEBPACK_IMPORTED_MODULE_10__["PaymentComponent"])
    ], RetailComponent.prototype, "paymentView", void 0);
    RetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'retail',
            template: __webpack_require__(/*! ./retail.component.html */ "./src/app/retail/components/retail/retail.component.html"),
            styles: [__webpack_require__(/*! ./retail.component.scss */ "./src/app/retail/components/retail/retail.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_services_retail_service__WEBPACK_IMPORTED_MODULE_14__["default"], _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatDialog"], _services_utils_service__WEBPACK_IMPORTED_MODULE_11__["default"]])
    ], RetailComponent);
    return RetailComponent;
}());



/***/ }),

/***/ "./src/app/retail/retail.module.ts":
/*!*****************************************!*\
  !*** ./src/app/retail/retail.module.ts ***!
  \*****************************************/
/*! exports provided: RetailModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RetailModule", function() { return RetailModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _retail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retail.routing */ "./src/app/retail/retail.routing.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _widgets_widget_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widgets/widget.module */ "./src/app/widgets/widget.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_retail_retail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/retail/retail.component */ "./src/app/retail/components/retail/retail.component.ts");
/* harmony import */ var _components_payment_payment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/payment/payment.component */ "./src/app/retail/components/payment/payment.component.ts");
/* harmony import */ var _components_qty_editor_qty_editor_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/qty-editor/qty-editor.component */ "./src/app/retail/components/qty-editor/qty-editor.component.ts");
/* harmony import */ var _components_no_product_found_dialog_no_product_found_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/no-product-found-dialog/no-product-found-dialog.component */ "./src/app/retail/components/no-product-found-dialog/no-product-found-dialog.component.ts");
/* harmony import */ var _components_add_customer_dialog_add_customer_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/add-customer-dialog/add-customer-dialog.component */ "./src/app/retail/components/add-customer-dialog/add-customer-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var RetailModule = /** @class */ (function () {
    function RetailModule() {
    }
    RetailModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(_retail_routing__WEBPACK_IMPORTED_MODULE_2__["routes"]),
                _widgets_widget_module__WEBPACK_IMPORTED_MODULE_4__["WidgetModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]
            ],
            declarations: [
                _components_retail_retail_component__WEBPACK_IMPORTED_MODULE_6__["RetailComponent"],
                _components_payment_payment_component__WEBPACK_IMPORTED_MODULE_7__["PaymentComponent"],
                _components_qty_editor_qty_editor_component__WEBPACK_IMPORTED_MODULE_8__["QtyEditorComponent"],
                _components_no_product_found_dialog_no_product_found_dialog_component__WEBPACK_IMPORTED_MODULE_9__["NoProductFoundDialog"],
                _components_add_customer_dialog_add_customer_dialog_component__WEBPACK_IMPORTED_MODULE_10__["AddCustomerDialog"]
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"]],
            entryComponents: [
                _components_no_product_found_dialog_no_product_found_dialog_component__WEBPACK_IMPORTED_MODULE_9__["NoProductFoundDialog"],
                _components_add_customer_dialog_add_customer_dialog_component__WEBPACK_IMPORTED_MODULE_10__["AddCustomerDialog"]
            ],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NO_ERRORS_SCHEMA"]]
        })
    ], RetailModule);
    return RetailModule;
}());



/***/ }),

/***/ "./src/app/retail/retail.routing.ts":
/*!******************************************!*\
  !*** ./src/app/retail/retail.routing.ts ***!
  \******************************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _components_retail_retail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/retail/retail.component */ "./src/app/retail/components/retail/retail.component.ts");

var routes = [
    {
        path: '',
        component: _components_retail_retail_component__WEBPACK_IMPORTED_MODULE_0__["RetailComponent"]
    }
];


/***/ })

}]);
//# sourceMappingURL=retail-retail-module.js.map