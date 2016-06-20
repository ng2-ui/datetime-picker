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
var Subject_1 = require("rxjs/Subject");
var datetime_1 = require('./datetime');
var core_2 = require("@angular/core");
//@TODO
// . display currently selected day
/**
 * show a selected date in monthly calendar
 */
var DateTimePickerComponent = (function () {
    /**
     * constructor
     */
    function DateTimePickerComponent(elementRef, dateTime, cdRef) {
        this.dateTime = dateTime;
        this.cdRef = cdRef;
        this.changes = new Subject_1.Subject();
        this.closing = new Subject_1.Subject();
        this.el = elementRef.nativeElement;
        this.initDateTime();
    }
    Object.defineProperty(DateTimePickerComponent.prototype, "year", {
        // ngAfterViewChecked() {
        //   if (this.prevHour !== this.hour && this.prevMinute !== this.minute) {
        //     this.changes.next({
        //       selectedDate: this.selectedDate,
        //       hour: this.hour,
        //       minute: this.minute
        //     });
        //     this.cdRef.detectChanges();  // https://github.com/angular/angular/issues/6005, this is silly
        //   }
        // }
        /**
         * getters
         */
        get: function () { return this.selectedDate.getFullYear(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "month", {
        get: function () { return this.selectedDate.getMonth(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "day", {
        get: function () { return this.selectedDate.getDate(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "today", {
        get: function () {
            var dt = new Date();
            dt.setHours(0);
            dt.setMinutes(0);
            dt.setSeconds(0);
            dt.setMilliseconds(0);
            return dt;
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerComponent.prototype.initDateTime = function (date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        this.selectedDate = date || new Date();
        this.hour = this.selectedDate.getHours();
        this.minute = this.selectedDate.getMinutes();
        this.monthData = this.dateTime.getMonthData(this.year, this.month);
    };
    DateTimePickerComponent.prototype.toDate = function (year, month, day) {
        return new Date(year, month, day);
    };
    DateTimePickerComponent.prototype.toDateOnly = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    };
    /**
     * set the selected date and close it when closeOnSelect is true
     * @param date {Date}
     */
    DateTimePickerComponent.prototype.selectDate = function (dayNum) {
        if (dayNum) {
            this.selectedDate = new Date(this.monthData.year, this.monthData.month, dayNum);
        }
        this.changes.next({
            selectedDate: this.selectedDate,
            hour: this.hour,
            minute: this.minute
        });
        this.closing.next(true);
    };
    ;
    /**
     * show prev/next month calendar
     */
    DateTimePickerComponent.prototype.updateMonthData = function (num) {
        this.monthData = this.dateTime.getMonthData(this.monthData.year, this.monthData.month + num);
    };
    DateTimePickerComponent = __decorate([
        core_1.Component({
            providers: [datetime_1.DateTime],
            selector: 'datetime-picker',
            moduleId: module.id,
            templateUrl: './datetime-picker.html',
            styleUrls: ['./datetime-picker.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, datetime_1.DateTime, core_2.ChangeDetectorRef])
    ], DateTimePickerComponent);
    return DateTimePickerComponent;
}());
exports.DateTimePickerComponent = DateTimePickerComponent;
//# sourceMappingURL=datetime-picker.component.js.map