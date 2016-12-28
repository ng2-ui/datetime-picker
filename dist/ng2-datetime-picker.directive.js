"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var ng2_datetime_picker_component_1 = require('./ng2-datetime-picker.component');
var ng2_datetime_1 = require('./ng2-datetime');
Number.isInteger = Number.isInteger || function (value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
};
Number.isNaN = Number.isNaN || function (value) {
    return value !== value;
};
/**
 * If the given string is not a valid date, it defaults back to today
 */
var Ng2DatetimePickerDirective = (function () {
    function Ng2DatetimePickerDirective(resolver, viewContainerRef, parent) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.parent = parent;
        this.ngModelChange = new core_1.EventEmitter();
        /* input element string value is changed */
        this.valueChanged = function (date) {
            _this.setInputElDateValue(date);
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
                    !_this.elementIn(event.target, _this.ng2DatetimePickerEl)) {
                    _this.componentRef.destroy();
                    _this.componentRef = undefined;
                }
                else if (!event) {
                    _this.componentRef.destroy();
                    _this.componentRef = undefined;
                }
                event && event.stopPropagation();
            }
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
    Ng2DatetimePickerDirective.prototype.normalizeInput = function () {
        if (this.defaultValue && typeof this.defaultValue === 'string') {
            var d = ng2_datetime_1.Ng2Datetime.parseDate(this.defaultValue);
            this.defaultValue = Number.isNaN(d.getTime()) ? new Date() : d;
        }
        if (this.minDate && typeof this.minDate == 'string') {
            var d = ng2_datetime_1.Ng2Datetime.parseDate(this.minDate);
            this.minDate = Number.isNaN(d.getTime()) ? new Date() : d;
        }
        if (this.maxDate && typeof this.maxDate == 'string') {
            var d = ng2_datetime_1.Ng2Datetime.parseDate(this.minDate);
            this.maxDate = Number.isNaN(d.getTime()) ? new Date() : d;
        }
        if (this.minHour) {
            if (this.minHour instanceof Date) {
                this.minHour = this.minHour.getHours();
            }
            else {
                var hour = Number(this.minHour.toString());
                if (!Number.isInteger(hour) || hour > 23 || hour < 0) {
                    this.minHour = undefined;
                }
            }
        }
        if (this.maxHour) {
            if (this.maxHour instanceof Date) {
                this.maxHour = this.maxHour.getHours();
            }
            else {
                var hour = Number(this.maxHour.toString());
                if (!Number.isInteger(hour) || hour > 23 || hour < 0) {
                    this.maxHour = undefined;
                }
            }
        }
    };
    Ng2DatetimePickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.firstDayOfWeek) {
            ng2_datetime_1.Ng2Datetime.firstDayOfWeek = parseInt(this.firstDayOfWeek);
        }
        if (this.parent && this.formControlName) {
            if (this.parent["form"]) {
                this.ctrl = this.parent["form"].get(this.formControlName);
            }
            else if (this.parent["name"]) {
                var formDir = this.parent.formDirective;
                if (formDir instanceof forms_1.FormGroupDirective && formDir.form.get(this.parent["name"])) {
                    this.ctrl = formDir.form.get(this.parent["name"]).get(this.formControlName);
                }
            }
            if (this.ctrl) {
                this.sub = this.ctrl.valueChanges.subscribe(function (date) {
                    _this.setInputElDateValue(date);
                    _this.updateDatepicker();
                });
            }
        }
        this.normalizeInput();
        //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
        var wrapper = document.createElement("div");
        wrapper.className = 'ng2-datetime-picker-wrapper';
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
    Ng2DatetimePickerDirective.prototype.ngOnChanges = function (changes) {
        var date;
        if (changes && changes['ngModel']) {
            date = changes['ngModel'].currentValue;
        }
        this.setInputElDateValue(date);
        this.updateDatepicker();
    };
    Ng2DatetimePickerDirective.prototype.updateDatepicker = function () {
        if (this.componentRef) {
            var component = this.componentRef.instance;
            component.initDatetime(this.el['dateValue']);
        }
    };
    Ng2DatetimePickerDirective.prototype.setInputElDateValue = function (date) {
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
    Ng2DatetimePickerDirective.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        document.body.removeEventListener('click', this.hideDatetimePicker);
    };
    //show datetimePicker element below the current element
    Ng2DatetimePickerDirective.prototype.showDatetimePicker = function (event) {
        var _this = this;
        if (this.componentRef) {
            return;
        }
        var factory = this.resolver.resolveComponentFactory(ng2_datetime_picker_component_1.Ng2DatetimePickerComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        this.ng2DatetimePickerEl = this.componentRef.location.nativeElement;
        this.ng2DatetimePickerEl.addEventListener('keyup', this.keyEventListener);
        var component = this.componentRef.instance;
        component.defaultValue = this.defaultValue;
        component.dateOnly = this.dateOnly;
        component.timeOnly = this.timeOnly;
        component.minuteStep = this.minuteStep;
        component.minDate = this.minDate;
        component.maxDate = this.maxDate;
        component.minHour = this.minHour;
        component.maxHour = this.maxHour;
        component.disabledDates = this.disabledDates;
        component.firstDayOfWeek = this.firstDayOfWeek;
        component.initDatetime(this.el['dateValue']);
        this.styleDatetimePicker();
        component.selected$.subscribe(this.valueChanged);
        component.closing$.subscribe(function () {
            _this.closeOnSelect !== "false" && _this.hideDatetimePicker();
        });
        //Hack not to fire tab keyup event
        this.justShown = true;
        setTimeout(function () { return _this.justShown = false; }, 100);
    };
    Ng2DatetimePickerDirective.prototype.elementIn = function (el, containerEl) {
        while (el = el.parentNode) {
            if (el === containerEl)
                return true;
        }
        return false;
    };
    Ng2DatetimePickerDirective.prototype.styleDatetimePicker = function () {
        var _this = this;
        // setting position, width, and height of auto complete dropdown
        var thisElBCR = this.el.getBoundingClientRect();
        this.ng2DatetimePickerEl.style.width = thisElBCR.width + 'px';
        this.ng2DatetimePickerEl.style.position = 'absolute';
        this.ng2DatetimePickerEl.style.zIndex = '1000';
        this.ng2DatetimePickerEl.style.left = '0';
        this.ng2DatetimePickerEl.style.transition = 'height 0.3s ease-in';
        this.ng2DatetimePickerEl.style.visibility = 'hidden';
        setTimeout(function () {
            var thisElBcr = _this.el.getBoundingClientRect();
            var ng2DatetimePickerElBcr = _this.ng2DatetimePickerEl.getBoundingClientRect();
            if (thisElBcr.bottom + ng2DatetimePickerElBcr.height > window.innerHeight) {
                _this.ng2DatetimePickerEl.style.bottom =
                    (thisElBcr.bottom - window.innerHeight + 15) + 'px';
            }
            else {
                // otherwise, show below
                _this.ng2DatetimePickerEl.style.top = thisElBcr.height + 'px';
            }
            _this.ng2DatetimePickerEl.style.visibility = 'visible';
        });
    };
    ;
    /**
     *  returns toString function of date object
     */
    Ng2DatetimePickerDirective.prototype.getFormattedDateStr = function () {
        return ng2_datetime_1.Ng2Datetime.formatDate(this.el['dateValue'], this.dateFormat, this.dateOnly);
    };
    Ng2DatetimePickerDirective.prototype.getDate = function (arg) {
        var date = arg;
        if (typeof arg === 'string') {
            date = ng2_datetime_1.Ng2Datetime.parseDate(arg, this.dateFormat);
        }
        return date;
    };
    Ng2DatetimePickerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ng2-datetime-picker]',
                    providers: [ng2_datetime_1.Ng2Datetime],
                    host: {
                        '(click)': 'showDatetimePicker()',
                        '(focus)': 'showDatetimePicker()'
                    }
                },] },
    ];
    /** @nocollapse */
    Ng2DatetimePickerDirective.ctorParameters = [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ViewContainerRef, },
        { type: forms_1.ControlContainer, decorators: [{ type: core_1.Optional }, { type: core_1.Host }, { type: core_1.SkipSelf },] },
    ];
    Ng2DatetimePickerDirective.propDecorators = {
        'dateFormat': [{ type: core_1.Input, args: ['date-format',] },],
        'dateOnly': [{ type: core_1.Input, args: ['date-only',] },],
        'timeOnly': [{ type: core_1.Input, args: ['time-only',] },],
        'closeOnSelect': [{ type: core_1.Input, args: ['close-on-select',] },],
        'firstDayOfWeek': [{ type: core_1.Input, args: ['first-day-of-week',] },],
        'defaultValue': [{ type: core_1.Input, args: ['default-value',] },],
        'minuteStep': [{ type: core_1.Input, args: ['minute-step',] },],
        'minDate': [{ type: core_1.Input, args: ['min-date',] },],
        'maxDate': [{ type: core_1.Input, args: ['max-date',] },],
        'minHour': [{ type: core_1.Input, args: ['min-hour',] },],
        'maxHour': [{ type: core_1.Input, args: ['max-hour',] },],
        'disabledDates': [{ type: core_1.Input, args: ['disabled-dates',] },],
        'formControlName': [{ type: core_1.Input },],
        'ngModel': [{ type: core_1.Input, args: ['ngModel',] },],
        'ngModelChange': [{ type: core_1.Output, args: ['ngModelChange',] },],
    };
    return Ng2DatetimePickerDirective;
}());
exports.Ng2DatetimePickerDirective = Ng2DatetimePickerDirective;
//# sourceMappingURL=ng2-datetime-picker.directive.js.map