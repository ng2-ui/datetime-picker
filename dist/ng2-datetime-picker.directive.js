"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var ng2_datetime_picker_component_1 = require('./ng2-datetime-picker.component');
var ng2_datetime_1 = require('./ng2-datetime');
function isInteger(value) {
    if (Number.isInteger) {
        return Number.isInteger(value);
    }
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
}
;
function isNaN(value) {
    if (Number.isNaN) {
        return Number.isNaN(value);
    }
    return value !== value;
}
;
/**
 * If the given string is not a valid date, it defaults back to today
 */
var Ng2DatetimePickerDirective = (function () {
    function Ng2DatetimePickerDirective(resolver, viewContainerRef, parent) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.parent = parent;
        this.closeOnSelect = true;
        this.ngModelChange = new core_1.EventEmitter();
        this.valueChanged$ = new core_1.EventEmitter();
        this.popupClosed$ = new core_1.EventEmitter();
        /* input element string value is changed */
        this.inputElValueChanged = function (date) {
            _this.setInputElDateValue(date);
            _this.el.value = date.toString();
            if (_this.ctrl) {
                _this.ctrl.patchValue(_this.el.value);
            }
            _this.ngModel = _this.el['dateValue'];
            if (_this.ngModel) {
                _this.ngModel.toString = function () { return _this.el.value; };
                _this.ngModelChange.emit(_this.ngModel);
            }
        };
        //show datetimePicker element below the current element
        this.showDatetimePicker = function (event) {
            if (_this.componentRef) {
                return;
            }
            var factory = _this.resolver.resolveComponentFactory(ng2_datetime_picker_component_1.Ng2DatetimePickerComponent);
            _this.componentRef = _this.viewContainerRef.createComponent(factory);
            _this.ng2DatetimePickerEl = _this.componentRef.location.nativeElement;
            _this.ng2DatetimePickerEl.setAttribute('tabindex', '32767');
            _this.ng2DatetimePickerEl.setAttribute('draggable', 'true');
            _this.ng2DatetimePickerEl.addEventListener('mousedown', function (event) {
                _this.clickedDatetimePicker = true;
            });
            _this.ng2DatetimePickerEl.addEventListener('mouseup', function (event) {
                _this.clickedDatetimePicker = false;
            });
            //This is for material design. MD has click event to make blur to happen
            _this.ng2DatetimePickerEl.addEventListener('click', function (event) {
                event.stopPropagation();
            });
            _this.ng2DatetimePickerEl.addEventListener('blur', function (event) {
                _this.hideDatetimePicker();
            });
            _this.ng2DatetimePickerEl.addEventListener('dragstart', _this.drag_start, false);
            document.body.addEventListener('dragover', _this.drag_over, false);
            document.body.addEventListener('drop', _this.drop, false);
            var component = _this.componentRef.instance;
            component.defaultValue = _this.defaultValue || _this.el['dateValue'];
            component.dateFormat = _this.dateFormat;
            component.dateOnly = _this.dateOnly;
            component.timeOnly = _this.timeOnly;
            component.minuteStep = _this.minuteStep;
            component.minDate = _this.minDate;
            component.maxDate = _this.maxDate;
            component.minHour = _this.minHour;
            component.maxHour = _this.maxHour;
            component.disabledDates = _this.disabledDates;
            component.showCloseButton = _this.closeOnSelect === false;
            component.showCloseLayer = _this.showCloseLayer;
            component.showWeekNumbers = _this.showWeekNumbers;
            _this.styleDatetimePicker();
            component.selected$.subscribe(_this.dateSelected);
            component.closing$.subscribe(function () {
                _this.hideDatetimePicker();
            });
            //Hack not to fire tab keyup event
            // this.justShown = true;
            // setTimeout(() => this.justShown = false, 100);
        };
        this.dateSelected = function (date) {
            _this.el.tagName === 'INPUT' && _this.inputElValueChanged(date);
            _this.valueChanged$.emit(date);
            if (_this.closeOnSelect !== false) {
                _this.hideDatetimePicker();
            }
            else {
                _this.ng2DatetimePickerEl.focus();
            }
        };
        this.hideDatetimePicker = function (event) {
            if (_this.clickedDatetimePicker) {
                return false;
            }
            else {
                setTimeout(function () {
                    if (_this.componentRef) {
                        _this.componentRef.destroy();
                        _this.componentRef = undefined;
                    }
                    _this.popupClosed$.emit(true);
                });
            }
            event && event.stopPropagation();
        };
        this.getDate = function (arg) {
            var date = arg;
            if (typeof arg === 'string') {
                date = ng2_datetime_1.Ng2Datetime.parseDate(arg, _this.parseFormat, _this.dateFormat);
            }
            return date;
        };
        this.drag_start = function (event) {
            if (document.activeElement.tagName == 'INPUT') {
                event.preventDefault();
                return false; // block dragging
            }
            var style = window.getComputedStyle(event.target, null);
            event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX)
                + ','
                + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
        };
        this.drop = function (event) {
            var offset = event.dataTransfer.getData("text/plain").split(',');
            _this.ng2DatetimePickerEl.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
            _this.ng2DatetimePickerEl.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
            _this.ng2DatetimePickerEl.style.bottom = '';
            event.preventDefault();
            return false;
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    /**
     * convert defaultValue, minDate, maxDate, minHour, and maxHour to proper types
     */
    Ng2DatetimePickerDirective.prototype.normalizeInput = function () {
        if (this.defaultValue && typeof this.defaultValue === 'string') {
            var d = ng2_datetime_1.Ng2Datetime.parseDate(this.defaultValue);
            this.defaultValue = isNaN(d.getTime()) ? new Date() : d;
        }
        if (this.minDate && typeof this.minDate == 'string') {
            var d = ng2_datetime_1.Ng2Datetime.parseDate(this.minDate);
            this.minDate = isNaN(d.getTime()) ? new Date() : d;
        }
        if (this.maxDate && typeof this.maxDate == 'string') {
            var d = ng2_datetime_1.Ng2Datetime.parseDate(this.maxDate);
            this.maxDate = isNaN(d.getTime()) ? new Date() : d;
        }
        if (this.minHour) {
            if (this.minHour instanceof Date) {
                this.minHour = this.minHour.getHours();
            }
            else {
                var hour = Number(this.minHour.toString());
                if (!isInteger(hour) || hour > 23 || hour < 0) {
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
                if (!isInteger(hour) || hour > 23 || hour < 0) {
                    this.maxHour = undefined;
                }
            }
        }
    };
    Ng2DatetimePickerDirective.prototype.ngOnInit = function () {
        var _this = this;
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
        //wrap this element with a <div> tag, so that we can position dynamic element correctly
        var wrapper = document.createElement("div");
        wrapper.className = 'ng2-datetime-picker-wrapper';
        this.el.parentElement.insertBefore(wrapper, this.el.nextSibling);
        wrapper.appendChild(this.el);
        if (this.ngModel && this.ngModel.getTime) {
            this.ngModel.toString = function () { return ng2_datetime_1.Ng2Datetime.formatDate(_this.ngModel, _this.dateFormat, _this.dateOnly); };
        }
        setTimeout(function () {
            if (_this.el.tagName === 'INPUT') {
                _this.inputElValueChanged(_this.el.value); //set this.el.dateValue and reformat this.el.value
            }
            if (_this.ctrl) {
                _this.ctrl.markAsPristine();
            }
        });
    };
    Ng2DatetimePickerDirective.prototype.ngAfterViewInit = function () {
        // if this element is not an input tag, move dropdown after input tag
        // so that it displays correctly
        this.inputEl = this.el.tagName === "INPUT" ?
            this.el : this.el.querySelector("input");
        if (this.inputEl) {
            this.inputEl.addEventListener('focus', this.showDatetimePicker);
            this.inputEl.addEventListener('blur', this.hideDatetimePicker);
        }
    };
    Ng2DatetimePickerDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var date;
        if (changes && changes['ngModel']) {
            date = changes['ngModel'].currentValue;
            if (date && typeof date !== 'string') {
                date.toString = function () { return ng2_datetime_1.Ng2Datetime.formatDate(date, _this.dateFormat, _this.dateOnly); };
                this.setInputElDateValue(date);
                this.updateDatepicker();
            }
            else if (date && typeof date === 'string') {
                /** if program assigns a string value, then format to date later */
                setTimeout(function () {
                    var dt = _this.getDate(date);
                    dt.toString = function () { return ng2_datetime_1.Ng2Datetime.formatDate(dt, _this.dateFormat, _this.dateOnly); };
                    _this.ngModel = dt;
                    _this.inputEl.value = '' + dt;
                });
            }
        }
    };
    Ng2DatetimePickerDirective.prototype.updateDatepicker = function () {
        if (this.componentRef) {
            var component = this.componentRef.instance;
            component.defaultValue = this.el['dateValue'];
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
        // this.ng2DatetimePickerEl.style.minWidth      = thisElBCR.width + 'px';
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
    Ng2DatetimePickerDirective.prototype.drag_over = function (event) {
        event.preventDefault();
        return false;
    };
    Ng2DatetimePickerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ng2-datetime-picker]',
                    providers: [ng2_datetime_1.Ng2Datetime]
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
        'parseFormat': [{ type: core_1.Input, args: ['parse-format',] },],
        'dateOnly': [{ type: core_1.Input, args: ['date-only',] },],
        'timeOnly': [{ type: core_1.Input, args: ['time-only',] },],
        'closeOnSelect': [{ type: core_1.Input, args: ['close-on-select',] },],
        'defaultValue': [{ type: core_1.Input, args: ['default-value',] },],
        'minuteStep': [{ type: core_1.Input, args: ['minute-step',] },],
        'minDate': [{ type: core_1.Input, args: ['min-date',] },],
        'maxDate': [{ type: core_1.Input, args: ['max-date',] },],
        'minHour': [{ type: core_1.Input, args: ['min-hour',] },],
        'maxHour': [{ type: core_1.Input, args: ['max-hour',] },],
        'disabledDates': [{ type: core_1.Input, args: ['disabled-dates',] },],
        'showCloseLayer': [{ type: core_1.Input, args: ['show-close-layer',] },],
        'showWeekNumbers': [{ type: core_1.Input, args: ['show-week-numbers',] },],
        'formControlName': [{ type: core_1.Input },],
        'ngModel': [{ type: core_1.Input, args: ['ngModel',] },],
        'ngModelChange': [{ type: core_1.Output, args: ['ngModelChange',] },],
        'valueChanged$': [{ type: core_1.Output, args: ['valueChanged',] },],
        'popupClosed$': [{ type: core_1.Output, args: ['popupClosed',] },],
    };
    return Ng2DatetimePickerDirective;
}());
exports.Ng2DatetimePickerDirective = Ng2DatetimePickerDirective;
//# sourceMappingURL=ng2-datetime-picker.directive.js.map