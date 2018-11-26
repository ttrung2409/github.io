(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["product-product-module"],{

/***/ "./src/app/product/components/product-list/product-list.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/product/components/product-list/product-list.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"product-list\">\r\n  <toolbar>\r\n    <toolbar-title>Quản lý sản phẩm</toolbar-title>\r\n    <actions>\r\n      <button mat-button (click)=\"showSearchView()\">\r\n        <mat-icon>filter_list</mat-icon>\r\n        (F2)\r\n      </button>\r\n    </actions>\r\n  </toolbar>  \r\n  <div style=\"margin-top: 8px\"></div>\r\n  <grid #grid [columns]=\"columns\" [dataSource]=\"products\" (rowClick)=\"onSelect($event)\" (select)=\"onSelect($event)\"></grid>\r\n  <flyout #flyout [closable]=\"false\" [containerSelector]=\"'.product-list'\" (onHide)=\"onFlyoutHide()\">\r\n    <content>\r\n      <product #productView *ngIf=\"flyoutView == 'product'\"\r\n               [id]=\"selectedProduct.id\"\r\n               (cancel)=\"flyout.hide()\"\r\n               (commit)=\"flyout.hide()\">\r\n      </product>\r\n      <product-search #productSearchView *ngIf=\"flyoutView == 'search'\"\r\n                      (search)=\"onSearch($event)\"\r\n                      (cancel)=\"flyout.hide()\"></product-search>\r\n    </content>        \r\n  </flyout>\r\n  <button mat-fab>\r\n    <mat-icon>add</mat-icon>\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/product/components/product-list/product-list.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/product/components/product-list/product-list.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".product-list .grid.search .column {\n  padding: 0px;\n  padding-left: 16px;\n  padding-right: 16px; }\n"

/***/ }),

/***/ "./src/app/product/components/product-list/product-list.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/product/components/product-list/product-list.component.ts ***!
  \***************************************************************************/
/*! exports provided: ProductListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListComponent", function() { return ProductListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/product.service */ "./src/app/services/product.service.ts");
/* harmony import */ var _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../widgets/grid/grid.component */ "./src/app/widgets/grid/grid.component.ts");
/* harmony import */ var _models_product__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/product */ "./src/app/models/product.ts");
/* harmony import */ var _widgets_flyout_flyout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../widgets/flyout/flyout.component */ "./src/app/widgets/flyout/flyout.component.ts");
/* harmony import */ var _product_product_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../product/product.component */ "./src/app/product/components/product/product.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _product_search_product_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../product-search/product-search.component */ "./src/app/product/components/product-search/product-search.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(productService) {
        this.productService = productService;
        this._subscription = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subscription"]();
        this.selectedProduct = new _models_product__WEBPACK_IMPORTED_MODULE_3__["default"]();
    }
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.columns = [
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Mã SP',
                field: 'no'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Tên SP',
                field: 'name'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'ĐVT',
                field: 'uom'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Giá nhập',
                field: 'cost'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Giá lẻ',
                field: 'retailPrice'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Giá sỉ',
                field: 'wholeSalePrice'
            }),
            new _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridColumn"]({
                caption: 'Giá khuyến mãi',
                field: 'discountPrice'
            })
        ];
        this._subscription.add(this.productService.getProducts().subscribe(function (products) {
            _this.products = products;
        }));
        this._subscription.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["fromEvent"])(document, 'keyup').subscribe(function (event) {
            switch (event.keyCode) {
                case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_7__["Key"].F2:
                    _this.showSearchView();
                    break;
            }
        }));
    };
    ProductListComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    ProductListComponent.prototype.onSelect = function (row) {
        var _this = this;
        this.selectedProduct = row;
        this.flyoutView = 'product';
        this.flyout.show().then(function () {
            _this.productView.focus();
        });
    };
    ProductListComponent.prototype.onSearch = function (params) {
        this.flyout.hide();
    };
    ProductListComponent.prototype.add = function () {
        this.selectedProduct = new _models_product__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.flyout.show();
    };
    ProductListComponent.prototype.showSearchView = function () {
        var _this = this;
        this.flyoutView = 'search';
        this.flyout.show().then(function () {
            _this.productSearchView.focus();
        });
    };
    ProductListComponent.prototype.onFlyoutHide = function () {
        this.flyoutView = '';
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_widgets_flyout_flyout_component__WEBPACK_IMPORTED_MODULE_4__["FlyoutComponent"]),
        __metadata("design:type", _widgets_flyout_flyout_component__WEBPACK_IMPORTED_MODULE_4__["FlyoutComponent"])
    ], ProductListComponent.prototype, "flyout", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('productView'),
        __metadata("design:type", _product_product_component__WEBPACK_IMPORTED_MODULE_5__["ProductComponent"])
    ], ProductListComponent.prototype, "productView", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('grid'),
        __metadata("design:type", _widgets_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"])
    ], ProductListComponent.prototype, "grid", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('productSearchView'),
        __metadata("design:type", _product_search_product_search_component__WEBPACK_IMPORTED_MODULE_8__["ProductSearchComponent"])
    ], ProductListComponent.prototype, "productSearchView", void 0);
    ProductListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'product-list',
            template: __webpack_require__(/*! ./product-list.component.html */ "./src/app/product/components/product-list/product-list.component.html"),
            styles: [__webpack_require__(/*! ./product-list.component.scss */ "./src/app/product/components/product-list/product-list.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_services_product_service__WEBPACK_IMPORTED_MODULE_1__["default"]])
    ], ProductListComponent);
    return ProductListComponent;
}());



