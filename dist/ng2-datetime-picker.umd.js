(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["ng2-datetime-picker"] = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"));
	else
		root["ng2-datetime-picker"] = factory(root["@angular/core"], root["@angular/forms"], root["@angular/common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(3);
	var datetime_1 = __webpack_require__(4);
	exports.DateTime = datetime_1.DateTime;
	var datetime_picker_component_1 = __webpack_require__(5);
	exports.DateTimePickerComponent = datetime_picker_component_1.DateTimePickerComponent;
	var datetime_picker_directive_1 = __webpack_require__(6);
	exports.DateTimePickerDirective = datetime_picker_directive_1.DateTimePickerDirective;
	var Ng2DatetimePickerModule = (function () {
	    function Ng2DatetimePickerModule() {
	    }
	    Ng2DatetimePickerModule = __decorate([
	        core_1.NgModule({
	            imports: [common_1.CommonModule, forms_1.FormsModule],
	            declarations: [datetime_picker_component_1.DateTimePickerComponent, datetime_picker_directive_1.DateTimePickerDirective],
	            exports: [datetime_picker_component_1.DateTimePickerComponent, datetime_picker_directive_1.DateTimePickerDirective],
	            entryComponents: [datetime_picker_component_1.DateTimePickerComponent],
	            providers: [datetime_1.DateTime]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Ng2DatetimePickerModule);
	    return Ng2DatetimePickerModule;
	}());
	exports.Ng2DatetimePickerModule = Ng2DatetimePickerModule;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

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
	var core_1 = __webpack_require__(1);
	var DateTime = (function () {
	    function DateTime() {
	        this.initialize();
	    }
	    DateTime.prototype.initialize = function () {
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
	        this.localizedDaysOfWeek = this.daysOfWeek
	            .concat(this.daysOfWeek)
	            .splice(this.firstDayOfWeek, 7);
	    };
	    DateTime.prototype.getMonthData = function (year, month) {
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
	    DateTime.momentFormatDate = function (d, dateFormat) {
	        if (typeof moment === 'undefined') {
	            console.error("momentjs is required with dateFormat.\n        please add <script src=\"moment.min.js\"></script>\"> in your html.");
	        }
	        return moment(d).format(dateFormat);
	    };
	    DateTime.momentParse = function (dateStr) {
	        if (typeof moment === 'undefined') {
	            console.error("momentjs is required with dateFormat.\n        please add <script src=\"moment.min.js\"></script>\"> in your html.");
	        }
	        return moment(dateStr).toDate();
	    };
	    DateTime.formatDate = function (d, dateOnly) {
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
	    DateTime.parse = function (dateStr) {
	        dateStr = DateTime.removeTimezone(dateStr);
	        dateStr = dateStr + DateTime.addDSTOffset(dateStr);
	        return DateTime.getDateFromString(dateStr);
	    };
	    //remove timezone
	    DateTime.removeTimezone = function (dateStr) {
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
	    DateTime.addDSTOffset = function (dateStr) {
	        var date = DateTime.getDateFromString(dateStr);
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
	    DateTime.getDateFromString = function (dateStr) {
	        var tmp = dateStr.split(/[\+\-:\ T]/); // split by dash, colon or space
	        return new Date(parseInt(tmp[0], 10), parseInt(tmp[1], 10) - 1, parseInt(tmp[2], 10), parseInt(tmp[3] || '0', 10), parseInt(tmp[4] || '0', 10), parseInt(tmp[5] || '0', 10));
	    };
	    DateTime = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], DateTime);
	    return DateTime;
	}());
	exports.DateTime = DateTime;


/***/ },
/* 5 */
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
	var core_1 = __webpack_require__(1);
	var datetime_1 = __webpack_require__(4);
	//@TODO
	// . display currently selected day
	/**
	 * show a selected date in monthly calendar
	 */
	var DateTimePickerComponent = (function () {
	    function DateTimePickerComponent(elementRef, dateTime, cdRef) {
	        this.dateTime = dateTime;
	        this.cdRef = cdRef;
	        this.changes = new core_1.EventEmitter();
	        this.closing = new core_1.EventEmitter();
	        this.el = elementRef.nativeElement;
	    }
	    Object.defineProperty(DateTimePickerComponent.prototype, "year", {
	        get: function () {
	            return this.selectedDate.getFullYear();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DateTimePickerComponent.prototype, "month", {
	        get: function () {
	            return this.selectedDate.getMonth();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DateTimePickerComponent.prototype, "day", {
	        get: function () {
	            return this.selectedDate.getDate();
	        },
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
	        this.selectedDate = date;
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
	        this.changes.emit({
	            selectedDate: this.selectedDate,
	            hour: this.hour,
	            minute: this.minute
	        });
	        this.closing.emit(true);
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
	            template: "\n<div class=\"datetime-picker\" tabindex=\"0\">\n\n  <!-- Month - Year  -->\n  <div class=\"month\">\n    <button type=\"button\" class=\"prev\" (click)=\"updateMonthData(-1)\">&laquo;</button>\n     <span title=\"{{dateTime.months[monthData.month].fullName}}\">\n           {{dateTime.months[monthData.month].shortName}}\n     </span>\n    {{monthData.year}}\n    <button type=\"button\" class=\"next\" (click)=\"updateMonthData(+1)\">&raquo;</button>\n  </div>\n\n  <div class=\"days\">\n\n    <!-- Su Mo Tu We Th Fr Sa -->\n    <div class=\"day-of-week\"\n         *ngFor=\"let dayOfWeek of dateTime.localizedDaysOfWeek\"\n         [ngClass]=\"{weekend: dayOfWeek.weekend}\"\n         title=\"{{dayOfWeek.fullName}}\">\n      {{dayOfWeek.shortName}}\n    </div>\n\n    <!-- Fill up blank days for this month -->\n    <div *ngIf=\"monthData.leadingDays.length < 7\">\n      <div class=\"day\" *ngFor=\"let dayNum of monthData.leadingDays\"\n           [ngClass]=\"{weekend: [0,6].indexOf(toDate(monthData.year, monthData.month-1, dayNum).getDay()) !== -1}\">\n        {{dayNum}}\n      </div>\n    </div>\n\n    <div class=\"day selectable\"\n         *ngFor=\"let dayNum of monthData.days\"\n         (click)=\"selectDate(dayNum)\"\n         title=\"{{monthData.year}}-{{monthData.month+1}}-{{dayNum}}\"\n         [ngClass]=\"{\n           selected:\n             toDate(monthData.year, monthData.month, dayNum).getTime() === toDateOnly(selectedDate).getTime(),\n           today:\n             toDate(monthData.year, monthData.month, dayNum).getTime() === today.getTime(),\n           weekend:\n             [0,6].indexOf(toDate(monthData.year, monthData.month, dayNum).getDay()) !== -1\n         }\">\n      {{dayNum}}\n    </div>\n\n    <!-- Fill up blank days for this month -->\n    <div *ngIf=\"monthData.trailingDays.length < 7\">\n      <div class=\"day\"\n           *ngFor=\"let dayNum of monthData.trailingDays\"\n           [ngClass]=\"{weekend: [0,6].indexOf(toDate(monthData.year, monthData.month+1, dayNum).getDay()) !== -1}\">\n        {{dayNum}}\n      </div>\n    </div>\n  </div>\n\n  <!-- Time -->\n  <div class=\"days\" id=\"time\" *ngIf=\"!dateOnly\">\n    <label class=\"timeLabel\">Time:</label>\n    <span class=\"timeValue\">\n      {{(\"0\"+hour).slice(-2)}} : {{(\"0\"+minute).slice(-2)}}\n    </span><br/>\n    <label class=\"hourLabel\">Hour:</label>\n    <input class=\"hourInput\"\n           (change)=\"selectDate()\"\n           type=\"range\" min=\"0\" max=\"23\" [(ngModel)]=\"hour\" />\n    <label class=\"minutesLabel\">Min:</label>\n    <input class=\"minutesInput\"\n           (change)=\"selectDate()\"\n           type=\"range\" min=\"0\" max=\"59\" range=\"10\" [(ngModel)]=\"minute\"/>\n  </div>\n</div>\n\n<!--<hr/>-->\n<!--Date: {{selectedDate}}<br/>-->\n<!--Hour: {{hour}} Minute: {{minute}}<br/>-->\n  ",
	            styles: [
	                "\n @keyframes slideDown {\n  0% {\n    transform:  translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n.datetime-picker {\n    color: #333;\n    outline-width: 0;\n    font: normal 14px sans-serif;\n    border: 1px solid #ddd;\n    display: inline-block;\n    background: #fff;\n    animation: slideDown 0.1s ease-in-out;\n    animation-fill-mode: both;\n}\n.datetime-picker > .month {\n    text-align: center;\n    line-height: 22px;\n    padding: 10px;\n    background: #fcfcfc;\n    text-transform: uppercase;\n    font-weight: bold;\n    border-bottom: 1px solid #ddd;\n    position: relative;\n}\n.datetime-picker > .month > button {\n    color: #555;\n    font: normal 14px sans-serif;\n    outline: none;\n    position: absolute;\n    background: transparent;\n    border: none;\n    cursor: pointer;\n}\n.datetime-picker > .month > button:hover {\n    color: #333;\n}\n.datetime-picker > .month > button.prev {\n    left: 10px;\n}\n.datetime-picker > .month > button.next {\n    right: 10px;\n}\n.datetime-picker > .days {\n    width: 210px; /* 30 x 7 */\n    margin: 10px;\n    text-align: center;\n}\n.datetime-picker > .days .day-of-week,\n.datetime-picker > .days .day {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    border: 1px solid transparent;\n    width: 30px;\n    line-height: 28px;\n    float: left;\n}\n.datetime-picker > .days .day-of-week {\n    font-weight: bold;\n}\n.datetime-picker > .days .day-of-week.weekend {\n    color: #ccc;\n    background-color: inherit;\n}\n.datetime-picker > .days .day:not(.selectable) {\n    color: #ccc;\n    cursor: default;\n}\n.datetime-picker > .days .weekend {\n    color: #ccc;\n    background-color: #eee;\n}\n.datetime-picker > .days .day.selectable  {\n    cursor: pointer;\n}\n.datetime-picker > .days .day.selected {\n    background: gray;\n    color: #fff;\n}\n.datetime-picker > .days .day:not(.selected).selectable:hover {\n    background: #eee;\n}\n.datetime-picker > .days:after {\n    content: '';\n    display: block;\n    clear: left;\n    height: 0;\n}\n.datetime-picker .hourLabel,\n.datetime-picker .minutesLabel {\n    display: inline-block;\n    width: 40px;\n    text-align: right;\n}\n.datetime-picker input[type=range] {\n    width: 150px;\n}\n  "
	            ],
	            encapsulation: core_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, datetime_1.DateTime, core_1.ChangeDetectorRef])
	    ], DateTimePickerComponent);
	    return DateTimePickerComponent;
	}());
	exports.DateTimePickerComponent = DateTimePickerComponent;


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
	var core_1 = __webpack_require__(1);
	var datetime_picker_component_1 = __webpack_require__(5);
	var datetime_1 = __webpack_require__(4);
	/**
	 * To simplify the implementation, it limits the type if value to string only, not a date
	 * If the given string is not a valid date, it defaults back to today
	 */
	var DateTimePickerDirective = (function () {
	    function DateTimePickerDirective(_resolver, _viewContainerRef) {
	        var _this = this;
	        this._resolver = _resolver;
	        this._viewContainerRef = _viewContainerRef;
	        /**
	         * @deprecated
	         */
	        this.ngModelChange = new core_1.EventEmitter();
	        this.valueChange = new core_1.EventEmitter();
	        this._keyEventListener = function (e) {
	            if (e.keyCode === 27) {
	                _this.hideDatetimePicker();
	            }
	        };
	        this.hideDatetimePicker = function (event) {
	            if (_this._componentRef) {
	                if (event && event.type === 'click' &&
	                    event.target !== _this._el && !_this._elementIn(event.target, _this._datetimePicker)) {
	                    _this._componentRef.destroy();
	                    _this._componentRef = undefined;
	                }
	                else if (!event) {
	                    _this._componentRef.destroy();
	                    _this._componentRef = undefined;
	                }
	            }
	        };
	        this._el = this._viewContainerRef.element.nativeElement;
	    }
	    DateTimePickerDirective.prototype.ngOnInit = function () {
	        //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
	        var wrapper = document.createElement("div");
	        wrapper.className = 'ng2-datetime-picker';
	        wrapper.style.display = 'inline-block';
	        wrapper.style.position = 'relative';
	        this._el.parentElement.insertBefore(wrapper, this._el.nextSibling);
	        wrapper.appendChild(this._el);
	        this._registerEventListeners();
	    };
	    DateTimePickerDirective.prototype.ngOnChanges = function (changes) {
	        var _this = this;
	        if (changes['value'] !== undefined || changes['ngModel'] !== undefined) {
	            if (changes['ngModel'] !== undefined) {
	                this.value = this.ngModel;
	            }
	            var dateNgModel_1;
	            if (typeof this.value === 'string') {
	                //remove timezone and respect day light saving time
	                dateNgModel_1 = this.dateFormat ?
	                    datetime_1.DateTime.momentParse('' + this.value) :
	                    datetime_1.DateTime.parse('' + this.value);
	            }
	            else if (this.value instanceof Date) {
	                dateNgModel_1 = this.value;
	            }
	            else {
	                dateNgModel_1 = new Date();
	            }
	            var formatted = void 0;
	            if (this.dateFormat) {
	                formatted = datetime_1.DateTime.momentFormatDate(dateNgModel_1, this.dateFormat);
	            }
	            else {
	                formatted = datetime_1.DateTime.formatDate(dateNgModel_1, this.dateOnly);
	            }
	            this._el['value'] = formatted;
	            this._value = dateNgModel_1;
	            // @deprecated
	            if (this.dateFormat) {
	                dateNgModel_1.toString = function () {
	                    return datetime_1.DateTime.momentFormatDate(dateNgModel_1, _this.dateFormat);
	                };
	            }
	            else {
	                dateNgModel_1.toString = function () {
	                    return datetime_1.DateTime.formatDate(dateNgModel_1, _this.dateOnly);
	                };
	            }
	            setTimeout(function () {
	                _this.ngModelChange.emit(dateNgModel_1);
	            });
	            this._initDate();
	        }
	    };
	    DateTimePickerDirective.prototype.ngOnDestroy = function () {
	        // add a click listener to document, so that it can hide when others clicked
	        document.body.removeEventListener('click', this.hideDatetimePicker);
	        this._el.removeEventListener('keyup', this._keyEventListener);
	        if (this._datetimePicker) {
	            this._datetimePicker.removeEventListener('keyup', this._keyEventListener);
	        }
	    };
	    //show datetimePicker below the current element
	    DateTimePickerDirective.prototype.showDatetimePicker = function () {
	        var _this = this;
	        if (this._componentRef) {
	            return;
	        }
	        var factory = this._resolver.resolveComponentFactory(datetime_picker_component_1.DateTimePickerComponent);
	        this._componentRef = this._viewContainerRef.createComponent(factory);
	        this._datetimePicker = this._componentRef.location.nativeElement;
	        this._datetimePicker.addEventListener('keyup', this._keyEventListener);
	        this._initDate();
	        this._styleDatetimePicker();
	        var component = this._componentRef.instance;
	        component.changes.subscribe(function (changes) {
	            var newNgModel = new Date(changes.selectedDate);
	            newNgModel.setHours(parseInt(changes.hour, 10));
	            newNgModel.setMinutes(parseInt(changes.minute, 10));
	            var formatted;
	            if (_this.dateFormat) {
	                formatted = datetime_1.DateTime.momentFormatDate(newNgModel, _this.dateFormat);
	            }
	            else {
	                formatted = datetime_1.DateTime.formatDate(newNgModel, _this.dateOnly);
	            }
	            _this._el['value'] = formatted;
	            _this._value = newNgModel;
	            _this.valueChange.emit(newNgModel);
	            // @deprecated
	            if (_this.dateFormat) {
	                newNgModel.toString = function () {
	                    return datetime_1.DateTime.momentFormatDate(newNgModel, _this.dateFormat);
	                };
	            }
	            else {
	                newNgModel.toString = function () {
	                    return datetime_1.DateTime.formatDate(newNgModel, _this.dateOnly);
	                };
	            }
	            _this.ngModelChange.emit(newNgModel);
	        });
	        component.closing.subscribe(function () {
	            if (_this.closeOnSelect !== "false") {
	                _this.hideDatetimePicker();
	            }
	        });
	    };
	    DateTimePickerDirective.prototype._elementIn = function (el, containerEl) {
	        while (el = el.parentNode) {
	            if (el === containerEl)
	                return true;
	        }
	        return false;
	    };
	    DateTimePickerDirective.prototype._initDate = function () {
	        if (this._componentRef) {
	            var component = this._componentRef.instance;
	            component.initDateTime(this._value);
	            component.dateOnly = this.dateOnly;
	        }
	    };
	    DateTimePickerDirective.prototype._registerEventListeners = function () {
	        // add a click listener to document, so that it can hide when others clicked
	        document.body.addEventListener('click', this.hideDatetimePicker);
	        this._el.addEventListener('keyup', this._keyEventListener);
	    };
	    DateTimePickerDirective.prototype._styleDatetimePicker = function () {
	        var _this = this;
	        // setting width/height auto complete
	        var thisElBCR = this._el.getBoundingClientRect();
	        this._datetimePicker.style.width = thisElBCR.width + 'px';
	        this._datetimePicker.style.position = 'absolute';
	        this._datetimePicker.style.zIndex = '1000';
	        this._datetimePicker.style.left = '0';
	        this._datetimePicker.style.transition = 'height 0.3s ease-in';
	        this._datetimePicker.style.visibility = 'hidden';
	        setTimeout(function () {
	            var thisElBcr = _this._el.getBoundingClientRect();
	            var datetimePickerElBcr = _this._datetimePicker.getBoundingClientRect();
	            if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) {
	                // if not enough space to show on below, show above
	                _this._datetimePicker.style.bottom = '0';
	            }
	            else {
	                // otherwise, show below
	                _this._datetimePicker.style.top = thisElBcr.height + 'px';
	            }
	            _this._datetimePicker.style.visibility = 'visible';
	        });
	    };
	    ;
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
	        __metadata('design:type', Date)
	    ], DateTimePickerDirective.prototype, "ngModel", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], DateTimePickerDirective.prototype, "ngModelChange", void 0);
	    __decorate([
	        core_1.Input('value'), 
	        __metadata('design:type', Object)
	    ], DateTimePickerDirective.prototype, "value", void 0);
	    __decorate([
	        core_1.Output('valueChange'), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], DateTimePickerDirective.prototype, "valueChange", void 0);
	    DateTimePickerDirective = __decorate([
	        core_1.Directive({
	            selector: '[datetime-picker], [ng2-datetime-picker]',
	            providers: [datetime_1.DateTime],
	            host: {
	                '(click)': 'showDatetimePicker()'
	            }
	        }), 
	        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
	    ], DateTimePickerDirective);
	    return DateTimePickerDirective;
	}());
	exports.DateTimePickerDirective = DateTimePickerDirective;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ng2-datetime-picker.umd.js.map