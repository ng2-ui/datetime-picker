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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var datetime_picker_component_1 = require('./datetime-picker.component');
var datetime_1 = require('./datetime');
/**
 * If the given string is not a valid date, it defaults back to today
 */
var DateTimePickerDirective = (function () {
    function DateTimePickerDirective(resolver, viewContainerRef, parent) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.parent = parent;
        this.ngModelChange = new core_1.EventEmitter();
        /* input element string value is changed */
        this.valueChanged = function (date) {
            _this.setElement(date);
            _this.el.value = _this.getFormattedDateStr();
            if (_this.ctrl) {
                _this.ctrl.patchValue(_this.el.value);
            }
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
            event && event.stopPropagation();
        };
        this.keyEventListener = function (e) {
            if (e.keyCode === 27 || e.keyCode === 9 || e.keyCode === 13) {
                if (!_this.justShown) {
                    _this.hideDatetimePicker();
                }
            }
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    DateTimePickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.parent && this.parent["form"] && this.formControlName) {
            this.ctrl = this.parent["form"].get(this.formControlName);
            this.sub = this.ctrl.valueChanges.subscribe(function (date) {
                _this.setElement(date);
                _this.updateDatepicker();
            });
        }
        //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
        var wrapper = document.createElement("div");
        wrapper.className = 'ng2-datetime-picker';
        this.el.parentElement.insertBefore(wrapper, this.el.nextSibling);
        wrapper.appendChild(this.el);
        // add a click listener to document, so that it can hide when others clicked
        document.body.addEventListener('click', this.hideDatetimePicker);
        this.el.addEventListener('keyup', this.keyEventListener);
        setTimeout(function () {
            _this.valueChanged(_this.el.value);
            if (_this.ctrl) {
                _this.ctrl.markAsPristine();
            }
        });
    };
    DateTimePickerDirective.prototype.ngOnChanges = function (changes) {
        var date;
        if (changes && changes['ngModel']) {
            date = changes['ngModel'].currentValue;
        }
        this.setElement(date);
        this.updateDatepicker();
    };
    DateTimePickerDirective.prototype.updateDatepicker = function () {
        if (this.componentRef) {
            var component = this.componentRef.instance;
            component.initDateTime(this.el['dateValue']);
        }
    };
    DateTimePickerDirective.prototype.setElement = function (date) {
        if (typeof date === 'string' && date) {
            this.el['dateValue'] = this.getDate(date);
        }
        else if (typeof date === 'object') {
            this.el['dateValue'] = date;
        }
        else if (typeof date === 'undefined') {
            this.el['dateValue'] = null;
        }
        if (this.ctrl) {
            this.ctrl.markAsDirty();
        }
    };
    DateTimePickerDirective.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        document.body.removeEventListener('click', this.hideDatetimePicker);
    };
    //show datetimePicker element below the current element
    DateTimePickerDirective.prototype.showDatetimePicker = function (event) {
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
        //Hack not to fire tab keyup event
        this.justShown = true;
        setTimeout(function () { return _this.justShown = false; }, 100);
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
                _this.datetimePickerEl.style.bottom =
                    (thisElBcr.bottom - window.innerHeight + 15) + 'px';
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
                date = datetime_1.DateTime.momentParse(arg, this.dateFormat);
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
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateTimePickerDirective.prototype, "formControlName", void 0);
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
                '(focus)': 'showDatetimePicker()'
            }
        }),
        __param(2, core_1.Optional()),
        __param(2, core_1.Host()),
        __param(2, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, forms_1.ControlContainer])
    ], DateTimePickerDirective);
    return DateTimePickerDirective;
}());
exports.DateTimePickerDirective = DateTimePickerDirective;
//# sourceMappingURL=datetime-picker.directive.js.map