declare var moment: any;

import {Injectable} from "@angular/core";

@Injectable()
export class DateTime {
  months: any[];
  days: number[];
  firstDayOfWeek: number;
  daysOfWeek: any[];
  localizedDaysOfWeek: any[];
  public static customFirstDayOfWeek: number = 0;

  constructor() {
    this.initialize();
  }

  initialize() {
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

    this.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    /**
     * According to International Standard ISO 8601, Monday is the first day of the week
     * followed by Tuesday, Wednesday, Thursday, Friday, Saturday,
     * and with Sunday as the seventh and final day.
     * However, in Javascript Sunday is 0, Monday is 1.. and so on
     */
    this.daysOfWeek = [
      {fullName: 'Sunday', shortName: 'Su', weekend: true},
      {fullName: 'Monday', shortName: 'Mo'},
      {fullName: 'Tuesday', shortName: 'Tu'},
      {fullName: 'Wednesday', shortName: 'We'},
      {fullName: 'Thursday', shortName: 'Th'},
      {fullName: 'Friday', shortName: 'Fr'},
      {fullName: 'Saturday', shortName: 'Sa', weekend: true}
    ];

    /**
     * if momentjs is available, use momentjs localized months, week, etc.
     */
    if (typeof moment !== 'undefined') {
      this.months = this.months.map( function(el, index) {
        el.fullName = moment.months()[index];
        el.shortName = moment.monthsShort()[index];
        return el;
      });
      this.daysOfWeek = this.daysOfWeek.map( function(el, index) {
        el.fullName = moment.weekdays()[index];
        el.shortName = moment.weekdaysShort()[index].substr(0,2);
        return el;
      });
      this.firstDayOfWeek = moment.localeData().firstDayOfWeek();
    }

    this.firstDayOfWeek = this.firstDayOfWeek || 0;

    if (DateTime.customFirstDayOfWeek !== undefined) {
      this.firstDayOfWeek = DateTime.customFirstDayOfWeek;
    }

    this.localizedDaysOfWeek = this.daysOfWeek
      .concat(this.daysOfWeek)
      .splice(this.firstDayOfWeek, 7);
  }

  getMonthData(year: number, month: number): any {
    year = month > 11 ? year+1 :
      month < 0 ? year-1 : year;
    month = (month + 12) % 12;

    let firstDayOfMonth = new Date(year, month, 1);
    let lastDayOfMonth = new Date(year, month + 1, 0);
    let lastDayOfPreviousMonth = new Date(year, month, 0);
    let daysInMonth = lastDayOfMonth.getDate();
    let daysInLastMonth = lastDayOfPreviousMonth.getDate();
    let dayOfWeek = firstDayOfMonth.getDay();

    // Ensure there are always leading days to give context
    let leadingDays = (dayOfWeek - this.firstDayOfWeek + 7) % 7 || 7;
    let trailingDays = this.days.slice(0, 6 * 7 - (leadingDays + daysInMonth));
    if (trailingDays.length > 7) {
      trailingDays = trailingDays.slice(0, trailingDays.length-7);
    }

    let monthData = {
      year: year,
      month: month,
      days: this.days.slice(0, daysInMonth),
      leadingDays: this.days.slice(- leadingDays - (31 - daysInLastMonth), daysInLastMonth),
      trailingDays: trailingDays
    };

    return monthData;
  };

  static momentFormatDate(d: Date, dateFormat: string): string {
    if (typeof moment === 'undefined') {
      console.error(`momentjs is required with dateFormat.
        please add <script src="moment.min.js"></script>"> in your html.`)
    }
    return moment(d).format(dateFormat);
  }

  static momentParse(dateStr: string, dateFormat: string): Date {
    if (typeof moment === 'undefined') {
      console.error(`momentjs is required with dateFormat.
        please add <script src="moment.min.js"></script>"> in your html.`)
    }
    //return moment(dateStr).toDate();
    let date = moment(dateStr, dateFormat).toDate();
    if (isNaN(date.getTime())) { // if dateFormat and dateStr does not match
      date = moment(dateStr).toDate(); //parse as ISO format
    }
    return date;
  }

  static formatDate(d: Date, dateOnly: boolean): string {
    // return d.toLocaleString('en-us', hash); // IE11 does not understand this
    let pad0 = function(number) {
      return ("0"+number).slice(-2);
    };

    var ret = d.getFullYear() +'-' + pad0(d.getMonth() + 1) + '-' + pad0(d.getDate());
    if(!dateOnly) {
      ret += ' ' + pad0(d.getHours()) + ':' + pad0(d.getMinutes());
    }
    return ret;
  }

  //return date as given from given string
  // without considering timezone and day light saving time considered
  static parse(dateStr: string): Date {
    dateStr = DateTime.removeTimezone(dateStr);
    dateStr = dateStr + DateTime.addDSTOffset(dateStr);

    return DateTime.getDateFromString(dateStr);
  }

  //remove timezone
  static removeTimezone(dateStr): string {
    // if no time is given, add 00:00:00 at the end
    let matches = dateStr.match(/[0-9]{2}:/);
    dateStr += matches ? '' : ' 00:00:00';
    return dateStr.replace(/([0-9]{2}-[0-9]{2})-([0-9]{4})/,'$2-$1')  //mm-dd-yyyy to yyyy-mm-dd
      .replace(/([\/-][0-9]{2,4})\ ([0-9]{2}\:[0-9]{2}\:)/,'$1T$2')   //reformat for FF
      .replace(/EDT|EST|CDT|CST|MDT|PDT|PST|UT|GMT/g,'')              //remove timezone
      .replace(/\s*\(\)\s*/,'')                                       //remove timezone
      .replace(/[\-\+][0-9]{2}:?[0-9]{2}$/,'')                        //remove timezone
      .replace(/000Z$/,'00');                                         //remove timezone
  }

  static addDSTOffset(dateStr): string {
    let date = DateTime.getDateFromString(dateStr);
    let jan = new Date(date.getFullYear(), 0, 1);
    let jul = new Date(date.getFullYear(), 6, 1);
    let stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    let isDST = date.getTimezoneOffset() < stdTimezoneOffset;
    let offset = isDST ? stdTimezoneOffset - 60 : stdTimezoneOffset;
    let diff = offset >=0 ? '-' : '+';
    offset = Math.abs(offset);
    return diff +
      ('0'+ (offset / 60)).slice(-2) + ':' +
      ('0'+ (offset % 60)).slice(-2);
  };

  static getDateFromString(dateStr): Date {
    let tmp = dateStr.split(/[\+\-:\ T]/); // split by dash, colon or space
    return  new Date(
      parseInt(tmp[0], 10),
      parseInt(tmp[1], 10) - 1,
      parseInt(tmp[2], 10),
      parseInt(tmp[3]||'0', 10),
      parseInt(tmp[4]||'0', 10),
      parseInt(tmp[5]||'0', 10)
    );
  }

  static setFirstDayOfWeek(firstDayOfWeek: number) {
    DateTime.customFirstDayOfWeek = firstDayOfWeek;
  }
}

