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
 * If the given string is not a valid date, it defaults back to today
 */
var DateTimePickerDirective = (function () {
    function DateTimePickerDirective(resolver, viewContainerRef) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.ngModelChange = new core_1.EventEmitter();
        /* input element string value is changed */
        this.valueChanged = function (date) {
            console.log('value is changed to', date, typeof date);
            if (typeof date === 'string' && date) {
                _this.el['dateValue'] = _this.getDate(date);
            }
            else if (typeof date === 'object') {
                _this.el['dateValue'] = date;
            }
            else if (typeof date === 'undefined') {
                _this.el['dateValue'] = null;
            }
            _this.el.value = _this.getFormattedDateStr();
            _this.ngModel = _this.el['dateValue'];
            if (_this.ngModel) {
                _this.ngModel.toString = function () { return _this.el.value; };
                _this.ngModelChange.emit(_this.ngModel);
            }
        };
        this.hideDatetimePicker = function (event) {
            if (_this.componentRef) {
                if (event &&
                    event.type === 'click' &&
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
        this.keyEventListener = function (e) {
            if (e.keyCode === 27) {
                _this.hideDatetimePicker();
            }
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    DateTimePickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
        var wrapper = document.createElement("div");
        wrapper.className = 'ng2-datetime-picker';
        wrapper.style.display = 'inline-block';
        wrapper.style.position = 'relative';
        this.el.parentElement.insertBefore(wrapper, this.el.nextSibling);
        wrapper.appendChild(this.el);
        // add a click listener to document, so that it can hide when others clicked
        document.body.addEventListener('click', this.hideDatetimePicker);
        this.el.addEventListener('keyup', this.keyEventListener);
        setTimeout(function () {
            _this.valueChanged(_this.el.value);
        });
    };
    DateTimePickerDirective.prototype.ngOnChanges = function (changes) {
        var newNgModel = changes['ngModel'].currentValue;
        if (typeof newNgModel === 'string') {
            this.el['dateValue'] = this.getDate(newNgModel);
        }
        else if (newNgModel instanceof Date) {
            this.el['dateValue'] = newNgModel;
        }
    };
    DateTimePickerDirective.prototype.ngOnDestroy = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.removeEventListener('click', this.hideDatetimePicker);
        this.el.removeEventListener('keyup', this.keyEventListener);
        if (this.datetimePickerEl) {
            this.datetimePickerEl.removeEventListener('keyup', this.keyEventListener);
        }
    };
    //show datetimePicker element below the current element
    DateTimePickerDirective.prototype.showDatetimePicker = function () {
        var _this = this;
        if (this.componentRef) {
            return;
        }
        var factory = this.resolver.resolveComponentFactory(datetime_picker_component_1.DateTimePickerComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        this.datetimePickerEl = this.componentRef.location.nativeElement;
        this.datetimePickerEl.addEventListener('keyup', this.keyEventListener);
        var component = this.componentRef.instance;
        component.initDateTime(this.el['dateValue']);
        component.dateOnly = this.dateOnly;
        this.styleDatetimePicker();
        component.changes.subscribe(this.valueChanged);
        component.closing.subscribe(function () {
            _this.closeOnSelect !== "false" && _this.hideDatetimePicker();
        });
    };
    DateTimePickerDirective.prototype.elementIn = function (el, containerEl) {
        while (el = el.parentNode) {
            if (el === containerEl)
                return true;
        }
        return false;
    };
    DateTimePickerDirective.prototype.styleDatetimePicker = function () {
        var _this = this;
        // setting position, width, and height of auto complete dropdown
        var thisElBCR = this.el.getBoundingClientRect();
        this.datetimePickerEl.style.width = thisElBCR.width + 'px';
        this.datetimePickerEl.style.position = 'absolute';
        this.datetimePickerEl.style.zIndex = '1000';
        this.datetimePickerEl.style.left = '0';
        this.datetimePickerEl.style.transition = 'height 0.3s ease-in';
        this.datetimePickerEl.style.visibility = 'hidden';
        setTimeout(function () {
            var thisElBcr = _this.el.getBoundingClientRect();
            var datetimePickerElBcr = _this.datetimePickerEl.getBoundingClientRect();
            if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) {
                // if not enough space to show on below, show above
                _this.datetimePickerEl.style.bottom = '0';
            }
            else {
                // otherwise, show below
                _this.datetimePickerEl.style.top = thisElBcr.height + 'px';
            }
            _this.datetimePickerEl.style.visibility = 'visible';
        });
    };
    ;
    /**
     *  returns toString function of date object
     */
    DateTimePickerDirective.prototype.getFormattedDateStr = function () {
        if (this.el['dateValue']) {
            if (this.dateFormat) {
                return datetime_1.DateTime.momentFormatDate(this.el['dateValue'], this.dateFormat);
            }
            else {
                return datetime_1.DateTime.formatDate(this.el['dateValue'], this.dateOnly);
            }
        }
        else {
            return null;
        }
    };
    DateTimePickerDirective.prototype.getDate = function (arg) {
        var date;
        if (typeof arg === 'string') {
            if (this.dateFormat) {
                date = datetime_1.DateTime.momentParse(arg);
            }
            else {
                //remove timezone and respect day light saving time
                date = datetime_1.DateTime.parse(arg);
            }
        }
        else {
            date = arg;
        }
        return date;
    };
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
        core_1.Input('ngModel'), 
        __metadata('design:type', Object)
    ], DateTimePickerDirective.prototype, "ngModel", void 0);
    __decorate([
        core_1.Output('ngModelChange'), 
        __metadata('design:type', Object)
    ], DateTimePickerDirective.prototype, "ngModelChange", void 0);
    DateTimePickerDirective = __decorate([
        core_1.Directive({
            selector: '[datetime-picker], [ng2-datetime-picker]',
            providers: [datetime_1.DateTime],
            host: {
                '(click)': 'showDatetimePicker()',
                '(focus)': 'showDatetimePicker()',
                '(change)': 'valueChanged()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
    ], DateTimePickerDirective);
    return DateTimePickerDirective;
}());
exports.DateTimePickerDirective = DateTimePickerDirective;
//# sourceMappingURL=datetime-picker.directive.js.map