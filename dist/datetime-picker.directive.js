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
var common_1 = require('@angular/common');
var datetime_picker_component_1 = require("./datetime-picker.component");
var datetime_1 = require("./datetime");
/**
 * To simplify the implementation, it limits the type if ngModel to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
var DateTimePickerDirective = (function () {
    function DateTimePickerDirective(dcl, viewContainerRef, dateTime) {
        this.dcl = dcl;
        this.viewContainerRef = viewContainerRef;
        this.dateTime = dateTime;
        this.ngModelChange = new core_1.EventEmitter();
        this.el = this.viewContainerRef.element.nativeElement;
    }
    DateTimePickerDirective.prototype.ngOnInit = function () {
        //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
        var divEl = document.createElement("div");
        divEl.className = 'ng2-datetime-picker';
        divEl.style.display = 'inline-block';
        divEl.style.position = 'relative';
        this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
        divEl.appendChild(this.el);
        var dateNgModel = this.ngModel;
        if (!(this.ngModel instanceof Date || typeof this.ngModel === 'string')) {
            console.error("datetime-picker directive requires ngModel");
            this.ngModel = (new Date()).toString();
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
        var newNgModel = new common_1.DatePipe().transform(dateNgModel, this.dateFormat || 'yMd HH:mm');
        this.ngModelChange.emit(newNgModel);
    };
    //show datetimePicker below the current element
    DateTimePickerDirective.prototype.showDatetimePicker = function ($event) {
        var _this = this;
        this.hideDatetimePicker().then(function () {
            _this.componentRef = _this.dcl.loadNextToLocation(datetime_picker_component_1.DateTimePickerComponent, _this.viewContainerRef);
            _this.componentRef.then(function (componentRef) {
                _this.dtpEl = componentRef.location.nativeElement;
                var dtpEl = _this.dtpEl;
                componentRef.instance.initDateTime(_this.ngModel || new Date());
                componentRef.instance.dateOnly = _this.dateOnly;
                componentRef.instance.changes.subscribe(function (changes) {
                    changes.selectedDate.setHours(changes.hour);
                    changes.selectedDate.setMinutes(changes.minute);
                    var newNgModel = new common_1.DatePipe().transform(changes.selectedDate, _this.dateFormat || 'yMd HH:mm');
                    _this.ngModelChange.emit(newNgModel);
                });
                componentRef.instance.closing.subscribe(function () {
                    setTimeout(function () {
                        _this.closeOnSelect !== false && _this.hideDatetimePicker();
                    });
                });
                /* setting width/height auto complete */
                var thisElBCR = _this.el.getBoundingClientRect();
                dtpEl.style.width = thisElBCR.width + 'px';
                dtpEl.style.position = 'absolute';
                dtpEl.style.zIndex = '1';
                dtpEl.style.left = '0';
                setTimeout(function () {
                    var thisElBcr = _this.el.getBoundingClientRect();
                    var dtpElBcr = dtpEl.getBoundingClientRect();
                    if (thisElBcr.bottom + dtpElBcr.height > window.innerHeight) {
                        dtpEl.style.bottom = '0';
                    }
                    else {
                        dtpEl.style.top = thisElBcr.height + 'px';
                    }
                });
                $event.stopPropagation();
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
        __metadata('design:type', Boolean)
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
            selector: '[datetime-picker]',
            providers: [datetime_1.DateTime],
            host: {
                '(click)': 'showDatetimePicker($event)',
                '(blur)': 'hideDatetimePicker()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ViewContainerRef, datetime_1.DateTime])
    ], DateTimePickerDirective);
    return DateTimePickerDirective;
}());
exports.DateTimePickerDirective = DateTimePickerDirective;
//# sourceMappingURL=datetime-picker.directive.js.map