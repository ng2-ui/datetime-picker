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
var datetime_picker_component_1 = require("./datetime-picker.component");
var datetime_1 = require("./datetime");
/**
 * To simplify the implementation, it limits the type if ngModel to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
var DateTimePickerDirective = (function () {
    function DateTimePickerDirective(resolver, 
        // public dcl: DynamicComponentLoader,
        viewContainerRef, dateTime) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.dateTime = dateTime;
        this.ngModelChange = new core_1.EventEmitter();
        this.keyEventListener = function (evt) {
            if (evt.keyCode === 27) {
                _this.hideDatetimePicker();
            }
        };
        this.styleDatetimePicker = function () {
            /* setting width/height auto complete */
            var thisElBCR = _this.el.getBoundingClientRect();
            _this.datetimePickerEl.style.width = thisElBCR.width + 'px';
            _this.datetimePickerEl.style.position = 'absolute';
            _this.datetimePickerEl.style.zIndex = '1';
            _this.datetimePickerEl.style.left = '0';
            _this.datetimePickerEl.style.transition = 'height 0.3s ease-in';
            _this.datetimePickerEl.style.visibility = 'hidden';
            setTimeout(function () {
                var thisElBcr = _this.el.getBoundingClientRect();
                var datetimePickerElBcr = _this.datetimePickerEl.getBoundingClientRect();
                if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) {
                    _this.datetimePickerEl.style.bottom = '0';
                }
                else {
                    _this.datetimePickerEl.style.top = thisElBcr.height + 'px';
                }
                _this.datetimePickerEl.style.visibility = 'visible';
            });
        };
        this.hideDatetimePicker = function (event) {
            if (_this.componentRef) {
                if (event && event.type === 'click' &&
                    event.target !== _this.el &&
                    !_this.elementIn(event.target, _this.datetimePickerEl)) {
                    _this.componentRef.destroy();
                    _this.componentRef = undefined;
                }
                else if (!event) {
                    _this.componentRef.destroy();
                    _this.componentRef = undefined;
                }
            }
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    DateTimePickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
        var divEl = document.createElement("div");
        divEl.className = 'ng2-datetime-picker';
        divEl.style.display = 'inline-block';
        divEl.style.position = 'relative';
        this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
        divEl.appendChild(this.el);
        var dateNgModel;
        if (typeof this.ngModel === 'string') {
            dateNgModel = this.dateFormat ?
                datetime_1.DateTime.momentParse('' + this.ngModel) :
                datetime_1.DateTime.parse('' + this.ngModel);
        }
        else if (typeof this.ngModel === 'Date') {
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
        this.registerEventListeners();
    };
    DateTimePickerDirective.prototype.ngOnDestroy = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.removeEventListener('click', this.hideDatetimePicker);
        this.el.removeEventListener('keyup', this.keyEventListener);
        this.datetimePickerEl &&
            this.datetimePickerEl.removeEventListener('keyup', this.keyEventListener);
    };
    DateTimePickerDirective.prototype.registerEventListeners = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.addEventListener('click', this.hideDatetimePicker);
        this.el.addEventListener('keyup', this.keyEventListener);
    };
    //show datetimePicker below the current element
    DateTimePickerDirective.prototype.showDatetimePicker = function ($event) {
        var _this = this;
        this.hideDatetimePicker();
        var factory = this.resolver.resolveComponentFactory(datetime_picker_component_1.DateTimePickerComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        this.datetimePickerEl = this.componentRef.location.nativeElement;
        this.datetimePickerEl.addEventListener('keyup', this.keyEventListener);
        var component = this.componentRef.instance;
        var initDate = this.ngModel || new Date();
        console.log('initDate', initDate);
        if (typeof initDate === 'string') {
            initDate = this.dateFormat ?
                datetime_1.DateTime.momentParse(initDate) : datetime_1.DateTime.parse(initDate);
        }
        console.log('initDate', initDate);
        component.initDateTime(initDate);
        component.dateOnly = this.dateOnly;
        this.styleDatetimePicker();
        component.changes.subscribe(function (changes) {
            changes.selectedDate.setHours(changes.hour);
            changes.selectedDate.setMinutes(changes.minute);
            var newNgModel = changes.selectedDate;
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
    DateTimePickerDirective.prototype.elementIn = function (el, containerEl) {
        while (el = el.parentNode) {
            if (el === containerEl)
                return true;
        }
        return false;
    };
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
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, datetime_1.DateTime])
    ], DateTimePickerDirective);
    return DateTimePickerDirective;
}());
exports.DateTimePickerDirective = DateTimePickerDirective;
//# sourceMappingURL=datetime-picker.directive.js.map