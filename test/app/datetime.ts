import {Injectable} from "@angular/core";

@Injectable()
export class DateTime {

  public months = [
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

  public days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  public daysOfWeek = [
    {fullName: 'Monday', shortName: 'Mo'},
    {fullName: 'Tuesday', shortName: 'Tu'},
    {fullName: 'Wednesday', shortName: 'We'},
    {fullName: 'Thursday', shortName: 'Th'},
    {fullName: 'Friday', shortName: 'Fr'},
    {fullName: 'Saturday', shortName: 'Sa'},
    {fullName: 'Sunday', shortName: 'Su'}
  ];
  public firstDayOfWeek = 0;

  getMonthData(year: number, month: number): any {
    year = month > 11 ? year+1 :
           month < 0 ? year-1 :
           year;
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

    return {
      year: year,
      month: month,
      days: this.days.slice(0, daysInMonth),
      leadingDays: this.days.slice(- leadingDays - (31 - daysInLastMonth), daysInLastMonth),
      trailingDays: trailingDays
    };
  };
  
  //return date as given from given string
  // without considering timezone and day light saving time considered
  fromString(dateStr): Date {
    dateStr = this.removeTimezone(dateStr);
    dateStr = this.addDSTOffset(dateStr);

    var d = new Date(dateStr);
    return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    );
  }
  
  //remove timezone
  private removeTimezone(dateStr): string {
    // if no time is given, add 00:00:00 at the end
    dateStr += !dateStr.match(/[0-9]{2}:/) ? '' : ' 00:00:00'; 
    return dateStr.replace(/([0-9]{2}-[0-9]{2})-([0-9]{4})/,'$2-$1')  //mm-dd-yyyy to yyyy-mm-dd
      .replace(/([\/-][0-9]{2,4})\ ([0-9]{2}\:[0-9]{2}\:)/,'$1T$2')   //reformat for FF
      .replace(/EDT|EST|CDT|CST|MDT|PDT|PST|UT|GMT/g,'')              //remove timezone
      .replace(/\s*\(\)\s*/,'')                                       //remove timezone
      .replace(/[\-\+][0-9]{2}:?[0-9]{2}$/,'');                       //remove timezone
  }

  private addDSTOffset(dateStr): string {
    let date = new Date(dateStr);
    let jan = new Date(date.getFullYear(), 0, 1);
    let jul = new Date(date.getFullYear(), 6, 1);
    let stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    let isDST = date.getTimezoneOffset() < stdTimezoneOffset;
    let offset = isDST ? stdTimezoneOffset - 60 : stdTimezoneOffset;
    let diff = offset >=0 ? '-' : '+';
    return diff +
        ('0'+ (offset / 60)).slice(-2) + ':' +
        ('0'+ (offset % 60)).slice(-2);
  };

}

