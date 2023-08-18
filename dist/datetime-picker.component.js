"use strict";
var core_1 = require('@angular/core');
var datetime_1 = require('./datetime');
//@TODO
// . display currently selected day
/**
 * show a selected date in monthly calendar
 */
var NguiDatetimePickerComponent = (function () {
    function NguiDatetimePickerComponent(elementRef, nguiDatetime, cdRef) {
        this.nguiDatetime = nguiDatetime;
        this.cdRef = cdRef;
        this.minuteStep = 1;
        this.showWeekNumbers = false;
        this.showTodayShortcut = false;
        this.showAmPm = false;
        this.useUtc = false; /* check directive */
        this.currToday = false; /* check directive */
        this.selected$ = new core_1.EventEmitter();
        this.closing$ = new core_1.EventEmitter();
        this.locale = datetime_1.NguiDatetime.locale;
        this.showYearSelector = false;
        this.el = elementRef.nativeElement;
    }
    Object.defineProperty(NguiDatetimePickerComponent.prototype, "yearsSelectable", {
        get: function () {
            var startYear = this.year - 100;
            var endYear = this.year + 50;
            var years = [];
            for (var year = startYear; year < endYear; year++) {
                years.push(year);
            }
            return years;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NguiDatetimePickerComponent.prototype, "year", {
        get: function () {
            return this.selectedDate.getFullYear();
        },
        set: function (year) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NguiDatetimePickerComponent.prototype, "month", {
        get: function () {
            return this.selectedDate.getMonth();
        },
        set: function (month) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NguiDatetimePickerComponent.prototype, "day", {
        get: function () {
            return this.selectedDate.getDate();
        },
        set: function (day) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NguiDatetimePickerComponent.prototype, "monthData", {
        get: function () {
            return this._monthData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NguiDatetimePickerComponent.prototype, "today", {
        get: function () {
            var dt = new Date();
            dt.setHours(0);
            dt.setMinutes(0);
            dt.setSeconds(0);
            dt.setMilliseconds(0);
            return dt;
        },
        set: function (today) { },
        enumerable: true,
        configurable: true
    });
    NguiDatetimePickerComponent.prototype.ngOnInit = function () {
        if (!this.defaultValue || isNaN(this.defaultValue.getTime())) {
            this.defaultValue = new Date();
        }
        this.selectedDate = this.defaultValue;
        // set hour and minute using moment if available to avoid having Javascript change timezones
        if (typeof moment === 'undefined') {
            this.hour = this.selectedDate.getHours();
            this.minute = this.selectedDate.getMinutes();
        }
        else {
            var m = moment(this.selectedDate);
            this.hour = m.hours();
            this.minute = m.minute();
        }
        this._monthData = this.nguiDatetime.getMonthData(this.year, this.month);
    };
    NguiDatetimePickerComponent.prototype.isWeekend = function (dayNum, month) {
        if (typeof month === 'undefined') {
            return datetime_1.NguiDatetime.weekends.indexOf(dayNum % 7) !== -1; //weekday index
        }
        else {
            var weekday = this.toDate(dayNum, month).getDay();
            return datetime_1.NguiDatetime.weekends.indexOf(weekday) !== -1;
        }
    };
    NguiDatetimePickerComponent.prototype.selectYear = function (year) {
        this._monthData = this.nguiDatetime.getMonthData(year, this._monthData.month);
        this.showYearSelector = false;
    };
    NguiDatetimePickerComponent.prototype.toDate = function (day, month) {
        return new Date(this._monthData.year, month || this._monthData.month, day);
    };
    NguiDatetimePickerComponent.prototype.toDateOnly = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    };
    NguiDatetimePickerComponent.prototype.selectCurrentTime = function () {
        if (this.useUtc) {
            this.hour = (new Date()).getUTCHours();
            this.minute = (new Date()).getUTCMinutes();
        }
        else {
            this.hour = (new Date()).getHours();
            this.minute = (new Date()).getMinutes();
        }
        if (this.currToday) {
            if (this.useUtc) {
                var d = new Date();
                this.selectDateTime(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
            }
            else {
                this.selectDateTime(new Date());
            }
        }
        else {
            this.selectDateTime();
        }
    };
    /**
     * set the hour and minute
     * @param hour {string}
     * @param minute {string}
     */
    NguiDatetimePickerComponent.prototype.selectTime = function (hour, minute) {
        //NOTE: must get hour & minute because 2-way binding does not work with range input in IE <= 11
        this.hour = parseInt(hour, 10) || 0;
        this.minute = parseInt(minute, 10) || 0;
        this.selectDateTime();
    };
    /**
     * set the selected date and close it when closeOnSelect is true
     * @param date {Date}
     */
    NguiDatetimePickerComponent.prototype.selectDateTime = function (date) {
        var _this = this;
        this.selectedDate = date || this.selectedDate;
        if (this.isDateDisabled(this.selectedDate)) {
            return false;
        }
        // editing hours and minutes via javascript date methods causes date to lose timezone info,
        // so edit using moment if available
        var hour = parseInt('' + this.hour || '0', 10);
        var minute = parseInt('' + this.minute || '0', 10);
        if (typeof moment !== 'undefined') {
            // here selected date has a time of 00:00 in local time,
            // so build moment by getting year/month/day separately
            // to avoid it saving as a day earlier
            var m = moment([this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()]);
            m.hours(hour);
            m.minutes(minute);
            this.selectedDate = m.toDate();
        }
        else {
            this.selectedDate.setHours(hour);
            this.selectedDate.setMinutes(minute);
        }
        //console.log('this.selectedDate', this.selectedDate)
        this.selectedDate.toString = function () {
            return datetime_1.NguiDatetime.formatDate(_this.selectedDate, _this.dateFormat, _this.dateOnly);
        };
        this.selected$.emit(this.selectedDate);
    };
    ;
    /**
     * show prev/next month calendar
     */
    NguiDatetimePickerComponent.prototype.updateMonthData = function (num) {
        this._monthData = this.nguiDatetime.getMonthData(this._monthData.year, this._monthData.month + num);
    };
    NguiDatetimePickerComponent.prototype.isDateDisabled = function (date) {
        var dateInTime = date.getTime();
        this.disabledDatesInTime =
            this.disabledDatesInTime || (this.disabledDates || []).map(function (d) { return d.getTime(); });
        if (this.minDate && (dateInTime < this.minDate.getTime())) {
            return true;
        }
        else if (this.maxDate && (dateInTime > this.maxDate.getTime())) {
            return true;
        }
        else if (this.disabledDatesInTime.indexOf(dateInTime) >= 0) {
            return true;
        }
        return false;
    };
    NguiDatetimePickerComponent.prototype.close = function () {
        this.closing$.emit(true);
    };
    NguiDatetimePickerComponent.prototype.selectToday = function () {
        this.selectDateTime(new Date());
    };
    NguiDatetimePickerComponent.prototype.convertHours = function (hours) {
        if (this.showAmPm) {
            this.timeSuffix = (hours >= 12) ? 'PM' : 'AM';
            hours = (hours == 0) ? 12 : (hours > 12) ? hours - 12 : hours;
        }
        else {
            this.timeSuffix = null;
        }
        return ("0" + hours).slice(-2);
    };
    NguiDatetimePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [datetime_1.NguiDatetime],
                    selector: 'ngui-datetime-picker',
                    template: "\n  <div class=\"closing-layer\" (click)=\"close()\" *ngIf=\"showCloseLayer\" ></div>\n  <div class=\"ngui-datetime-picker\">\n    <div class=\"close-button\" *ngIf=\"showCloseButton\" (click)=\"close()\"></div>\n    \n    <!-- Month - Year  -->\n    <div class=\"month\" *ngIf=\"!timeOnly\">\n      <b class=\"prev_next prev year\" (click)=\"updateMonthData(-12)\">&laquo;</b>\n      <b class=\"prev_next prev month\" (click)=\"updateMonthData(-1)\">&lsaquo;</b>\n       <span title=\"{{monthData?.fullName}}\">\n         {{monthData?.shortName}}\n       </span>\n       <span (click)=\"showYearSelector = true\">\n        {{monthData.year}}\n       </span>\n      <b class=\"prev_next next year\" (click)=\"updateMonthData(+12)\">&raquo;</b>\n      <b class=\"prev_next next month\" (click)=\"updateMonthData(+1)\">&rsaquo;</b>\n    </div>\n\n    <!-- Week number / Days  -->\n    <div class=\"week-numbers-and-days\"\n      [ngClass]=\"{'show-week-numbers': !timeOnly && showWeekNumbers}\">\n      <!-- Week -->\n      <div class=\"week-numbers\" *ngIf=\"!timeOnly && showWeekNumbers\">\n        <div class=\"week-number\" *ngFor=\"let weekNumber of monthData.weekNumbers\">\n          {{weekNumber}}\n        </div>\n      </div>\n      \n      <!-- Date -->\n      <div class=\"days\" *ngIf=\"!timeOnly\">\n\n        <!-- Su Mo Tu We Th Fr Sa -->\n        <div class=\"day-of-week\"\n             *ngFor=\"let dayOfWeek of monthData.localizedDaysOfWeek; let ndx=index\"\n             [class.weekend]=\"isWeekend(ndx + monthData.firstDayOfWeek)\"\n             title=\"{{dayOfWeek.fullName}}\">\n          {{dayOfWeek.shortName}}\n        </div>\n\n        <!-- Fill up blank days for this month -->\n        <div *ngIf=\"monthData.leadingDays.length < 7\">\n          <div class=\"day\"\n              (click)=\"updateMonthData(-1)\"\n               *ngFor=\"let dayNum of monthData.leadingDays\">\n            {{dayNum}}\n          </div>\n        </div>\n\n        <div class=\"day\"\n             *ngFor=\"let dayNum of monthData.days\"\n             (click)=\"selectDateTime(toDate(dayNum))\"\n             title=\"{{monthData.year}}-{{monthData.month+1}}-{{dayNum}}\"\n             [ngClass]=\"{\n               selectable: !isDateDisabled(toDate(dayNum)),\n               selected: toDate(dayNum).getTime() === toDateOnly(selectedDate).getTime(),\n               today: toDate(dayNum).getTime() === today.getTime(),\n               weekend: isWeekend(dayNum, monthData.month)\n             }\">\n          {{dayNum}}\n        </div>\n\n        <!-- Fill up blank days for this month -->\n        <div *ngIf=\"monthData.trailingDays.length < 7\">\n          <div class=\"day\"\n               (click)=\"updateMonthData(+1)\"\n               *ngFor=\"let dayNum of monthData.trailingDays\">\n            {{dayNum}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"shortcuts\" *ngIf=\"showTodayShortcut\">\n      <a href=\"#\" (click)=\"selectToday()\">Today</a>\n    </div>\n\n    <!-- Hour Minute -->\n    <div class=\"time\" id=\"time\" *ngIf=\"!dateOnly\">\n      <div class=\"select-current-time\" (click)=\"selectCurrentTime()\">{{locale.currentTime}}</div>\n      <label class=\"timeLabel\">{{locale.time}}</label>\n      <span class=\"timeValue\">\n        {{convertHours(hour)}} : {{(\"0\"+minute).slice(-2)}} {{timeSuffix}}\n      </span><br/>\n      <div>\n        <label class=\"hourLabel\">{{locale.hour}}:</label>\n        <input #hours class=\"hourInput\"\n               tabindex=\"90000\"\n               (change)=\"selectTime(hours.value, minutes.value)\"\n               type=\"range\"\n               min=\"{{minHour || 0}}\"\n               max=\"{{maxHour || 23}}\"\n               [(ngModel)]=\"hour\" />\n      </div>\n      <div>\n        <label class=\"minutesLabel\">{{locale.minute}}:</label>\n        <input #minutes class=\"minutesInput\"\n               tabindex=\"90000\"\n               step=\"{{minuteStep}}\"\n               (change)=\"selectTime(hours.value, minutes.value)\"\n               type=\"range\" min=\"0\" max=\"59\" range=\"10\" [(ngModel)]=\"minute\"/>\n      </div>\n    </div>\n\n    <!-- Year Selector -->\n    <div class=\"year-selector\" *ngIf=\"showYearSelector\">\n      <div class=\"locale\">\n        <b>{{locale.year}}</b>\n      </div>\n      <span class=\"year\" \n        *ngFor=\"let year of yearsSelectable\"\n        (click)=\"selectYear(year)\">\n        {{year}}\n      </span>\n    </div>\n  </div>\n  ",
                    styles: [
                        "\n@keyframes slideDown {\n  0% {\n    transform:  translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n@keyframes slideUp {\n  0% {\n    transform: translateY(100%);\n  }\n  100% {\n    transform: translateY(0%);\n  }\n}\n\n.ngui-datetime-picker-wrapper {\n  position: relative;\n}\n\n.ngui-datetime-picker {\n  color: #333;\n  outline-width: 0;\n  font: normal 14px sans-serif;\n  border: 1px solid #ddd;\n  display: inline-block;\n  background: #fff;\n  animation: slideDown 0.1s ease-in-out;\n  animation-fill-mode: both;\n}\n.ngui-datetime-picker .days {\n  width: 210px; /* 30 x 7 days */\n  box-sizing: content-box;\n}\n.ngui-datetime-picker .close-button {\n  position: absolute;\n  width: 1em;\n  height: 1em;\n  right: 0;\n  z-index: 1;\n  padding: 0 5px;\n  box-sizing: content-box;\n}\n.ngui-datetime-picker .close-button:before {\n  content: 'X';\n  cursor: pointer;\n  color: #ff0000;\n}\n.ngui-datetime-picker > .month {\n  text-align: center;\n  line-height: 22px;\n  padding: 10px;\n  background: #fcfcfc;\n  text-transform: uppercase;\n  font-weight: bold;\n  border-bottom: 1px solid #ddd;\n  position: relative;\n}\n\n.ngui-datetime-picker > .month > .prev_next {\n  color: #555;\n  display: block;\n  font: normal 24px sans-serif;\n  outline: none;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  width: 25px;\n  text-align: center;\n  box-sizing: content-box;\n}\n.ngui-datetime-picker > .month > .prev_next:hover {\n  background-color: #333;\n  color: #fff;\n}\n.ngui-datetime-picker > .month > .prev_next.prev {\n  float: left;\n}\n.ngui-datetime-picker > .month > .prev_next.next {\n  float: right;\n}\n\n.ngui-datetime-picker .week-numbers-and-days {\n  text-align: center;\n}\n.ngui-datetime-picker .week-numbers {\n  line-height: 30px;\n  display: inline-block;\n  padding: 30px 0 0 0;\n  color: #ddd;\n  text-align: right;\n  width: 21px;\n  vertical-align: top;\n  box-sizing: content-box;\n}\n\n.ngui-datetime-picker  .days {\n  display: inline-block;\n  width: 210px; /* 30 x 7 */\n  text-align: center;\n  padding: 0 10px;\n  box-sizing: content-box;\n}\n.ngui-datetime-picker .days .day-of-week,\n.ngui-datetime-picker .days .day {\n  box-sizing: border-box;\n  border: 1px solid transparent;\n  width: 30px;\n  line-height: 28px;\n  float: left;\n}\n.ngui-datetime-picker .days .day-of-week {\n  font-weight: bold;\n}\n.ngui-datetime-picker .days .day-of-week.weekend {\n  color: #ccc;\n  background-color: inherit;\n}\n.ngui-datetime-picker .days .day:not(.selectable) {\n  color: #ccc;\n  cursor: default;\n}\n.ngui-datetime-picker .days .weekend {\n  color: #ccc;\n  background-color: #eee;\n}\n.ngui-datetime-picker .days .day.selectable  {\n  cursor: pointer;\n}\n.ngui-datetime-picker .days .day.selected {\n  background: gray;\n  color: #fff;\n}\n.ngui-datetime-picker .days .day:not(.selected).selectable:hover {\n  background: #eee;\n}\n.ngui-datetime-picker .days:after {\n  content: '';\n  display: block;\n  clear: left;\n  height: 0;\n}\n.ngui-datetime-picker .time {\n  position: relative;\n  padding: 10px;\n  text-transform: Capitalize;\n}\n.ngui-datetime-picker .year-selector {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: #fff;\n  height: 100%;\n  overflow: auto; \n  padding: 5px;\n  z-index: 2;\n}\n.ngui-datetime-picker .year-selector .locale{\n  text-align: center;\n}\n.ngui-datetime-picker .year-selector .year {\n  display: inline-block;\n  cursor: pointer;\n  padding: 2px 5px;\n}\n.ngui-datetime-picker .year-selector .year:hover {\n  background-color: #ddd;\n}\n.ngui-datetime-picker .select-current-time {\n  position: absolute;\n  top: 1em;\n  right: 5px;\n  z-index: 1;\n  cursor: pointer;\n  color: #0000ff;\n}\n.ngui-datetime-picker .hourLabel,\n.ngui-datetime-picker .minutesLabel {\n  display: inline-block;\n  width: 45px;\n  vertical-align: top;\n  box-sizing: content-box;\n}\n.closing-layer {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0,0,0,0);\n}\n\n.ngui-datetime-picker .shortcuts {\n  padding: 10px;\n  text-align: center;\n}\n\n.ngui-datetime-picker .shortcuts a {\n  font-family: Sans-serif;\n  margin: 0 0.5em;\n  text-decoration: none;\n}\n\n@media (max-width: 767px) {\n  .ngui-datetime-picker {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;    \n    width: auto !important;\n    animation: slideUp 0.1s ease-in-out;\n  }\n\n  .ngui-datetime-picker > .days {\n    display: block;\n    margin: 0 auto;\n  }\n\n  .closing-layer {\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    background: rgba(0,0,0,0.2);\n  }\n}\n  "
                    ],
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NguiDatetimePickerComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: datetime_1.NguiDatetime, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    NguiDatetimePickerComponent.propDecorators = {
        'dateFormat': [{ type: core_1.Input, args: ['date-format',] },],
        'dateOnly': [{ type: core_1.Input, args: ['date-only',] },],
        'timeOnly': [{ type: core_1.Input, args: ['time-only',] },],
        'selectedDate': [{ type: core_1.Input, args: ['selected-date',] },],
        'hour': [{ type: core_1.Input, args: ['hour',] },],
        'minute': [{ type: core_1.Input, args: ['minute',] },],
        'minuteStep': [{ type: core_1.Input, args: ['minuteStep',] },],
        'defaultValue': [{ type: core_1.Input, args: ['default-value',] },],
        'minDate': [{ type: core_1.Input, args: ['min-date',] },],
        'maxDate': [{ type: core_1.Input, args: ['max-date',] },],
        'minHour': [{ type: core_1.Input, args: ['min-hour',] },],
        'maxHour': [{ type: core_1.Input, args: ['max-hour',] },],
        'disabledDates': [{ type: core_1.Input, args: ['disabled-dates',] },],
        'showCloseButton': [{ type: core_1.Input, args: ['show-close-button',] },],
        'showCloseLayer': [{ type: core_1.Input, args: ['show-close-layer',] },],
        'showWeekNumbers': [{ type: core_1.Input, args: ['show-week-numbers',] },],
        'showTodayShortcut': [{ type: core_1.Input, args: ['show-today-shortcut',] },],
        'showAmPm': [{ type: core_1.Input, args: ['show-am-pm',] },],
        'useUtc': [{ type: core_1.Input, args: ['use-utc',] },],
        'currToday': [{ type: core_1.Input, args: ['current-is-today',] },],
        'selected$': [{ type: core_1.Output, args: ['selected$',] },],
        'closing$': [{ type: core_1.Output, args: ['closing$',] },],
        'hours': [{ type: core_1.ViewChild, args: ['hours',] },],
        'minutes': [{ type: core_1.ViewChild, args: ['minutes',] },],
    };
    return NguiDatetimePickerComponent;
}());
exports.NguiDatetimePickerComponent = NguiDatetimePickerComponent;
//# sourceMappingURL=datetime-picker.component.js.map