/***/ }),

/***/ "./src/app/product/components/product-search/product-search.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/product/components/product-search/product-search.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <div class=\"ui grid\">\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input #productNoInput matInput placeholder=\"Mã SP\" [(ngModel)]=\"model.productNo\">\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Tên SP\" [(ngModel)]=\"model.productName\">\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <dropdown [options]=\"categories\"\r\n                [label]=\"'Loại'\"\r\n                [displayMember]=\"'name'\"\r\n                [valueMember]=\"'id'\"\r\n                [(model)]=\"model.categoryId\">\r\n      </dropdown>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <dropdown [options]=\"states\"\r\n                [label]=\"'Tình trạng'\"\r\n                [(model)]=\"model.isActive\">\r\n      </dropdown>\r\n    </div>\r\n  </div>\r\n  <div class=\"actions\">\r\n    <button mat-flat-button (click)=\"doCancel()\">Hủy (Esc)</button>\r\n    <button mat-flat-button color=\"primary\" (click)=\"doSearch()\">Tìm (F4)</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/product/components/product-search/product-search.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/product/components/product-search/product-search.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/components/product-search/product-search.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/product/components/product-search/product-search.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ProductSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductSearchComponent", function() { return ProductSearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/product.service */ "./src/app/services/product.service.ts");
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



var ProductSearchComponent = /** @class */ (function () {
    function ProductSearchComponent(productService) {
        this.productService = productService;
        this.search = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.model = {};
        this.states = [{ value: 1, text: 'Hoạt động' }, { value: 0, text: 'Không hoạt động' }];
    }
    ProductSearchComponent.prototype.onKeyup = function (e) {
        switch (e.keyCode) {
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_2__["Key"].Escape:
                this.doCancel();
                break;
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_2__["Key"].F4:
                this.doSearch();
                break;
        }
    };
    ;
    ProductSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productService.getCategories().subscribe(function (categories) { return _this.categories = categories; });
    };
    ProductSearchComponent.prototype.doSearch = function () {
        this.search.emit(this.model);
    };
    ProductSearchComponent.prototype.doCancel = function () {
        this.cancel.emit();
    };
    ProductSearchComponent.prototype.focus = function () {
        $(this.productNoInput.nativeElement).focus();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ProductSearchComponent.prototype, "search", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ProductSearchComponent.prototype, "cancel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('productNoInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ProductSearchComponent.prototype, "productNoInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ProductSearchComponent.prototype, "onKeyup", null);
    ProductSearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'product-search',
            template: __webpack_require__(/*! ./product-search.component.html */ "./src/app/product/components/product-search/product-search.component.html"),
            styles: [__webpack_require__(/*! ./product-search.component.scss */ "./src/app/product/components/product-search/product-search.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_product_service__WEBPACK_IMPORTED_MODULE_1__["default"]])
    ], ProductSearchComponent);
    return ProductSearchComponent;
}());



/***/ }),

/***/ "./src/app/product/components/product/product.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/product/components/product/product.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <div class=\"ui grid\">\r\n    <div class=\"eight wide column\">\r\n      <mat-form-field>\r\n        <input #productNoInput matInput placeholder=\"Mã SP\" [(ngModel)]=\"product.no\" required>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"eight wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Mã vạch\" [(ngModel)]=\"product.barcode\">\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Tên SP\" [(ngModel)]=\"product.name\" required>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"eight wide column\">\r\n      <dropdown [(model)]=\"product.categoryId\"\r\n                [options]=\"categories\"\r\n                [label]=\"'Loại'\"\r\n                [valueMember]=\"'id'\"\r\n                [displayMember]=\"'name'\"></dropdown>\r\n    </div>\r\n    <div class=\"eight wide column\">\r\n      <dropdown [options]=\"uoms\" [label]=\"'ĐVT'\" [(model)]=\"product.uom\"></dropdown>\r\n    </div>\r\n    <div class=\"eight wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Giá nhập\" number [(model)]=\"product.cost\">\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"eight wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Giá lẻ\" number [(model)]=\"product.retailPrice\">\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"eight wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Giá sỉ\" number [(model)]=\"product.wholeSalePrice\">\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"eight wide column\">\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Giá khuyến mãi\" number [(model)]=\"product.discountPrice\">\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-form-field>\r\n        <textarea matInput placeholder=\"Ghi chú\" [(ngModel)]=\"product.notes\"></textarea>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-checkbox [(ngModel)]=\"product.isActive\">Hoạt động</mat-checkbox>\r\n    </div>\r\n    <div class=\"sixteen wide column\">\r\n      <mat-checkbox [(ngModel)]=\"product.isContainer\">Có sản phẩm lẻ</mat-checkbox>\r\n    </div>\r\n    <div class=\"row\" *ngIf=\"product.isContainer\">\r\n      <div class=\"sixteen wide column\">\r\n        <label>1 {{product.uom}} {{product.name}} có:</label>\r\n      </div>\r\n      <div class=\"four wide column\">\r\n        <mat-form-field [floatLabel]=\"'never'\">\r\n          <input matInput placeholder=\"SL\" [(ngModel)]=\"product.itemQty\" />\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"twelve wide column\">\r\n        <product-lookup [(model)]=\"product.itemId\" [direction]=\"'upward'\"></product-lookup>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"actions\">\r\n    <button mat-flat-button (click)=\"doCancel()\">Hủy (Esc)</button>\r\n    <button mat-flat-button color=\"primary\" (click)=\"save()\">Lưu (F4)</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/product/components/product/product.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/product/components/product/product.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ui.grid > .column {\n  padding-bottom: 0px; }\n"

