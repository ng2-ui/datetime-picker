"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var datetime_picker_component_1 = require('./datetime-picker.component');
var datetime_1 = require('./datetime');
/**
 * To simplify the implementation, it limits the type if ngModel to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
var DateTimePickerDirective = (function () {
    function DateTimePickerDirective(_resolver, _viewContainerRef) {
        var _this = this;
        this._resolver = _resolver;
        this._viewContainerRef = _viewContainerRef;
        this.ngModelChange = new core_1.EventEmitter();
        this._keyEventListener = function (e) {
            if (e.keyCode === 27) {
                _this.hideDatetimePicker();
            }
        };
        this._el = this._viewContainerRef.element.nativeElement;
    }
    DateTimePickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
        var divEl = document.createElement("div");
        divEl.className = 'ng2-datetime-picker';
        divEl.style.display = 'inline-block';
        divEl.style.position = 'relative';
        this._el.parentElement.insertBefore(divEl, this._el.nextSibling);
        divEl.appendChild(this._el);
        var dateNgModel;
        if (typeof this.ngModel === 'string') {
            dateNgModel = this.dateFormat ?
                datetime_1.DateTime.momentParse('' + this.ngModel) :
                datetime_1.DateTime.parse('' + this.ngModel);
        }
        else if (this.ngModel instanceof Date) {
            dateNgModel = this.ngModel;
        }
        else {
            dateNgModel = new Date();
        }
        this.year && dateNgModel.setFullYear(this.year);
        this.month && dateNgModel.setMonth(this.month - 1);
        this.day && dateNgModel.setDate(this.day);
        this.hour && dateNgModel.setHours(this.hour);
        this.minute && dateNgModel.setMinutes(this.minute);
        // emit toString Modified(date formatted) instance
        // https://angular.io/docs/ts/latest/api/common/DatePipe-class.html
        setTimeout(function () {
            if (_this.dateFormat) {
                dateNgModel.toString = function () {
                    return datetime_1.DateTime.momentFormatDate(dateNgModel, _this.dateFormat);
                };
            }
            else {
                dateNgModel.toString = function () {
                    return datetime_1.DateTime.formatDate(dateNgModel, _this.dateOnly);
                };
            }
            _this.ngModelChange.emit(dateNgModel);
        });
        this._registerEventListeners();
    };
    DateTimePickerDirective.prototype.ngOnDestroy = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.removeEventListener('click', this.hideDatetimePicker);
        this._el.removeEventListener('keyup', this._keyEventListener);
        this._datetimePickerEl &&
            this._datetimePickerEl.removeEventListener('keyup', this._keyEventListener);
    };
    //show datetimePicker below the current element
    DateTimePickerDirective.prototype.showDatetimePicker = function () {
        var _this = this;
        this.hideDatetimePicker();
        var factory = this._resolver.resolveComponentFactory(datetime_picker_component_1.DateTimePickerComponent);
        this._componentRef = this._viewContainerRef.createComponent(factory);
        this._datetimePickerEl = this._componentRef.location.nativeElement;
        this._datetimePickerEl.addEventListener('keyup', this._keyEventListener);
        var component = this._componentRef.instance;
        var initDate = this.ngModel || new Date();
        if (typeof initDate === 'string') {
            initDate = this.dateFormat ?
                datetime_1.DateTime.momentParse(initDate) : datetime_1.DateTime.parse(initDate);
        }
        component.initDateTime(initDate);
        component.dateOnly = this.dateOnly;
        this._styleDatetimePicker();
        component.changes.subscribe(function (changes) {
            var newNgModel = new Date(changes.selectedDate);
            newNgModel.setHours(parseInt(changes.hour, 10));
            newNgModel.setMinutes(parseInt(changes.minute, 10));
            if (_this.dateFormat) {
                newNgModel.toString = function () {
                    return datetime_1.DateTime.momentFormatDate(newNgModel, _this.dateFormat);
                };
            }
            else {
                newNgModel.toString = function () {
                    return datetime_1.DateTime.formatDate(newNgModel, _this.dateOnly);
                };
            }
            _this.ngModelChange.emit(newNgModel);
        });
        component.closing.subscribe(function () {
            setTimeout(function () {
                _this.closeOnSelect !== "false" && _this.hideDatetimePicker();
            });
        });
    };
    DateTimePickerDirective.prototype.hideDatetimePicker = function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = undefined;
        }
    };
    ;
    DateTimePickerDirective.prototype._registerEventListeners = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.addEventListener('click', this.hideDatetimePicker);
        this._el.addEventListener('keyup', this._keyEventListener);
    };
    DateTimePickerDirective.prototype._styleDatetimePicker = function () {
        var _this = this;
        /* setting width/height auto complete */
        var thisElBCR = this._el.getBoundingClientRect();
        this._datetimePickerEl.style.width = thisElBCR.width + 'px';
        this._datetimePickerEl.style.position = 'absolute';
        this._datetimePickerEl.style.zIndex = '1';
        this._datetimePickerEl.style.left = '0';
        this._datetimePickerEl.style.transition = 'height 0.3s ease-in';
        this._datetimePickerEl.style.visibility = 'hidden';
        setTimeout(function () {
            var thisElBcr = _this._el.getBoundingClientRect();
            var datetimePickerElBcr = _this._datetimePickerEl.getBoundingClientRect();
            if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) {
                _this._datetimePickerEl.style.bottom = '0';
            }
            else {
                _this._datetimePickerEl.style.top = thisElBcr.height + 'px';
            }
            _this._datetimePickerEl.style.visibility = 'visible';
        });
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DateTimePickerDirective.prototype, "year", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DateTimePickerDirective.prototype, "month", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DateTimePickerDirective.prototype, "day", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DateTimePickerDirective.prototype, "hour", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DateTimePickerDirective.prototype, "minute", void 0);
    __decorate([
        core_1.Input('date-format'), 
        __metadata('design:type', String)
    ], DateTimePickerDirective.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input('date-only'), 
        __metadata('design:type', Boolean)
    ], DateTimePickerDirective.prototype, "dateOnly", void 0);
    __decorate([
        core_1.Input('close-on-select'), 
        __metadata('design:type', String)
    ], DateTimePickerDirective.prototype, "closeOnSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DateTimePickerDirective.prototype, "ngModel", void 0);
    __decorate([
        //if string given, will be converted to Date
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateTimePickerDirective.prototype, "ngModelChange", void 0);
    DateTimePickerDirective = __decorate([
        core_1.Directive({
            selector: '[datetime-picker], [ng2-datetime-picker]',
            providers: [datetime_1.DateTime],
            host: {
                '(click)': 'showDatetimePicker($event)'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
    ], DateTimePickerDirective);
    return DateTimePickerDirective;
}());
exports.DateTimePickerDirective = DateTimePickerDirective;
//# sourceMappingURL=datetime-picker.directive.js.map