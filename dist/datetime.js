"use strict";
var core_1 = require("@angular/core");
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
    NguiDatetime.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NguiDatetime.ctorParameters = function () { return []; };
    return NguiDatetime;
}());
exports.NguiDatetime = NguiDatetime;
//# sourceMappingURL=datetime.js.map