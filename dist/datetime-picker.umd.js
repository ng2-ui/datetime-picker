(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["datetime-picker"] = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"));
	else
		root["datetime-picker"] = factory(root["@angular/core"], root["@angular/forms"], root["@angular/common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var datetime_1 = __webpack_require__(1);
	exports.NguiDatetime = datetime_1.NguiDatetime;
	var datetime_picker_component_1 = __webpack_require__(3);
	exports.NguiDatetimePickerComponent = datetime_picker_component_1.NguiDatetimePickerComponent;
	var datetime_picker_directive_1 = __webpack_require__(4);
	exports.NguiDatetimePickerDirective = datetime_picker_directive_1.NguiDatetimePickerDirective;
	var datetime_picker_module_1 = __webpack_require__(6);
	exports.NguiDatetimePickerModule = datetime_picker_module_1.NguiDatetimePickerModule;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	/**
	 * Static variables that you can override
	 *   1. days.           default 1,2,....31
	 *   2. daysOfWeek,     default Sunday, Monday, .....
	 *   3. firstDayOfWeek, default 0 as in Sunday
	 *   4. months,         default January, February
	 *   5. formatDate(d)   default returns YYYY-MM-DD HH:MM
	 *   6. parseDate(str)  default returns date from YYYY-MM-DD HH:MM
	 */
	var NguiDatetime = (function () {
	    function NguiDatetime() {
	    }
	    NguiDatetime.formatDate = function (d, format, dateOnly) {
	        var ret;
	        if (d && !format) {
	            // return d.toLocaleString('en-us', hash); // IE11 does not understand this
	            var pad0 = function (number) { return ("0" + number).slice(-2); };
	            ret = d.getFullYear() + '-' + pad0(d.getMonth() + 1) + '-' + pad0(d.getDate());
	            ret += dateOnly ? '' : ' ' + pad0(d.getHours()) + ':' + pad0(d.getMinutes());
	            return ret;
	        }
	        else if (d && typeof moment !== 'undefined') {
	            return moment(d).format(format);
	        }
	        else {
	            return '';
	        }
	    };
	    NguiDatetime.parseDate = function (dateStr, parseFormat, dateFormat) {
	        if (typeof moment === 'undefined') {
	            dateStr = NguiDatetime.removeTimezone(dateStr);
	            dateStr = dateStr + NguiDatetime.addDSTOffset(dateStr);
	            return NguiDatetime.parseFromDefaultFormat(dateStr);
	        }
	        else if (dateFormat || parseFormat) {
	            // try parse using each format because changing format programmatically calls this twice,
	            // once with string in parse format and once in date format
	            var formats = [];
	            if (parseFormat) {
	                formats.push(parseFormat);
	            }
	            if (dateFormat) {
	                formats.push(dateFormat);
	            }
	            var m = moment(dateStr, formats);
	            var date = m.toDate();
	            if (!m.isValid()) {
	                date = moment(dateStr, moment.ISO_8601).toDate(); // parse as ISO format
	            }
	            return date;
	        }
	        else if (dateStr.length > 4) {
	            var date = moment(dateStr, 'YYYY-MM-DD HH:mm').toDate();
	            return date;
	        }
	        else {
	            return new Date();
	        }
	    };
	    NguiDatetime.getWeekNumber = function (date) {
	        if (!(date instanceof Date))
	            date = new Date();
	        // ISO week date weeks start on Monday, so correct the day number
	        var nDay = (date.getDay() + 6) % 7;
	        // ISO 8601 states that week 1 is the week with the first Thursday of that year
	        // Set the target date to the Thursday in the target week
	        date.setDate(date.getDate() - nDay + 3);
	        // Store the millisecond value of the target date
	        var n1stThursday = date.valueOf();
	        // Set the target to the first Thursday of the year
	        // First, set the target to January 1st
	        date.setMonth(0, 1);
	        // Not a Thursday? Correct the date to the next Thursday
	        if (date.getDay() !== 4) {
	            date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
	        }
	        // The week number is the number of weeks between the first Thursday of the year
	        // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
	        return 1 + Math.ceil((n1stThursday - date) / 604800000);
	    };
	    //remove timezone
	    NguiDatetime.removeTimezone = function (dateStr) {
	        // if no time is given, add 00:00:00 at the end
	        var matches = dateStr.match(/[0-9]{2}:/);
	        dateStr += matches ? '' : ' 00:00:00';
	        return dateStr.replace(/([0-9]{2}-[0-9]{2})-([0-9]{4})/, '$2-$1') //mm-dd-yyyy to yyyy-mm-dd
	            .replace(/([\/-][0-9]{2,4})\ ([0-9]{2}\:[0-9]{2}\:)/, '$1T$2') //reformat for FF
	            .replace(/EDT|EST|CDT|CST|MDT|PDT|PST|UT|GMT/g, '') //remove timezone
	            .replace(/\s*\(\)\s*/, '') //remove timezone
	            .replace(/[\-\+][0-9]{2}:?[0-9]{2}$/, '') //remove timezone
	            .replace(/000Z$/, '00'); //remove timezone
	    };
	    NguiDatetime.addDSTOffset = function (dateStr) {
	        var date = NguiDatetime.parseFromDefaultFormat(dateStr);
	        var jan = new Date(date.getFullYear(), 0, 1);
	        var jul = new Date(date.getFullYear(), 6, 1);
	        var stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	        var isDST = date.getTimezoneOffset() < stdTimezoneOffset;
	        var offset = isDST ? stdTimezoneOffset - 60 : stdTimezoneOffset;
	        var diff = offset >= 0 ? '-' : '+';
	        offset = Math.abs(offset);
	        return diff +
	            ('0' + (offset / 60)).slice(-2) + ':' +
	            ('0' + (offset % 60)).slice(-2);
	    };
	    ;
	    NguiDatetime.parseFromDefaultFormat = function (dateStr) {
	        var tmp = dateStr.split(/[\+\-:\ T]/); // split by dash, colon or space
	        return new Date(parseInt(tmp[0], 10), parseInt(tmp[1], 10) - 1, parseInt(tmp[2], 10), parseInt(tmp[3] || '0', 10), parseInt(tmp[4] || '0', 10), parseInt(tmp[5] || '0', 10));
	    };
	    NguiDatetime.prototype.getMonthData = function (year, month) {
	        year = month > 11 ? year + 1 :
	            month < 0 ? year - 1 : year;
	        month = (month + 12) % 12;
	        var firstDayOfMonth = new Date(year, month, 1);
	        var lastDayOfMonth = new Date(year, month + 1, 0);
	        var lastDayOfPreviousMonth = new Date(year, month, 0);
	        var daysInMonth = lastDayOfMonth.getDate();
	        var daysInLastMonth = lastDayOfPreviousMonth.getDate();
	        var dayOfWeek = firstDayOfMonth.getDay();
	        // Ensure there are always leading days to give context
	        var leadingDays = (dayOfWeek - NguiDatetime.firstDayOfWeek + 7) % 7 || 7;
	        var trailingDays = NguiDatetime.days.slice(0, 6 * 7 - (leadingDays + daysInMonth));
	        if (trailingDays.length > 7) {
	            trailingDays = trailingDays.slice(0, trailingDays.length - 7);
	        }
	        var firstDay = new Date(firstDayOfMonth);
	        firstDay.setDate(firstDayOfMonth.getDate() - (leadingDays % 7));
	        var firstWeekNumber = NguiDatetime.getWeekNumber(firstDay);
	        var numWeeks = Math.ceil((daysInMonth + leadingDays % 7) / 7);
	        var weekNumbers = Array(numWeeks).fill(0).map(function (el, ndx) {
	            var weekNum = (ndx + firstWeekNumber + 52) % 52;
	            return weekNum === 0 ? 52 : weekNum;
	        });
	        var localizedDaysOfWeek = NguiDatetime.daysOfWeek
	            .concat(NguiDatetime.daysOfWeek)
	            .splice(NguiDatetime.firstDayOfWeek, 7);
	        var monthData = {
	            year: year,
	            month: month,
	            weekends: NguiDatetime.weekends,
	            firstDayOfWeek: NguiDatetime.firstDayOfWeek,
	            fullName: NguiDatetime.months[month].fullName,
	            shortName: NguiDatetime.months[month].shortName,
	            localizedDaysOfWeek: localizedDaysOfWeek,
	            days: NguiDatetime.days.slice(0, daysInMonth),
	            leadingDays: NguiDatetime.days.slice(-leadingDays - (31 - daysInLastMonth), daysInLastMonth),
	            trailingDays: trailingDays,
	            weekNumbers: weekNumbers
	        };
	        return monthData;
	    };
	    NguiDatetime.locale = {
	        date: 'date',
	        time: 'time',
	        year: 'year',
	        month: 'month',
	        day: 'day',
	        hour: 'hour',
	        minute: 'minute',
	        currentTime: "current time"
	    };
	    NguiDatetime.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
	    NguiDatetime.weekends = [0, 6];
	    NguiDatetime.daysOfWeek = typeof moment === 'undefined' ? [
	        { fullName: 'Sunday', shortName: 'Su' },
	        { fullName: 'Monday', shortName: 'Mo' },
	        { fullName: 'Tuesday', shortName: 'Tu' },
	        { fullName: 'Wednesday', shortName: 'We' },
	        { fullName: 'Thursday', shortName: 'Th' },
	        { fullName: 'Friday', shortName: 'Fr' },
	        { fullName: 'Saturday', shortName: 'Sa' }
	    ] : moment.weekdays().map(function (el, index) {
	        return {
	            fullName: el,
	            shortName: moment.weekdaysShort()[index].substr(0, 2)
	        };
	    });
	    NguiDatetime.firstDayOfWeek = typeof moment === 'undefined' ? 0 : moment.localeData().firstDayOfWeek();
	    NguiDatetime.months = typeof moment === 'undefined' ? [
	        { fullName: 'January', shortName: 'Jan' },
	        { fullName: 'February', shortName: 'Feb' },
	        { fullName: 'March', shortName: 'Mar' },
	        { fullName: 'April', shortName: 'Apr' },
	        { fullName: 'May', shortName: 'May' },
	        { fullName: 'June', shortName: 'Jun' },
	        { fullName: 'July', shortName: 'Jul' },
	        { fullName: 'August', shortName: 'Aug' },
	        { fullName: 'September', shortName: 'Sep' },
	        { fullName: 'October', shortName: 'Oct' },
	        { fullName: 'November', shortName: 'Nov' },
	        { fullName: 'December', shortName: 'Dec' }
	    ] : moment.months().map(function (el, index) {
	        return {
	            fullName: el,
	            shortName: moment['monthsShort']()[index]
	        };
	    });
	    NguiDatetime = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NguiDatetime);
	    return NguiDatetime;
	}());
	exports.NguiDatetime = NguiDatetime;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var datetime_1 = __webpack_require__(1);
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
	        this.hour = (new Date()).getHours();
	        this.minute = (new Date()).getMinutes();
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
	    __decorate([
	        core_1.Input('date-format'), 
	        __metadata('design:type', String)
	    ], NguiDatetimePickerComponent.prototype, "dateFormat", void 0);
	    __decorate([
	        core_1.Input('date-only'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerComponent.prototype, "dateOnly", void 0);
	    __decorate([
	        core_1.Input('time-only'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerComponent.prototype, "timeOnly", void 0);
	    __decorate([
	        core_1.Input('selected-date'), 
	        __metadata('design:type', Date)
	    ], NguiDatetimePickerComponent.prototype, "selectedDate", void 0);
	    __decorate([
	        core_1.Input('hour'), 
	        __metadata('design:type', Number)
	    ], NguiDatetimePickerComponent.prototype, "hour", void 0);
	    __decorate([
	        core_1.Input('minute'), 
	        __metadata('design:type', Number)
	    ], NguiDatetimePickerComponent.prototype, "minute", void 0);
	    __decorate([
	        core_1.Input('minuteStep'), 
	        __metadata('design:type', Number)
	    ], NguiDatetimePickerComponent.prototype, "minuteStep", void 0);
	    __decorate([
	        core_1.Input('default-value'), 
	        __metadata('design:type', Date)
	    ], NguiDatetimePickerComponent.prototype, "defaultValue", void 0);
	    __decorate([
	        core_1.Input('min-date'), 
	        __metadata('design:type', Date)
	    ], NguiDatetimePickerComponent.prototype, "minDate", void 0);
	    __decorate([
	        core_1.Input('max-date'), 
	        __metadata('design:type', Date)
	    ], NguiDatetimePickerComponent.prototype, "maxDate", void 0);
	    __decorate([
	        core_1.Input('min-hour'), 
	        __metadata('design:type', Number)
	    ], NguiDatetimePickerComponent.prototype, "minHour", void 0);
	    __decorate([
	        core_1.Input('max-hour'), 
	        __metadata('design:type', Number)
	    ], NguiDatetimePickerComponent.prototype, "maxHour", void 0);
	    __decorate([
	        core_1.Input('disabled-dates'), 
	        __metadata('design:type', Array)
	    ], NguiDatetimePickerComponent.prototype, "disabledDates", void 0);
	    __decorate([
	        core_1.Input('show-close-button'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerComponent.prototype, "showCloseButton", void 0);
	    __decorate([
	        core_1.Input('show-close-layer'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerComponent.prototype, "showCloseLayer", void 0);
	    __decorate([
	        core_1.Input('show-week-numbers'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerComponent.prototype, "showWeekNumbers", void 0);
	    __decorate([
	        core_1.Input('show-today-shortcut'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerComponent.prototype, "showTodayShortcut", void 0);
	    __decorate([
	        core_1.Input('show-am-pm'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerComponent.prototype, "showAmPm", void 0);
	    __decorate([
	        core_1.Output('selected$'), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], NguiDatetimePickerComponent.prototype, "selected$", void 0);
	    __decorate([
	        core_1.Output('closing$'), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], NguiDatetimePickerComponent.prototype, "closing$", void 0);
	    __decorate([
	        core_1.ViewChild('hours'), 
	        __metadata('design:type', core_1.ElementRef)
	    ], NguiDatetimePickerComponent.prototype, "hours", void 0);
	    __decorate([
	        core_1.ViewChild('minutes'), 
	        __metadata('design:type', core_1.ElementRef)
	    ], NguiDatetimePickerComponent.prototype, "minutes", void 0);
	    NguiDatetimePickerComponent = __decorate([
	        core_1.Component({
	            providers: [datetime_1.NguiDatetime],
	            selector: 'ngui-datetime-picker',
	            template: "\n  <div class=\"closing-layer\" (click)=\"close()\" *ngIf=\"showCloseLayer\" ></div>\n  <div class=\"ngui-datetime-picker\">\n    <div class=\"close-button\" *ngIf=\"showCloseButton\" (click)=\"close()\"></div>\n    \n    <!-- Month - Year  -->\n    <div class=\"month\" *ngIf=\"!timeOnly\">\n      <b class=\"prev_next prev year\" (click)=\"updateMonthData(-12)\">&laquo;</b>\n      <b class=\"prev_next prev month\" (click)=\"updateMonthData(-1)\">&lsaquo;</b>\n       <span title=\"{{monthData?.fullName}}\">\n         {{monthData?.shortName}}\n       </span>\n       <span (click)=\"showYearSelector = true\">\n        {{monthData.year}}\n       </span>\n      <b class=\"prev_next next year\" (click)=\"updateMonthData(+12)\">&raquo;</b>\n      <b class=\"prev_next next month\" (click)=\"updateMonthData(+1)\">&rsaquo;</b>\n    </div>\n\n    <!-- Week number / Days  -->\n    <div class=\"week-numbers-and-days\"\n      [ngClass]=\"{'show-week-numbers': !timeOnly && showWeekNumbers}\">\n      <!-- Week -->\n      <div class=\"week-numbers\" *ngIf=\"!timeOnly && showWeekNumbers\">\n        <div class=\"week-number\" *ngFor=\"let weekNumber of monthData.weekNumbers\">\n          {{weekNumber}}\n        </div>\n      </div>\n      \n      <!-- Date -->\n      <div class=\"days\" *ngIf=\"!timeOnly\">\n\n        <!-- Su Mo Tu We Th Fr Sa -->\n        <div class=\"day-of-week\"\n             *ngFor=\"let dayOfWeek of monthData.localizedDaysOfWeek; let ndx=index\"\n             [class.weekend]=\"isWeekend(ndx + monthData.firstDayOfWeek)\"\n             title=\"{{dayOfWeek.fullName}}\">\n          {{dayOfWeek.shortName}}\n        </div>\n\n        <!-- Fill up blank days for this month -->\n        <div *ngIf=\"monthData.leadingDays.length < 7\">\n          <div class=\"day\"\n              (click)=\"updateMonthData(-1)\"\n               *ngFor=\"let dayNum of monthData.leadingDays\">\n            {{dayNum}}\n          </div>\n        </div>\n\n        <div class=\"day\"\n             *ngFor=\"let dayNum of monthData.days\"\n             (click)=\"selectDateTime(toDate(dayNum))\"\n             title=\"{{monthData.year}}-{{monthData.month+1}}-{{dayNum}}\"\n             [ngClass]=\"{\n               selectable: !isDateDisabled(toDate(dayNum)),\n               selected: toDate(dayNum).getTime() === toDateOnly(selectedDate).getTime(),\n               today: toDate(dayNum).getTime() === today.getTime(),\n               weekend: isWeekend(dayNum, monthData.month)\n             }\">\n          {{dayNum}}\n        </div>\n\n        <!-- Fill up blank days for this month -->\n        <div *ngIf=\"monthData.trailingDays.length < 7\">\n          <div class=\"day\"\n               (click)=\"updateMonthData(+1)\"\n               *ngFor=\"let dayNum of monthData.trailingDays\">\n            {{dayNum}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"shortcuts\" *ngIf=\"showTodayShortcut\">\n      <a href=\"#\" (click)=\"selectToday()\">Today</a>\n    </div>\n\n    <!-- Hour Minute -->\n    <div class=\"time\" id=\"time\" *ngIf=\"!dateOnly\">\n      <div class=\"select-current-time\" (click)=\"selectCurrentTime()\">{{locale.currentTime}}</div>\n      <label class=\"timeLabel\">{{locale.time}}</label>\n      <span class=\"timeValue\">\n        {{convertHours(hour)}} : {{(\"0\"+minute).slice(-2)}} {{timeSuffix}}\n      </span><br/>\n      <div>\n        <label class=\"hourLabel\">{{locale.hour}}:</label>\n        <input #hours class=\"hourInput\"\n               tabindex=\"90000\"\n               (change)=\"selectDateTime()\"\n               type=\"range\"\n               min=\"{{minHour || 0}}\"\n               max=\"{{maxHour || 23}}\"\n               [(ngModel)]=\"hour\" />\n      </div>\n      <div>\n        <label class=\"minutesLabel\">{{locale.minute}}:</label>\n        <input #minutes class=\"minutesInput\"\n               tabindex=\"90000\"\n               step=\"{{minuteStep}}\"\n               (change)=\"selectDateTime()\"\n               type=\"range\" min=\"0\" max=\"59\" range=\"10\" [(ngModel)]=\"minute\"/>\n      </div>\n    </div>\n\n    <!-- Year Selector -->\n    <div class=\"year-selector\" *ngIf=\"showYearSelector\">\n      <div class=\"locale\">\n        <b>{{locale.year}}</b>\n      </div>\n      <span class=\"year\" \n        *ngFor=\"let year of yearsSelectable\"\n        (click)=\"selectYear(year)\">\n        {{year}}\n      </span>\n    </div>\n  </div>\n  ",
	            styles: [
	                "\n@keyframes slideDown {\n  0% {\n    transform:  translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n@keyframes slideUp {\n  0% {\n    transform: translateY(100%);\n  }\n  100% {\n    transform: translateY(0%);\n  }\n}\n\n.ngui-datetime-picker-wrapper {\n  position: relative;\n}\n\n.ngui-datetime-picker {\n  color: #333;\n  outline-width: 0;\n  font: normal 14px sans-serif;\n  border: 1px solid #ddd;\n  display: inline-block;\n  background: #fff;\n  animation: slideDown 0.1s ease-in-out;\n  animation-fill-mode: both;\n}\n.ngui-datetime-picker .days {\n  width: 210px; /* 30 x 7 days */\n  box-sizing: content-box;\n}\n.ngui-datetime-picker .close-button {\n  position: absolute;\n  width: 1em;\n  height: 1em;\n  right: 0;\n  z-index: 1;\n  padding: 0 5px;\n  box-sizing: content-box;\n}\n.ngui-datetime-picker .close-button:before {\n  content: 'X';\n  cursor: pointer;\n  color: #ff0000;\n}\n.ngui-datetime-picker > .month {\n  text-align: center;\n  line-height: 22px;\n  padding: 10px;\n  background: #fcfcfc;\n  text-transform: uppercase;\n  font-weight: bold;\n  border-bottom: 1px solid #ddd;\n  position: relative;\n}\n\n.ngui-datetime-picker > .month > .prev_next {\n  color: #555;\n  display: block;\n  font: normal 24px sans-serif;\n  outline: none;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  width: 25px;\n  text-align: center;\n  box-sizing: content-box;\n}\n.ngui-datetime-picker > .month > .prev_next:hover {\n  background-color: #333;\n  color: #fff;\n}\n.ngui-datetime-picker > .month > .prev_next.prev {\n  float: left;\n}\n.ngui-datetime-picker > .month > .prev_next.next {\n  float: right;\n}\n\n.ngui-datetime-picker .week-numbers-and-days {\n  text-align: center;\n}\n.ngui-datetime-picker .week-numbers {\n  line-height: 30px;\n  display: inline-block;\n  padding: 30px 0 0 0;\n  color: #ddd;\n  text-align: right;\n  width: 21px;\n  vertical-align: top;\n  box-sizing: content-box;\n}\n\n.ngui-datetime-picker  .days {\n  display: inline-block;\n  width: 210px; /* 30 x 7 */\n  text-align: center;\n  padding: 0 10px;\n  box-sizing: content-box;\n}\n.ngui-datetime-picker .days .day-of-week,\n.ngui-datetime-picker .days .day {\n  box-sizing: border-box;\n  border: 1px solid transparent;\n  width: 30px;\n  line-height: 28px;\n  float: left;\n}\n.ngui-datetime-picker .days .day-of-week {\n  font-weight: bold;\n}\n.ngui-datetime-picker .days .day-of-week.weekend {\n  color: #ccc;\n  background-color: inherit;\n}\n.ngui-datetime-picker .days .day:not(.selectable) {\n  color: #ccc;\n  cursor: default;\n}\n.ngui-datetime-picker .days .weekend {\n  color: #ccc;\n  background-color: #eee;\n}\n.ngui-datetime-picker .days .day.selectable  {\n  cursor: pointer;\n}\n.ngui-datetime-picker .days .day.selected {\n  background: gray;\n  color: #fff;\n}\n.ngui-datetime-picker .days .day:not(.selected).selectable:hover {\n  background: #eee;\n}\n.ngui-datetime-picker .days:after {\n  content: '';\n  display: block;\n  clear: left;\n  height: 0;\n}\n.ngui-datetime-picker .time {\n  position: relative;\n  padding: 10px;\n  text-transform: Capitalize;\n}\n.ngui-datetime-picker .year-selector {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: #fff;\n  height: 100%;\n  overflow: auto; \n  padding: 5px;\n  z-index: 2;\n}\n.ngui-datetime-picker .year-selector .locale{\n  text-align: center;\n}\n.ngui-datetime-picker .year-selector .year {\n  display: inline-block;\n  cursor: pointer;\n  padding: 2px 5px;\n}\n.ngui-datetime-picker .year-selector .year:hover {\n  background-color: #ddd;\n}\n.ngui-datetime-picker .select-current-time {\n  position: absolute;\n  top: 1em;\n  right: 5px;\n  z-index: 1;\n  cursor: pointer;\n  color: #0000ff;\n}\n.ngui-datetime-picker .hourLabel,\n.ngui-datetime-picker .minutesLabel {\n  display: inline-block;\n  width: 45px;\n  vertical-align: top;\n  box-sizing: content-box;\n}\n.closing-layer {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0,0,0,0);\n}\n\n.ngui-datetime-picker .shortcuts {\n  padding: 10px;\n  text-align: center;\n}\n\n.ngui-datetime-picker .shortcuts a {\n  font-family: Sans-serif;\n  margin: 0 0.5em;\n  text-decoration: none;\n}\n\n@media (max-width: 767px) {\n  .ngui-datetime-picker {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;    \n    width: auto !important;\n    animation: slideUp 0.1s ease-in-out;\n  }\n\n  .ngui-datetime-picker > .days {\n    display: block;\n    margin: 0 auto;\n  }\n\n  .closing-layer {\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    background: rgba(0,0,0,0.2);\n  }\n}\n  "
	            ],
	            encapsulation: core_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, datetime_1.NguiDatetime, core_1.ChangeDetectorRef])
	    ], NguiDatetimePickerComponent);
	    return NguiDatetimePickerComponent;
	}());
	exports.NguiDatetimePickerComponent = NguiDatetimePickerComponent;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(5);
	var datetime_picker_component_1 = __webpack_require__(3);
	var datetime_1 = __webpack_require__(1);
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
	var NguiDatetimePickerDirective = (function () {
	    function NguiDatetimePickerDirective(resolver, viewContainerRef, parent) {
	        var _this = this;
	        this.resolver = resolver;
	        this.viewContainerRef = viewContainerRef;
	        this.parent = parent;
	        this.closeOnSelect = true;
	        this.showTodayShortcut = false;
	        this.isDraggable = true;
	        this.ngModelChange = new core_1.EventEmitter();
	        this.valueChanged$ = new core_1.EventEmitter();
	        this.popupClosed$ = new core_1.EventEmitter();
	        this.userModifyingValue = false;
	        this.handleKeyDown = function (event) {
	            _this.userModifyingValue = true;
	        };
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
	            var factory = _this.resolver.resolveComponentFactory(datetime_picker_component_1.NguiDatetimePickerComponent);
	            _this.componentRef = _this.viewContainerRef.createComponent(factory);
	            _this.nguiDatetimePickerEl = _this.componentRef.location.nativeElement;
	            _this.nguiDatetimePickerEl.setAttribute('tabindex', '32767');
	            _this.nguiDatetimePickerEl.setAttribute('draggable', String(_this.isDraggable));
	            _this.nguiDatetimePickerEl.addEventListener('mousedown', function (event) {
	                _this.clickedDatetimePicker = true;
	            });
	            _this.nguiDatetimePickerEl.addEventListener('mouseup', function (event) {
	                _this.clickedDatetimePicker = false;
	            });
	            //This is for material design. MD has click event to make blur to happen
	            _this.nguiDatetimePickerEl.addEventListener('click', function (event) {
	                event.stopPropagation();
	            });
	            _this.nguiDatetimePickerEl.addEventListener('blur', function (event) {
	                _this.hideDatetimePicker();
	            });
	            _this.nguiDatetimePickerEl.addEventListener('dragstart', _this.drag_start, false);
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
	            component.showTodayShortcut = _this.showTodayShortcut;
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
	                _this.nguiDatetimePickerEl.focus();
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
	                date = datetime_1.NguiDatetime.parseDate(arg, _this.parseFormat, _this.dateFormat);
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
	            _this.nguiDatetimePickerEl.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
	            _this.nguiDatetimePickerEl.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
	            _this.nguiDatetimePickerEl.style.bottom = '';
	            event.preventDefault();
	            return false;
	        };
	        this.el = this.viewContainerRef.element.nativeElement;
	    }
	    /**
	     * convert defaultValue, minDate, maxDate, minHour, and maxHour to proper types
	     */
	    NguiDatetimePickerDirective.prototype.normalizeInput = function () {
	        if (this.defaultValue && typeof this.defaultValue === 'string') {
	            var d = datetime_1.NguiDatetime.parseDate(this.defaultValue);
	            this.defaultValue = isNaN(d.getTime()) ? new Date() : d;
	        }
	        if (this.minDate && typeof this.minDate == 'string') {
	            var d = datetime_1.NguiDatetime.parseDate(this.minDate);
	            this.minDate = isNaN(d.getTime()) ? new Date() : d;
	        }
	        if (this.maxDate && typeof this.maxDate == 'string') {
	            var d = datetime_1.NguiDatetime.parseDate(this.maxDate);
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
	    NguiDatetimePickerDirective.prototype.ngOnInit = function () {
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
	        wrapper.className = 'ngui-datetime-picker-wrapper';
	        this.el.parentElement.insertBefore(wrapper, this.el.nextSibling);
	        wrapper.appendChild(this.el);
	        if (this.ngModel && this.ngModel.getTime) {
	            this.ngModel.toString = function () { return datetime_1.NguiDatetime.formatDate(_this.ngModel, _this.dateFormat, _this.dateOnly); };
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
	    NguiDatetimePickerDirective.prototype.ngAfterViewInit = function () {
	        // if this element is not an input tag, move dropdown after input tag
	        // so that it displays correctly
	        this.inputEl = this.el.tagName === "INPUT" ?
	            this.el : this.el.querySelector("input");
	        if (this.inputEl) {
	            this.inputEl.addEventListener('focus', this.showDatetimePicker);
	            this.inputEl.addEventListener('blur', this.hideDatetimePicker);
	            this.inputEl.addEventListener('keydown', this.handleKeyDown);
	        }
	    };
	    NguiDatetimePickerDirective.prototype.ngOnChanges = function (changes) {
	        var _this = this;
	        var date;
	        if (changes && changes['ngModel']) {
	            date = changes['ngModel'].currentValue;
	            if (date && typeof date !== 'string') {
	                date.toString = function () { return datetime_1.NguiDatetime.formatDate(date, _this.dateFormat, _this.dateOnly); };
	                this.setInputElDateValue(date);
	                this.updateDatepicker();
	            }
	            else if (date && typeof date === 'string') {
	                /** if program assigns a string value, then format to date later */
	                if (!this.userModifyingValue) {
	                    setTimeout(function () {
	                        var dt = _this.getDate(date);
	                        dt.toString = function () { return datetime_1.NguiDatetime.formatDate(dt, _this.dateFormat, _this.dateOnly); };
	                        _this.ngModel = dt;
	                        _this.inputEl.value = '' + dt;
	                    });
	                }
	            }
	        }
	        this.userModifyingValue = false;
	    };
	    NguiDatetimePickerDirective.prototype.updateDatepicker = function () {
	        if (this.componentRef) {
	            var component = this.componentRef.instance;
	            component.defaultValue = this.el['dateValue'];
	        }
	    };
	    NguiDatetimePickerDirective.prototype.setInputElDateValue = function (date) {
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
	    NguiDatetimePickerDirective.prototype.ngOnDestroy = function () {
	        if (this.sub) {
	            this.sub.unsubscribe();
	        }
	    };
	    NguiDatetimePickerDirective.prototype.elementIn = function (el, containerEl) {
	        while (el = el.parentNode) {
	            if (el === containerEl)
	                return true;
	        }
	        return false;
	    };
	    NguiDatetimePickerDirective.prototype.styleDatetimePicker = function () {
	        var _this = this;
	        // setting position, width, and height of auto complete dropdown
	        var thisElBCR = this.el.getBoundingClientRect();
	        // this.nguiDatetimePickerEl.style.minWidth      = thisElBCR.width + 'px';
	        this.nguiDatetimePickerEl.style.position = 'absolute';
	        this.nguiDatetimePickerEl.style.zIndex = '1000';
	        this.nguiDatetimePickerEl.style.left = '0';
	        this.nguiDatetimePickerEl.style.transition = 'height 0.3s ease-in';
	        this.nguiDatetimePickerEl.style.visibility = 'hidden';
	        setTimeout(function () {
	            var thisElBcr = _this.el.getBoundingClientRect();
	            var nguiDatetimePickerElBcr = _this.nguiDatetimePickerEl.getBoundingClientRect();
	            if (thisElBcr.bottom + nguiDatetimePickerElBcr.height > window.innerHeight) {
	                _this.nguiDatetimePickerEl.style.bottom =
	                    (thisElBcr.bottom - window.innerHeight + 15) + 'px';
	            }
	            else {
	                // otherwise, show below
	                _this.nguiDatetimePickerEl.style.top = thisElBcr.height + 'px';
	            }
	            _this.nguiDatetimePickerEl.style.visibility = 'visible';
	        });
	    };
	    ;
	    NguiDatetimePickerDirective.prototype.drag_over = function (event) {
	        event.preventDefault();
	        return false;
	    };
	    __decorate([
	        core_1.Input('date-format'), 
	        __metadata('design:type', String)
	    ], NguiDatetimePickerDirective.prototype, "dateFormat", void 0);
	    __decorate([
	        core_1.Input('parse-format'), 
	        __metadata('design:type', String)
	    ], NguiDatetimePickerDirective.prototype, "parseFormat", void 0);
	    __decorate([
	        core_1.Input('date-only'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerDirective.prototype, "dateOnly", void 0);
	    __decorate([
	        core_1.Input('time-only'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerDirective.prototype, "timeOnly", void 0);
	    __decorate([
	        core_1.Input('close-on-select'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerDirective.prototype, "closeOnSelect", void 0);
	    __decorate([
	        core_1.Input('default-value'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "defaultValue", void 0);
	    __decorate([
	        core_1.Input('minute-step'), 
	        __metadata('design:type', Number)
	    ], NguiDatetimePickerDirective.prototype, "minuteStep", void 0);
	    __decorate([
	        core_1.Input('min-date'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "minDate", void 0);
	    __decorate([
	        core_1.Input('max-date'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "maxDate", void 0);
	    __decorate([
	        core_1.Input('min-hour'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "minHour", void 0);
	    __decorate([
	        core_1.Input('max-hour'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "maxHour", void 0);
	    __decorate([
	        core_1.Input('disabled-dates'), 
	        __metadata('design:type', Array)
	    ], NguiDatetimePickerDirective.prototype, "disabledDates", void 0);
	    __decorate([
	        core_1.Input('show-close-layer'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerDirective.prototype, "showCloseLayer", void 0);
	    __decorate([
	        core_1.Input('show-today-shortcut'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerDirective.prototype, "showTodayShortcut", void 0);
	    __decorate([
	        core_1.Input('show-week-numbers'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerDirective.prototype, "showWeekNumbers", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], NguiDatetimePickerDirective.prototype, "formControlName", void 0);
	    __decorate([
	        core_1.Input('is-draggable'), 
	        __metadata('design:type', Boolean)
	    ], NguiDatetimePickerDirective.prototype, "isDraggable", void 0);
	    __decorate([
	        core_1.Input('ngModel'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "ngModel", void 0);
	    __decorate([
	        core_1.Output('ngModelChange'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "ngModelChange", void 0);
	    __decorate([
	        core_1.Output('valueChanged'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "valueChanged$", void 0);
	    __decorate([
	        core_1.Output('popupClosed'), 
	        __metadata('design:type', Object)
	    ], NguiDatetimePickerDirective.prototype, "popupClosed$", void 0);
	    NguiDatetimePickerDirective = __decorate([
	        core_1.Directive({
	            selector: '[ngui-datetime-picker]',
	            providers: [datetime_1.NguiDatetime]
	        }),
	        __param(2, core_1.Optional()),
	        __param(2, core_1.Host()),
	        __param(2, core_1.SkipSelf()), 
	        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, forms_1.ControlContainer])
	    ], NguiDatetimePickerDirective);
	    return NguiDatetimePickerDirective;
	}());
	exports.NguiDatetimePickerDirective = NguiDatetimePickerDirective;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(5);
	var common_1 = __webpack_require__(7);
	var datetime_1 = __webpack_require__(1);
	var datetime_picker_component_1 = __webpack_require__(3);
	var datetime_picker_directive_1 = __webpack_require__(4);
	var NguiDatetimePickerModule = (function () {
	    function NguiDatetimePickerModule() {
	    }
	    NguiDatetimePickerModule = __decorate([
	        core_1.NgModule({
	            imports: [common_1.CommonModule, forms_1.FormsModule],
	            declarations: [datetime_picker_component_1.NguiDatetimePickerComponent, datetime_picker_directive_1.NguiDatetimePickerDirective],
	            exports: [datetime_picker_component_1.NguiDatetimePickerComponent, datetime_picker_directive_1.NguiDatetimePickerDirective],
	            entryComponents: [datetime_picker_component_1.NguiDatetimePickerComponent],
	            providers: [datetime_1.NguiDatetime]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NguiDatetimePickerModule);
	    return NguiDatetimePickerModule;
	}());
	exports.NguiDatetimePickerModule = NguiDatetimePickerModule;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=datetime-picker.umd.js.map