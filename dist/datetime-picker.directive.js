"use strict";
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
        component.initDateTime(this.el['dateValue']);
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
            if (this.dateFormat && typeof moment !== 'undefined') {
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
            if (this.dateFormat && typeof moment !== 'undefined') {
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
    DateTimePickerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[datetime-picker], [ng2-datetime-picker]',
                    providers: [datetime_1.DateTime],
                    host: {
                        '(click)': 'showDatetimePicker()',
                        '(focus)': 'showDatetimePicker()'
                    }
                },] },
    ];
    /** @nocollapse */
    DateTimePickerDirective.ctorParameters = [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ViewContainerRef, },
        { type: forms_1.ControlContainer, decorators: [{ type: core_1.Optional }, { type: core_1.Host }, { type: core_1.SkipSelf },] },
    ];
    DateTimePickerDirective.propDecorators = {
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
    return DateTimePickerDirective;
}());
exports.DateTimePickerDirective = DateTimePickerDirective;
//# sourceMappingURL=datetime-picker.directive.js.map