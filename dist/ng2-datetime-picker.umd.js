(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["ng2-datetime-picker"] = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"));
	else
		root["ng2-datetime-picker"] = factory(root["@angular/core"], root["@angular/forms"], root["@angular/common"]);
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
	var ng2_datetime_1 = __webpack_require__(1);
	exports.Ng2Datetime = ng2_datetime_1.Ng2Datetime;
	var ng2_datetime_picker_component_1 = __webpack_require__(3);
	exports.Ng2DatetimePickerComponent = ng2_datetime_picker_component_1.Ng2DatetimePickerComponent;
	var ng2_datetime_picker_directive_1 = __webpack_require__(4);
	exports.Ng2DatetimePickerDirective = ng2_datetime_picker_directive_1.Ng2DatetimePickerDirective;
	var ng2_datetime_picker_module_1 = __webpack_require__(6);
	exports.Ng2DatetimePickerModule = ng2_datetime_picker_module_1.Ng2DatetimePickerModule;


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
	var Ng2Datetime = (function () {
	    function Ng2Datetime() {
	        this.initialize();
	    }
	    Ng2Datetime.prototype.initialize = function () {
	        this.months = [
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
	        ];
	        this.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
	        /**
	         * According to International Standard ISO 8601, Monday is the first day of the week
	         * followed by Tuesday, Wednesday, Thursday, Friday, Saturday,
	         * and with Sunday as the seventh and final day.
	         * However, in Javascript Sunday is 0, Monday is 1.. and so on
	         */
	        this.daysOfWeek = [
	            { fullName: 'Sunday', shortName: 'Su', weekend: true },
	            { fullName: 'Monday', shortName: 'Mo' },
	            { fullName: 'Tuesday', shortName: 'Tu' },
	            { fullName: 'Wednesday', shortName: 'We' },
	            { fullName: 'Thursday', shortName: 'Th' },
	            { fullName: 'Friday', shortName: 'Fr' },
	            { fullName: 'Saturday', shortName: 'Sa', weekend: true }
	        ];
	        /**
	         * if momentjs is available, use momentjs localized months, week, etc.
	         */
	        if (typeof moment !== 'undefined') {
	            this.months = this.months.map(function (el, index) {
	                el.fullName = moment.months()[index];
	                el.shortName = moment.monthsShort()[index];
	                return el;
	            });
	            this.daysOfWeek = this.daysOfWeek.map(function (el, index) {
	                el.fullName = moment.weekdays()[index];
	                el.shortName = moment.weekdaysShort()[index].substr(0, 2);
	                return el;
	            });
	            this.firstDayOfWeek = moment.localeData().firstDayOfWeek();
	        }
	        this.firstDayOfWeek = this.firstDayOfWeek || 0;
	        if (Ng2Datetime.customFirstDayOfWeek !== undefined) {
	            this.firstDayOfWeek = Ng2Datetime.customFirstDayOfWeek;
	        }
	        this.localizedDaysOfWeek = this.daysOfWeek
	            .concat(this.daysOfWeek)
	            .splice(this.firstDayOfWeek, 7);
	    };
	    Ng2Datetime.prototype.getMonthData = function (year, month) {
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
	        var leadingDays = (dayOfWeek - this.firstDayOfWeek + 7) % 7 || 7;
	        var trailingDays = this.days.slice(0, 6 * 7 - (leadingDays + daysInMonth));
	        if (trailingDays.length > 7) {
	            trailingDays = trailingDays.slice(0, trailingDays.length - 7);
	        }
	        var monthData = {
	            year: year,
	            month: month,
	            days: this.days.slice(0, daysInMonth),
	            leadingDays: this.days.slice(-leadingDays - (31 - daysInLastMonth), daysInLastMonth),
	            trailingDays: trailingDays
	        };
	        return monthData;
	    };
	    ;
	    Ng2Datetime.momentFormatDate = function (d, dateFormat) {
	        if (typeof moment === 'undefined') {
	            console.error("momentjs is required with dateFormat.\n        please add <script src=\"moment.min.js\"></script>\"> in your html.");
	        }
	        return moment(d).format(dateFormat);
	    };
	    Ng2Datetime.momentParse = function (dateStr, dateFormat) {
	        if (typeof moment === 'undefined') {
	            console.error("momentjs is required with dateFormat.\n        please add <script src=\"moment.min.js\"></script>\"> in your html.");
	        }
	        //return moment(dateStr).toDate();
	        var date = moment(dateStr, dateFormat).toDate();
	        if (isNaN(date.getTime())) {
	            date = moment(dateStr).toDate(); //parse as ISO format
	        }
	        return date;
	    };
	    Ng2Datetime.formatDate = function (d, dateOnly) {
	        // return d.toLocaleString('en-us', hash); // IE11 does not understand this
	        var pad0 = function (number) {
	            return ("0" + number).slice(-2);
	        };
	        var ret = d.getFullYear() + '-' + pad0(d.getMonth() + 1) + '-' + pad0(d.getDate());
	        if (!dateOnly) {
	            ret += ' ' + pad0(d.getHours()) + ':' + pad0(d.getMinutes());
	        }
	        return ret;
	    };
	    //return date as given from given string
	    // without considering timezone and day light saving time considered
	    Ng2Datetime.parse = function (dateStr) {
	        dateStr = Ng2Datetime.removeTimezone(dateStr);
	        dateStr = dateStr + Ng2Datetime.addDSTOffset(dateStr);
	        return Ng2Datetime.getDateFromString(dateStr);
	    };
	    //remove timezone
	    Ng2Datetime.removeTimezone = function (dateStr) {
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
	    Ng2Datetime.addDSTOffset = function (dateStr) {
	        var date = Ng2Datetime.getDateFromString(dateStr);
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
	    Ng2Datetime.getDateFromString = function (dateStr) {
	        var tmp = dateStr.split(/[\+\-:\ T]/); // split by dash, colon or space
	        return new Date(parseInt(tmp[0], 10), parseInt(tmp[1], 10) - 1, parseInt(tmp[2], 10), parseInt(tmp[3] || '0', 10), parseInt(tmp[4] || '0', 10), parseInt(tmp[5] || '0', 10));
	    };
	    Ng2Datetime.setFirstDayOfWeek = function (firstDayOfWeek) {
	        Ng2Datetime.customFirstDayOfWeek = firstDayOfWeek;
	    };
	    Ng2Datetime.customFirstDayOfWeek = 0;
	    Ng2Datetime = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Ng2Datetime);
	    return Ng2Datetime;
	}());
	exports.Ng2Datetime = Ng2Datetime;


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
	var ng2_datetime_1 = __webpack_require__(1);
	//@TODO
	// . display currently selected day
	/**
	 * show a selected date in monthly calendar
	 */
	var Ng2DatetimePickerComponent = (function () {
	    function Ng2DatetimePickerComponent(elementRef, ng2Datetime, cdRef) {
	        this.ng2Datetime = ng2Datetime;
	        this.cdRef = cdRef;
	        this.minuteStep = 1;
	        this.changes = new core_1.EventEmitter();
	        this.closing = new core_1.EventEmitter();
	        this.el = elementRef.nativeElement;
	    }
	    Ng2DatetimePickerComponent.prototype.ngAfterViewInit = function () {
	        var stopPropagation = function (e) { return e.stopPropagation(); };
	        if (!this.dateOnly) {
	            this.hours.nativeElement.addEventListener('keyup', stopPropagation);
	            this.hours.nativeElement.addEventListener('mousedown', stopPropagation);
	            this.minutes.nativeElement.addEventListener('keyup', stopPropagation);
	            this.minutes.nativeElement.addEventListener('mousedown', stopPropagation);
	        }
	    };
	    Object.defineProperty(Ng2DatetimePickerComponent.prototype, "year", {
	        get: function () {
	            return this.selectedDate.getFullYear();
	        },
	        set: function (year) { },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Ng2DatetimePickerComponent.prototype, "month", {
	        get: function () {
	            return this.selectedDate.getMonth();
	        },
	        set: function (month) { },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Ng2DatetimePickerComponent.prototype, "day", {
	        get: function () {
	            return this.selectedDate.getDate();
	        },
	        set: function (day) { },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Ng2DatetimePickerComponent.prototype, "today", {
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
	    Ng2DatetimePickerComponent.prototype.initDatetime = function (date) {
	        this.selectedDate = date || this.defaultValue || new Date();
	        this.hour = this.selectedDate.getHours();
	        this.minute = this.selectedDate.getMinutes();
	        this.monthData = this.ng2Datetime.getMonthData(this.year, this.month);
	    };
	    Ng2DatetimePickerComponent.prototype.toDate = function (day, month) {
	        return new Date(this.monthData.year, month || this.monthData.month, day);
	    };
	    Ng2DatetimePickerComponent.prototype.toDateOnly = function (date) {
	        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
	    };
	    /**
	     * set the selected date and close it when closeOnSelect is true
	     * @param date {Date}
	     */
	    Ng2DatetimePickerComponent.prototype.selectDate = function (date) {
	        this.selectedDate = date || this.selectedDate;
	        if (this.isDateDisabled(this.selectedDate)) {
	            return false;
	        }
	        this.selectedDate.setHours(parseInt('' + this.hour || '0', 10));
	        this.selectedDate.setMinutes(parseInt('' + this.minute || '0', 10));
	        this.changes.emit(this.selectedDate);
	        this.closing.emit(true);
	    };
	    ;
	    /**
	     * show prev/next month calendar
	     */
	    Ng2DatetimePickerComponent.prototype.updateMonthData = function (num) {
	        this.monthData = this.ng2Datetime.getMonthData(this.monthData.year, this.monthData.month + num);
	    };
	    Ng2DatetimePickerComponent.prototype.isDateDisabled = function (date) {
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
	    __decorate([
	        core_1.Input('date-only'), 
	        __metadata('design:type', Boolean)
	    ], Ng2DatetimePickerComponent.prototype, "dateOnly", void 0);
	    __decorate([
	        core_1.Input('time-only'), 
	        __metadata('design:type', Boolean)
	    ], Ng2DatetimePickerComponent.prototype, "timeOnly", void 0);
	    __decorate([
	        core_1.Input('selected-date'), 
	        __metadata('design:type', Date)
	    ], Ng2DatetimePickerComponent.prototype, "selectedDate", void 0);
	    __decorate([
	        core_1.Input('hour'), 
	        __metadata('design:type', Number)
	    ], Ng2DatetimePickerComponent.prototype, "hour", void 0);
	    __decorate([
	        core_1.Input('minute'), 
	        __metadata('design:type', Number)
	    ], Ng2DatetimePickerComponent.prototype, "minute", void 0);
	    __decorate([
	        core_1.Input('minuteStep'), 
	        __metadata('design:type', Number)
	    ], Ng2DatetimePickerComponent.prototype, "minuteStep", void 0);
	    __decorate([
	        core_1.Input('first-day-of-week'), 
	        __metadata('design:type', String)
	    ], Ng2DatetimePickerComponent.prototype, "firstDayOfWeek", void 0);
	    __decorate([
	        core_1.Input('default-value'), 
	        __metadata('design:type', Date)
	    ], Ng2DatetimePickerComponent.prototype, "defaultValue", void 0);
	    __decorate([
	        core_1.Input('min-date'), 
	        __metadata('design:type', Date)
	    ], Ng2DatetimePickerComponent.prototype, "minDate", void 0);
	    __decorate([
	        core_1.Input('max-date'), 
	        __metadata('design:type', Date)
	    ], Ng2DatetimePickerComponent.prototype, "maxDate", void 0);
	    __decorate([
	        core_1.Input('min-hour'), 
	        __metadata('design:type', Number)
	    ], Ng2DatetimePickerComponent.prototype, "minHour", void 0);
	    __decorate([
	        core_1.Input('max-hour'), 
	        __metadata('design:type', Number)
	    ], Ng2DatetimePickerComponent.prototype, "maxHour", void 0);
	    __decorate([
	        core_1.Input('disabled-dates'), 
	        __metadata('design:type', Array)
	    ], Ng2DatetimePickerComponent.prototype, "disabledDates", void 0);
	    __decorate([
	        core_1.Output('changes'), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Ng2DatetimePickerComponent.prototype, "changes", void 0);
	    __decorate([
	        core_1.Output('closing'), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Ng2DatetimePickerComponent.prototype, "closing", void 0);
	    __decorate([
	        core_1.ViewChild('hours'), 
	        __metadata('design:type', core_1.ElementRef)
	    ], Ng2DatetimePickerComponent.prototype, "hours", void 0);
	    __decorate([
	        core_1.ViewChild('minutes'), 
	        __metadata('design:type', core_1.ElementRef)
	    ], Ng2DatetimePickerComponent.prototype, "minutes", void 0);
	    Ng2DatetimePickerComponent = __decorate([
	        core_1.Component({
	            providers: [ng2_datetime_1.Ng2Datetime],
	            selector: 'ng2-datetime-picker',
	            template: "\n<div class=\"ng2-datetime-picker\" tabindex=\"0\">\n\n  <!-- Month - Year  -->\n  <div class=\"month\" *ngIf=\"!timeOnly\">\n    <b class=\"prev_next prev\" (click)=\"updateMonthData(-12)\">&laquo;</b>\n    <b class=\"prev_next prev\" (click)=\"updateMonthData(-1)\">&lsaquo;</b>\n     <span title=\"{{ng2Datetime.months[monthData.month]?.fullName}}\">\n           {{ng2Datetime.months[monthData.month]?.shortName}}\n     </span>\n    {{monthData.year}}\n    <b class=\"prev_next next\" (click)=\"updateMonthData(+12)\">&raquo;</b>\n    <b class=\"prev_next next\" (click)=\"updateMonthData(+1)\">&rsaquo;</b>\n  </div>\n\n  <!-- Date -->\n  <div class=\"days\" *ngIf=\"!timeOnly\">\n\n    <!-- Su Mo Tu We Th Fr Sa -->\n    <div class=\"day-of-week\"\n         *ngFor=\"let dayOfWeek of ng2Datetime.localizedDaysOfWeek\"\n         [ngClass]=\"{weekend: dayOfWeek.weekend}\"\n         title=\"{{dayOfWeek.fullName}}\">\n      {{dayOfWeek.shortName}}\n    </div>\n\n    <!-- Fill up blank days for this month -->\n    <div *ngIf=\"monthData.leadingDays.length < 7\">\n      <div class=\"day\" *ngFor=\"let dayNum of monthData.leadingDays\"\n           [ngClass]=\"{weekend: [0,6].indexOf(toDate(dayNum, monthData.month-1).getDay()) !== -1}\">\n        {{dayNum}}\n      </div>\n    </div>\n\n    <div class=\"day\"\n         *ngFor=\"let dayNum of monthData.days\"\n         (click)=\"selectDate(toDate(dayNum))\"\n         title=\"{{monthData.year}}-{{monthData.month+1}}-{{dayNum}}\"\n         [ngClass]=\"{\n           selectable: !isDateDisabled(toDate(dayNum)),\n           selected:\n             toDate(dayNum).getTime() === toDateOnly(selectedDate).getTime(),\n           today:\n             toDate(dayNum).getTime() === today.getTime(),\n           weekend:\n             [0,6].indexOf(toDate(dayNum).getDay()) !== -1\n         }\">\n      {{dayNum}}\n    </div>\n\n    <!-- Fill up blank days for this month -->\n    <div *ngIf=\"monthData.trailingDays.length < 7\">\n      <div class=\"day\"\n           *ngFor=\"let dayNum of monthData.trailingDays\"\n           [ngClass]=\"{weekend: [0,6].indexOf(toDate(dayNum, monthData.month+1).getDay()) !== -1}\">\n        {{dayNum}}\n      </div>\n    </div>\n  </div>\n\n  <!-- Time -->\n  <div class=\"days\" id=\"time\" *ngIf=\"!dateOnly\">\n    <label class=\"timeLabel\">Time:</label>\n    <span class=\"timeValue\">\n      {{(\"0\"+hour).slice(-2)}} : {{(\"0\"+minute).slice(-2)}}\n    </span><br/>\n    <label class=\"hourLabel\">Hour:</label>\n    <input #hours class=\"hourInput\"\n           (change)=\"selectDate()\"\n           type=\"range\"\n           min=\"{{minHour || 0}}\"\n           max=\"{{maxHour || 23}}\"\n           [(ngModel)]=\"hour\" />\n    <label class=\"minutesLabel\">Min:</label>\n    <input #minutes class=\"minutesInput\"\n           step=\"{{minuteStep}}\"\n           (change)=\"selectDate()\"\n           type=\"range\" min=\"0\" max=\"59\" range=\"10\" [(ngModel)]=\"minute\"/>\n  </div>\n</div>\n  ",
	            styles: [
	                "\n @keyframes slideDown {\n  0% {\n    transform:  translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n.ng2-datetime-picker-wrapper {\n  position: relative;\n}\n\n.ng2-datetime-picker {\n    color: #333;\n    outline-width: 0;\n    font: normal 14px sans-serif;\n    border: 1px solid #ddd;\n    display: inline-block;\n    background: #fff;\n    animation: slideDown 0.1s ease-in-out;\n    animation-fill-mode: both;\n}\n.ng2-datetime-picker > .month {\n    text-align: center;\n    line-height: 22px;\n    padding: 10px;\n    background: #fcfcfc;\n    text-transform: uppercase;\n    font-weight: bold;\n    border-bottom: 1px solid #ddd;\n    position: relative;\n}\n.ng2-datetime-picker > .month > .prev_next {\n    color: #555;\n    display: block;\n    font: normal 24px sans-serif;\n    outline: none;\n    background: transparent;\n    border: none;\n    cursor: pointer;\n    width: 15px;\n    text-align: center;\n}\n.ng2-datetime-picker > .month > .prev_next:hover {\n  background-color: #333;\n  color: #fff;\n}\n.ng2-datetime-picker > .month > .prev_next.prev {\n  float: left;\n}\n.ng2-datetime-picker > .month > .prev_next.next {\n  float: right;\n}\n.ng2-datetime-picker > .days {\n    width: 210px; /* 30 x 7 */\n    margin: 10px;\n    text-align: center;\n}\n.ng2-datetime-picker > .days .day-of-week,\n.ng2-datetime-picker > .days .day {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    border: 1px solid transparent;\n    width: 30px;\n    line-height: 28px;\n    float: left;\n}\n.ng2-datetime-picker > .days .day-of-week {\n    font-weight: bold;\n}\n.ng2-datetime-picker > .days .day-of-week.weekend {\n    color: #ccc;\n    background-color: inherit;\n}\n.ng2-datetime-picker > .days .day:not(.selectable) {\n    color: #ccc;\n    cursor: default;\n}\n.ng2-datetime-picker > .days .weekend {\n    color: #ccc;\n    background-color: #eee;\n}\n.ng2-datetime-picker > .days .day.selectable  {\n    cursor: pointer;\n}\n.ng2-datetime-picker > .days .day.selected {\n    background: gray;\n    color: #fff;\n}\n.ng2-datetime-picker > .days .day:not(.selected).selectable:hover {\n    background: #eee;\n}\n.ng2-datetime-picker > .days:after {\n    content: '';\n    display: block;\n    clear: left;\n    height: 0;\n}\n.ng2-datetime-picker .hourLabel,\n.ng2-datetime-picker .minutesLabel {\n    display: inline-block;\n    width: 40px;\n    text-align: right;\n}\n.ng2-datetime-picker input[type=range] {\n    width: 200px;\n}\n  "
	            ],
	            encapsulation: core_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, ng2_datetime_1.Ng2Datetime, core_1.ChangeDetectorRef])
	    ], Ng2DatetimePickerComponent);
	    return Ng2DatetimePickerComponent;
	}());
	exports.Ng2DatetimePickerComponent = Ng2DatetimePickerComponent;


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
	var ng2_datetime_picker_component_1 = __webpack_require__(3);
	var ng2_datetime_1 = __webpack_require__(1);
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
	            _this.setElement(date);
	            _this.el.value = _this.getFormattedDateStr();
	            if (_this.ctrl) {
	                _this.ctrl.patchValue(_this.el.value);
	            }
	            if (_this.el['dateValue']) {
	                // date formatting that occurs in multiple places causes an error
	                // removal of redundant code
	                _this.ngModelChange.emit(_this.el.value);
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
	            var d = ng2_datetime_1.Ng2Datetime.parse(this.defaultValue);
	            this.defaultValue = Number.isNaN(d.getTime()) ? new Date() : d;
	        }
	        if (this.minDate && typeof this.minDate == 'string') {
	            var d = ng2_datetime_1.Ng2Datetime.parse(this.minDate);
	            this.minDate = Number.isNaN(d.getTime()) ? new Date() : d;
	        }
	        if (this.maxDate && typeof this.maxDate == 'string') {
	            var d = ng2_datetime_1.Ng2Datetime.parse(this.minDate);
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
	            ng2_datetime_1.Ng2Datetime.customFirstDayOfWeek = parseInt(this.firstDayOfWeek);
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
	                    _this.setElement(date);
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
	        this.setElement(date);
	        this.updateDatepicker();
	    };
	    Ng2DatetimePickerDirective.prototype.updateDatepicker = function () {
	        if (this.componentRef) {
	            var component = this.componentRef.instance;
	            component.initDatetime(this.el['dateValue']);
	        }
	    };
	    Ng2DatetimePickerDirective.prototype.setElement = function (date) {
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
	        component.changes.subscribe(this.valueChanged);
	        component.closing.subscribe(function () {
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
	        if (this.el['dateValue']) {
	            if (this.dateFormat && typeof moment !== 'undefined') {
	                return ng2_datetime_1.Ng2Datetime.momentFormatDate(this.el['dateValue'], this.dateFormat);
	            }
	            else {
	                return ng2_datetime_1.Ng2Datetime.formatDate(this.el['dateValue'], this.dateOnly);
	            }
	        }
	        else {
	            return null;
	        }
	    };
	    Ng2DatetimePickerDirective.prototype.getDate = function (arg) {
	        var date;
	        if (typeof arg === 'string') {
	            if (this.dateFormat && typeof moment !== 'undefined') {
	                date = ng2_datetime_1.Ng2Datetime.momentParse(arg, this.dateFormat);
	            }
	            else {
	                //remove timezone and respect day light saving time
	                date = ng2_datetime_1.Ng2Datetime.parse(arg);
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
	    ], Ng2DatetimePickerDirective.prototype, "dateFormat", void 0);
	    __decorate([
	        core_1.Input('date-only'), 
	        __metadata('design:type', Boolean)
	    ], Ng2DatetimePickerDirective.prototype, "dateOnly", void 0);
	    __decorate([
	        core_1.Input('time-only'), 
	        __metadata('design:type', Boolean)
	    ], Ng2DatetimePickerDirective.prototype, "timeOnly", void 0);
	    __decorate([
	        core_1.Input('close-on-select'), 
	        __metadata('design:type', String)
	    ], Ng2DatetimePickerDirective.prototype, "closeOnSelect", void 0);
	    __decorate([
	        core_1.Input('first-day-of-week'), 
	        __metadata('design:type', String)
	    ], Ng2DatetimePickerDirective.prototype, "firstDayOfWeek", void 0);
	    __decorate([
	        core_1.Input('default-value'), 
	        __metadata('design:type', Object)
	    ], Ng2DatetimePickerDirective.prototype, "defaultValue", void 0);
	    __decorate([
	        core_1.Input('minute-step'), 
	        __metadata('design:type', Number)
	    ], Ng2DatetimePickerDirective.prototype, "minuteStep", void 0);
	    __decorate([
	        core_1.Input('min-date'), 
	        __metadata('design:type', Object)
	    ], Ng2DatetimePickerDirective.prototype, "minDate", void 0);
	    __decorate([
	        core_1.Input('max-date'), 
	        __metadata('design:type', Object)
	    ], Ng2DatetimePickerDirective.prototype, "maxDate", void 0);
	    __decorate([
	        core_1.Input('min-hour'), 
	        __metadata('design:type', Object)
	    ], Ng2DatetimePickerDirective.prototype, "minHour", void 0);
	    __decorate([
	        core_1.Input('max-hour'), 
	        __metadata('design:type', Object)
	    ], Ng2DatetimePickerDirective.prototype, "maxHour", void 0);
	    __decorate([
	        core_1.Input('disabled-dates'), 
	        __metadata('design:type', Array)
	    ], Ng2DatetimePickerDirective.prototype, "disabledDates", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Ng2DatetimePickerDirective.prototype, "formControlName", void 0);
	    __decorate([
	        core_1.Input('ngModel'), 
	        __metadata('design:type', Object)
	    ], Ng2DatetimePickerDirective.prototype, "ngModel", void 0);
	    __decorate([
	        core_1.Output('ngModelChange'), 
	        __metadata('design:type', Object)
	    ], Ng2DatetimePickerDirective.prototype, "ngModelChange", void 0);
	    Ng2DatetimePickerDirective = __decorate([
	        core_1.Directive({
	            selector: '[ng2-datetime-picker]',
	            providers: [ng2_datetime_1.Ng2Datetime],
	            host: {
	                '(click)': 'showDatetimePicker()',
	                '(focus)': 'showDatetimePicker()'
	            }
	        }),
	        __param(2, core_1.Optional()),
	        __param(2, core_1.Host()),
	        __param(2, core_1.SkipSelf()), 
	        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, forms_1.ControlContainer])
	    ], Ng2DatetimePickerDirective);
	    return Ng2DatetimePickerDirective;
	}());
	exports.Ng2DatetimePickerDirective = Ng2DatetimePickerDirective;


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
	var ng2_datetime_1 = __webpack_require__(1);
	var ng2_datetime_picker_component_1 = __webpack_require__(3);
	var ng2_datetime_picker_directive_1 = __webpack_require__(4);
	var Ng2DatetimePickerModule = (function () {
	    function Ng2DatetimePickerModule() {
	    }
	    Ng2DatetimePickerModule = __decorate([
	        core_1.NgModule({
	            imports: [common_1.CommonModule, forms_1.FormsModule],
	            declarations: [ng2_datetime_picker_component_1.Ng2DatetimePickerComponent, ng2_datetime_picker_directive_1.Ng2DatetimePickerDirective],
	            exports: [ng2_datetime_picker_component_1.Ng2DatetimePickerComponent, ng2_datetime_picker_directive_1.Ng2DatetimePickerDirective],
	            entryComponents: [ng2_datetime_picker_component_1.Ng2DatetimePickerComponent],
	            providers: [ng2_datetime_1.Ng2Datetime]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Ng2DatetimePickerModule);
	    return Ng2DatetimePickerModule;
	}());
	exports.Ng2DatetimePickerModule = Ng2DatetimePickerModule;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ng2-datetime-picker.umd.js.map