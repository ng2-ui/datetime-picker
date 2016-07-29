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
    }
    Object.defineProperty(DateTimePickerComponent.prototype, "year", {
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
        console.log('initDateTime', date, typeof date);
        if (typeof date === 'string') {
            date = this.dateTime.fromString(date);
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
        console.log('dayNum', dayNum);
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
            template: "\n<div class=\"datetime-picker\">\n\n  <!-- Month - Year  -->\n  <div class=\"month\">\n    <button type=\"button\" class=\"prev\" (click)=\"updateMonthData(-1)\">&laquo;</button>\n     <span title=\"{{dateTime.months[monthData.month].fullName}}\">\n           {{dateTime.months[monthData.month].shortName}}\n     </span>\n    {{monthData.year}}\n    <button type=\"button\" class=\"next\" (click)=\"updateMonthData(+1)\">&raquo;</button>\n  </div>\n\n  <div class=\"days\">\n\n    <!-- Su Mo Tu We Th Fr Sa -->\n    <div class=\"day-of-week\"\n         *ngFor=\"let dayOfWeek of dateTime.localizedDaysOfWeek\"\n         [ngClass]=\"{weekend: dayOfWeek.weekend}\"\n         title=\"{{dayOfWeek.fullName}}\">\n      {{dayOfWeek.shortName}}\n    </div>\n\n    <!-- Fill up blank days for this month -->\n    <div *ngIf=\"monthData.leadingDays.length < 7\">\n      <div class=\"day\" *ngFor=\"let dayNum of monthData.leadingDays\"\n           [ngClass]=\"{weekend: [0,6].indexOf(toDate(monthData.year, monthData.month-1, dayNum).getDay()) !== -1}\">\n        {{dayNum}}\n      </div>\n    </div>\n\n    <div class=\"day selectable\"\n         *ngFor=\"let dayNum of monthData.days\"\n         (click)=\"selectDate(dayNum)\"\n         title=\"{{monthData.year}}-{{monthData.month+1}}-{{dayNum}}\"\n         [ngClass]=\"{\n           selected:\n             toDate(monthData.year, monthData.month, dayNum).getTime() === toDateOnly(selectedDate).getTime(),\n           today:\n             toDate(monthData.year, monthData.month, dayNum).getTime() === today.getTime(),\n           weekend:\n             [0,6].indexOf(toDate(monthData.year, monthData.month, dayNum).getDay()) !== -1\n         }\">\n      {{dayNum}}\n    </div>\n\n    <!-- Fill up blank days for this month -->\n    <div *ngIf=\"monthData.trailingDays.length < 7\">\n      <div class=\"day\"\n           *ngFor=\"let dayNum of monthData.trailingDays\"\n           [ngClass]=\"{weekend: [0,6].indexOf(toDate(monthData.year, monthData.month+1, dayNum).getDay()) !== -1}\">\n        {{dayNum}}\n      </div>\n    </div>\n  </div>\n\n  <!-- Time -->\n  <div class=\"days\" id=\"time\" *ngIf=\"!dateOnly\">\n    <label class=\"timeLabel\">Time:</label>\n    <span class=\"timeValue\">\n      {{(\"0\"+hour).slice(-2)}} : {{(\"0\"+minute).slice(-2)}}\n    </span><br/>\n    <label class=\"hourLabel\">Hour:</label>\n    <input class=\"hourInput\"\n           (change)=\"selectDate()\"\n           type=\"range\" min=\"0\" max=\"23\" [(ngModel)]=\"hour\" />\n    <label class=\"minutesLabel\">Min:</label>\n    <input class=\"minutesInput\"\n           (change)=\"selectDate()\"\n           type=\"range\" min=\"0\" max=\"59\" range=\"10\" [(ngModel)]=\"minute\"/>\n  </div>\n</div>\n\n<!--<hr/>-->\n<!--Date: {{selectedDate}}<br/>-->\n<!--Hour: {{hour}} Minute: {{minute}}<br/>-->\n  ",
            styles: ["\n @keyframes slideDown {\n  0% {\n    transform:  translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n.datetime-picker {\n    color: #333;\n    font: normal 14px sans-serif;\n    border: 1px solid #ddd;\n    display: inline-block;\n    background: #fff;\n    animation: slideDown 0.1s ease-in-out;\n    animation-fill-mode: both;\n}\n.datetime-picker > .month {\n    text-align: center;\n    line-height: 22px;\n    padding: 10px;\n    background: #fcfcfc;\n    text-transform: uppercase;\n    font-weight: bold;\n    border-bottom: 1px solid #ddd;\n    position: relative;\n}\n.datetime-picker > .month > button {\n    color: #555;\n    font: normal 14px sans-serif;\n    outline: none;\n    position: absolute;\n    background: transparent;\n    border: none;\n    cursor: pointer;\n}\n.datetime-picker > .month > button:hover {\n    color: #333;\n}\n.datetime-picker > .month > button.prev {\n    left: 10px;\n}\n.datetime-picker > .month > button.next {\n    right: 10px;\n}\n.datetime-picker > .days {\n    width: 210px; /* 30 x 7 */\n    margin: 10px;\n    text-align: center;\n}\n.datetime-picker > .days .day-of-week,\n.datetime-picker > .days .day {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    border: 1px solid transparent;\n    width: 30px;\n    line-height: 28px;\n    float: left;\n}\n.datetime-picker > .days .day-of-week {\n    font-weight: bold;\n}\n.datetime-picker > .days .day-of-week.weekend {\n    color: #ccc;\n    background-color: inherit;\n}\n.datetime-picker > .days .day:not(.selectable) {\n    color: #ccc;\n    cursor: default;\n}\n.datetime-picker > .days .weekend {\n    color: #ccc;\n    background-color: #eee;\n}\n.datetime-picker > .days .day.selectable  {\n    cursor: pointer;\n}\n.datetime-picker > .days .day.selected {\n    background: gray;\n    color: #fff;\n}\n.datetime-picker > .days .day:not(.selected).selectable:hover {\n    background: #eee;\n}\n.datetime-picker > .days:after {\n    content: '';\n    display: block;\n    clear: left;\n    height: 0;\n}\n.datetime-picker .hourLabel,\n.datetime-picker .minutesLabel {\n    display: inline-block;\n    width: 40px;\n    text-align: right;\n}\n.datetime-picker input[type=range] {\n    width: 150px;\n}\n  "],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, datetime_1.DateTime, core_1.ChangeDetectorRef])
    ], DateTimePickerComponent);
    return DateTimePickerComponent;
}());
exports.DateTimePickerComponent = DateTimePickerComponent;
//# sourceMappingURL=datetime-picker.component.js.map