/***/ }),

/***/ "./src/app/product/components/product/product.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/product/components/product/product.component.ts ***!
  \*****************************************************************/
/*! exports provided: ProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductComponent", function() { return ProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/product.service */ "./src/app/services/product.service.ts");
/* harmony import */ var _models_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/product */ "./src/app/models/product.ts");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ts-keycode-enum */ "./node_modules/ts-keycode-enum/dist/js/Key.enum.js");
/* harmony import */ var ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/utils.service */ "./src/app/services/utils.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductComponent = /** @class */ (function () {
    function ProductComponent(productService, utils) {
        this.productService = productService;
        this.utils = utils;
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.commit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.product = new _models_product__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
    ProductComponent.prototype.onKeyup = function (e) {
        switch (e.keyCode) {
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3__["Key"].Escape:
                this.doCancel();
                break;
            case ts_keycode_enum__WEBPACK_IMPORTED_MODULE_3__["Key"].F4:
                this.save();
                break;
        }
    };
    ;
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productService.getCategories().subscribe(function (categories) { return _this.categories = categories; });
        this.productService.getUOMs().subscribe(function (uoms) { return _this.uoms = uoms; });
    };
    ProductComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!!changes.id) {
            var id = changes.id.currentValue;
            if (id > 0) {
                this.productService.getProduct(id).subscribe(function (x) {
                    _this.product = x;
                });
            }
            else {
                this.product = new _models_product__WEBPACK_IMPORTED_MODULE_2__["default"]();
            }
        }
    };
    ProductComponent.prototype.save = function () {
        this.productService.save(this.product);
        this.commit.emit();
    };
    ProductComponent.prototype.doCancel = function () {
        this.cancel.emit();
    };
    ProductComponent.prototype.focus = function () {
        $(this.productNoInput.nativeElement).focus();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ProductComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('productNoInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ProductComponent.prototype, "productNoInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ProductComponent.prototype, "cancel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ProductComponent.prototype, "commit", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ProductComponent.prototype, "onKeyup", null);
    ProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'product',
            template: __webpack_require__(/*! ./product.component.html */ "./src/app/product/components/product/product.component.html"),
            styles: [__webpack_require__(/*! ./product.component.scss */ "./src/app/product/components/product/product.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_product_service__WEBPACK_IMPORTED_MODULE_1__["default"], _services_utils_service__WEBPACK_IMPORTED_MODULE_4__["default"]])
    ], ProductComponent);
    return ProductComponent;
}());



/***/ }),

/***/ "./src/app/product/product.module.ts":
/*!*******************************************!*\
  !*** ./src/app/product/product.module.ts ***!
  \*******************************************/
/*! exports provided: ProductModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductModule", function() { return ProductModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components_product_product_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/product/product.component */ "./src/app/product/components/product/product.component.ts");
/* harmony import */ var _product_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product.routing */ "./src/app/product/product.routing.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/product-list/product-list.component */ "./src/app/product/components/product-list/product-list.component.ts");
/* harmony import */ var _widgets_widget_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widgets/widget.module */ "./src/app/widgets/widget.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_product_search_product_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/product-search/product-search.component */ "./src/app/product/components/product-search/product-search.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(_product_routing__WEBPACK_IMPORTED_MODULE_3__["routes"]),
                _widgets_widget_module__WEBPACK_IMPORTED_MODULE_6__["WidgetModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"]
            ],
            declarations: [
                _components_product_product_component__WEBPACK_IMPORTED_MODULE_2__["ProductComponent"],
                _components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_5__["ProductListComponent"],
                _components_product_search_product_search_component__WEBPACK_IMPORTED_MODULE_8__["ProductSearchComponent"]
            ],
            providers: [],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NO_ERRORS_SCHEMA"]]
        })
    ], ProductModule);
    return ProductModule;
}());



/***/ }),

/***/ "./src/app/product/product.routing.ts":
/*!********************************************!*\
  !*** ./src/app/product/product.routing.ts ***!
  \********************************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/product-list/product-list.component */ "./src/app/product/components/product-list/product-list.component.ts");

var routes = [
    {
        path: '',
        component: _components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_0__["ProductListComponent"]
    }
];


/***/ })

}]);
//# sourceMappingURL=product-product-module.js.map