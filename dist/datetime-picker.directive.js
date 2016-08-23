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
    function DateTimePickerDirective(dcl, viewContainerRef, dateTime) {
        var _this = this;
        this.dcl = dcl;
        this.viewContainerRef = viewContainerRef;
        this.dateTime = dateTime;
        this.ngModelChange = new core_1.EventEmitter();
        this.keyEventListener = function (evt) {
            if (evt.keyCode === 27) {
                _this.hideDatetimePicker();
            }
        };
        this.hideWhenOthersClicked = function (event) {
            if (event.target === _this.el) {
            }
            else if (_this.elementIn(event.target, _this.datetimePickerEl)) {
            }
            else {
                _this.hideDatetimePicker();
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
        var dateNgModel = this.ngModel;
        if (!(this.ngModel instanceof Date || typeof this.ngModel === 'string')) {
            // console.log("datetime-picker directive requires ngModel");
            this.ngModel = this.dateTime.formatDate(new Date(), this.dateOnly);
        }
        if (typeof this.ngModel === 'string') {
            dateNgModel = this.dateTime.fromString(this.ngModel);
        }
        this.year && dateNgModel.setFullYear(this.year);
        this.month && dateNgModel.setMonth(this.month - 1);
        this.day && dateNgModel.setDate(this.day);
        this.hour && dateNgModel.setHours(this.hour);
        this.minute && dateNgModel.setMinutes(this.minute);
        // emit toString Modified(date formatted) instance
        // https://angular.io/docs/ts/latest/api/common/DatePipe-class.html
        //let newNgModel = new DatePipe().transform(dateNgModel, this.dateFormat || 'yMd HH:mm');
        setTimeout(function () {
            var newNgModel = _this.dateTime.formatDate(dateNgModel, _this.dateOnly);
            _this.ngModelChange.emit(newNgModel);
        });
        this.registerEventListeners();
    };
    DateTimePickerDirective.prototype.ngOnDestroy = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.removeEventListener('click', this.hideWhenOthersClicked);
        this.el.removeEventListener('keyup', this.keyEventListener);
    };
    DateTimePickerDirective.prototype.registerEventListeners = function () {
        // add a click listener to document, so that it can hide when others clicked
        document.body.addEventListener('click', this.hideWhenOthersClicked);
        this.el.addEventListener('keyup', this.keyEventListener);
    };
    //show datetimePicker below the current element
    DateTimePickerDirective.prototype.showDatetimePicker = function ($event) {
        var _this = this;
        this.hideDatetimePicker().then(function () {
            _this.componentRef = _this.dcl.loadNextToLocation(datetime_picker_component_1.DateTimePickerComponent, _this.viewContainerRef);
            _this.componentRef.then(function (componentRef) {
                _this.datetimePickerEl = componentRef.location.nativeElement;
                var datetimePickerEl = _this.datetimePickerEl;
                //console.log('this.keyEventListener', this.keyEventListener);
                componentRef.instance.initDateTime(_this.ngModel || new Date());
                componentRef.instance.dateOnly = _this.dateOnly;
                componentRef.instance.changes.subscribe(function (changes) {
                    changes.selectedDate.setHours(changes.hour);
                    changes.selectedDate.setMinutes(changes.minute);
                    //let newNgModel = new DatePipe().transform(changes.selectedDate, this.dateFormat || 'yMd HH:mm');
                    var newNgModel = _this.dateTime.formatDate(changes.selectedDate, _this.dateOnly);
                    _this.ngModelChange.emit(newNgModel);
                });
                componentRef.instance.closing.subscribe(function () {
                    setTimeout(function () {
                        _this.closeOnSelect !== "false" && _this.hideDatetimePicker();
                    });
                });
                /* setting width/height auto complete */
                var thisElBCR = _this.el.getBoundingClientRect();
                datetimePickerEl.style.width = thisElBCR.width + 'px';
                datetimePickerEl.style.position = 'absolute';
                datetimePickerEl.style.zIndex = '1';
                datetimePickerEl.style.left = '0';
                datetimePickerEl.style.transition = 'height 0.3s ease-in';
                datetimePickerEl.style.visibility = 'hidden';
                setTimeout(function () {
                    var thisElBcr = _this.el.getBoundingClientRect();
                    var datetimePickerElBcr = datetimePickerEl.getBoundingClientRect();
                    if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) {
                        datetimePickerEl.style.bottom = '0';
                    }
                    else {
                        datetimePickerEl.style.top = thisElBcr.height + 'px';
                    }
                    datetimePickerEl.style.visibility = 'visible';
                });
                //$event.stopPropagation();
            });
        });
    };
    DateTimePickerDirective.prototype.hideDatetimePicker = function () {
        if (this.componentRef) {
            return this.componentRef.then(function (componentRef) { return componentRef.destroy(); });
        }
        else {
            return Promise.resolve(true);
        }
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
        __metadata('design:type', String)
    ], DateTimePickerDirective.prototype, "ngModel", void 0);
    __decorate([
        //not Date, only String !!!
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
        __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ViewContainerRef, datetime_1.DateTime])
    ], DateTimePickerDirective);
    return DateTimePickerDirective;
}());
exports.DateTimePickerDirective = DateTimePickerDirective;
//# sourceMappingURL=datetime-picker.directive.js.map