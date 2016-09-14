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
 * To simplify the implementation, it limits the type if value to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
var DateTimePickerDirective = (function () {
    function DateTimePickerDirective(_resolver, _viewContainerRef) {
        var _this = this;
        this._resolver = _resolver;
        this._viewContainerRef = _viewContainerRef;
        /**
         * @deprecated
         */
        this.ngModelChange = new core_1.EventEmitter();
        this.valueChange = new core_1.EventEmitter();
        this._keyEventListener = function (e) {
            if (e.keyCode === 27) {
                _this.hideDatetimePicker();
            }
        };
        this.hideDatetimePicker = function (event) {
            if (_this._componentRef) {
                if (event && event.type === 'click' &&
                    event.target !== _this._el && !_this._elementIn(event.target, _this._datetimePicker)) {
                    _this._componentRef.destroy();
                    _this._componentRef = undefined;
                }
                else if (!event) {
                    _this._componentRef.destroy();
                    _this._componentRef = undefined;
                }
            }
        };
        this._el = this._viewContainerRef.element.nativeElement;
    }
    DateTimePickerDirective.prototype.ngOnInit = function () {
        //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
        var wrapper = document.createElement("div");
        wrapper.className = 'ng2-datetime-picker';
        wrapper.style.display = 'inline-block';
        wrapper.style.position = 'relative';
        this._el.parentElement.insertBefore(wrapper, this._el.nextSibling);
        wrapper.appendChild(this._el);
        this._registerEventListeners();
    };
    DateTimePickerDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['value'] !== undefined || changes['ngModel'] !== undefined) {
            if (changes['ngModel'] !== undefined) {
                this.value = this.ngModel;
            }
            var dateNgModel_1;
            if (typeof this.value === 'string') {
                //remove timezone and respect day light saving time
                dateNgModel_1 = this.dateFormat ?
                    datetime_1.DateTime.momentParse('' + this.value) :
                    datetime_1.DateTime.parse('' + this.value);
            }
            else if (this.value instanceof Date) {
                dateNgModel_1 = this.value;
            }
            else {
                dateNgModel_1 = new Date();
            }
            var formatted = void 0;
            if (this.dateFormat) {
                formatted = datetime_1.DateTime.momentFormatDate(dateNgModel_1, this.dateFormat);
            }
            else {
                formatted = datetime_1.DateTime.formatDate(dateNgModel_1, this.dateOnly);
            }
            this._el['value'] = formatted;
            this._value = dateNgModel_1;
            // @deprecated
            if (this.dateFormat) {
                dateNgModel_1.toString = function () {
                    return datetime_1.DateTime.momentFormatDate(dateNgModel_1, _this.dateFormat);
                };
            }
            else {
                dateNgModel_1.toString = function () {
                    return datetime_1.DateTime.formatDate(dateNgModel_1, _this.dateOnly);
                };
            }
            setTimeout(function () {
                _this.ngModelChange.emit(dateNgModel_1);
            });
            this._initDate();
        }
    };
    DateTimePickerDirective.prototype.ngOnDestroy = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.removeEventListener('click', this.hideDatetimePicker);
        this._el.removeEventListener('keyup', this._keyEventListener);
        if (this._datetimePicker) {
            this._datetimePicker.removeEventListener('keyup', this._keyEventListener);
        }
    };
    //show datetimePicker below the current element
    DateTimePickerDirective.prototype.showDatetimePicker = function () {
        var _this = this;
        if (this._componentRef) {
            return;
        }
        var factory = this._resolver.resolveComponentFactory(datetime_picker_component_1.DateTimePickerComponent);
        this._componentRef = this._viewContainerRef.createComponent(factory);
        this._datetimePicker = this._componentRef.location.nativeElement;
        this._datetimePicker.addEventListener('keyup', this._keyEventListener);
        this._initDate();
        this._styleDatetimePicker();
        var component = this._componentRef.instance;
        component.changes.subscribe(function (changes) {
            var newNgModel = new Date(changes.selectedDate);
            newNgModel.setHours(parseInt(changes.hour, 10));
            newNgModel.setMinutes(parseInt(changes.minute, 10));
            var formatted;
            if (_this.dateFormat) {
                formatted = datetime_1.DateTime.momentFormatDate(newNgModel, _this.dateFormat);
            }
            else {
                formatted = datetime_1.DateTime.formatDate(newNgModel, _this.dateOnly);
            }
            _this._el['value'] = formatted;
            _this._value = newNgModel;
            _this.valueChange.emit(newNgModel);
            // @deprecated
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
            if (_this.closeOnSelect !== "false") {
                _this.hideDatetimePicker();
            }
        });
    };
    DateTimePickerDirective.prototype._elementIn = function (el, containerEl) {
        while (el = el.parentNode) {
            if (el === containerEl)
                return true;
        }
        return false;
    };
    DateTimePickerDirective.prototype._initDate = function () {
        if (this._componentRef) {
            var component = this._componentRef.instance;
            component.initDateTime(this._value);
            component.dateOnly = this.dateOnly;
        }
    };
    DateTimePickerDirective.prototype._registerEventListeners = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.addEventListener('click', this.hideDatetimePicker);
        this._el.addEventListener('keyup', this._keyEventListener);
    };
    DateTimePickerDirective.prototype._styleDatetimePicker = function () {
        var _this = this;
        // setting width/height auto complete
        var thisElBCR = this._el.getBoundingClientRect();
        this._datetimePicker.style.width = thisElBCR.width + 'px';
        this._datetimePicker.style.position = 'absolute';
        this._datetimePicker.style.zIndex = '1000';
        this._datetimePicker.style.left = '0';
        this._datetimePicker.style.transition = 'height 0.3s ease-in';
        this._datetimePicker.style.visibility = 'hidden';
        setTimeout(function () {
            var thisElBcr = _this._el.getBoundingClientRect();
            var datetimePickerElBcr = _this._datetimePicker.getBoundingClientRect();
            if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) {
                // if not enough space to show on below, show above
                _this._datetimePicker.style.bottom = '0';
            }
            else {
                // otherwise, show below
                _this._datetimePicker.style.top = thisElBcr.height + 'px';
            }
            _this._datetimePicker.style.visibility = 'visible';
        });
    };
    ;
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
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DateTimePickerDirective.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.Input('value'), 
        __metadata('design:type', Object)
    ], DateTimePickerDirective.prototype, "value", void 0);
    __decorate([
        core_1.Output('valueChange'), 
        __metadata('design:type', core_1.EventEmitter)
    ], DateTimePickerDirective.prototype, "valueChange", void 0);
    DateTimePickerDirective = __decorate([
        core_1.Directive({
            selector: '[datetime-picker], [ng2-datetime-picker]',
            providers: [datetime_1.DateTime],
            host: {
                '(click)': 'showDatetimePicker()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
    ], DateTimePickerDirective);
    return DateTimePickerDirective;
}());
exports.DateTimePickerDirective = DateTimePickerDirective;
//# sourceMappingURL=datetime-picker.directive.js.map