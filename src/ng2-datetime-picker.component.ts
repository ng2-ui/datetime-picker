import {
  Input,
  Output,
  Component,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectorRef,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {Ng2Datetime} from './ng2-datetime';

declare var moment: any;

//@TODO
// . display currently selected day

/**
 * show a selected date in monthly calendar
 */
@Component({
  providers    : [Ng2Datetime],
  selector     : 'ng2-datetime-picker',
  template     : `
  <div class="closing-layer" (click)="close()" *ngIf="showCloseLayer" ></div>
  <div class="ng2-datetime-picker">
    <div class="close-button" *ngIf="showCloseButton" (click)="close()"></div>
    
    <!-- Month - Year  -->
    <div class="month" *ngIf="!timeOnly">
      <b class="prev_next prev year" (click)="updateMonthData(-12)">&laquo;</b>
      <b class="prev_next prev month" (click)="updateMonthData(-1)">&lsaquo;</b>
       <span title="{{monthData?.fullName}}">
         {{monthData?.shortName}}
       </span>
       <span (click)="showYearSelector = true">
        {{monthData.year}}
       </span>
      <b class="prev_next next year" (click)="updateMonthData(+12)">&raquo;</b>
      <b class="prev_next next month" (click)="updateMonthData(+1)">&rsaquo;</b>
    </div>

    <!-- Week number / Days  -->
    <div class="week-numbers-and-days"
      [ngClass]="{'show-week-numbers': !timeOnly && showWeekNumbers}">
      <!-- Week -->
      <div class="week-numbers" *ngIf="!timeOnly && showWeekNumbers">
        <div class="week-number" *ngFor="let weekNumber of monthData.weekNumbers">
          {{weekNumber}}
        </div>
      </div>
      
      <!-- Date -->
      <div class="days" *ngIf="!timeOnly">

        <!-- Su Mo Tu We Th Fr Sa -->
        <div class="day-of-week"
             *ngFor="let dayOfWeek of monthData.localizedDaysOfWeek; let ndx=index"
             [class.weekend]="isWeekend(ndx + monthData.firstDayOfWeek)"
             title="{{dayOfWeek.fullName}}">
          {{dayOfWeek.shortName}}
        </div>

        <!-- Fill up blank days for this month -->
        <div *ngIf="monthData.leadingDays.length < 7">
          <div class="day"
              (click)="updateMonthData(-1)"
               *ngFor="let dayNum of monthData.leadingDays">
            {{dayNum}}
          </div>
        </div>

        <div class="day"
             *ngFor="let dayNum of monthData.days"
             (click)="selectDateTime(toDate(dayNum))"
             title="{{monthData.year}}-{{monthData.month+1}}-{{dayNum}}"
             [ngClass]="{
               selectable: !isDateDisabled(toDate(dayNum)),
               selected: toDate(dayNum).getTime() === toDateOnly(selectedDate).getTime(),
               today: toDate(dayNum).getTime() === today.getTime(),
               weekend: isWeekend(dayNum, monthData.month)
             }">
          {{dayNum}}
        </div>

        <!-- Fill up blank days for this month -->
        <div *ngIf="monthData.trailingDays.length < 7">
          <div class="day"
               (click)="updateMonthData(+1)"
               *ngFor="let dayNum of monthData.trailingDays">
            {{dayNum}}
          </div>
        </div>
      </div>
    </div>

    <div class="shortcuts" *ngIf="showTodayShortcut">
      <a href="#" (click)="selectToday()">Today</a>
    </div>

    <!-- Hour Minute -->
    <div class="time" id="time" *ngIf="!dateOnly">
      <div class="select-current-time" (click)="selectCurrentTime()">{{locale.currentTime}}</div>
      <label class="timeLabel">{{locale.time}}</label>
      <span class="timeValue">
        {{("0"+hour).slice(-2)}} : {{("0"+minute).slice(-2)}}
      </span><br/>
      <div>
        <label class="hourLabel">{{locale.hour}}:</label>
        <input #hours class="hourInput"
               tabindex="90000"
               (change)="selectDateTime()"
               type="range"
               min="{{minHour || 0}}"
               max="{{maxHour || 23}}"
               [(ngModel)]="hour" />
      </div>
      <div>
        <label class="minutesLabel">{{locale.minute}}:</label>
        <input #minutes class="minutesInput"
               tabindex="90000"
               step="{{minuteStep}}"
               (change)="selectDateTime()"
               type="range" min="0" max="59" range="10" [(ngModel)]="minute"/>
      </div>
    </div>

    <!-- Year Selector -->
    <div class="year-selector" *ngIf="showYearSelector">
      <div class="locale">
        <b>{{locale.year}}</b>
      </div>
      <span class="year" 
        *ngFor="let year of yearsSelectable"
        (click)="selectYear(year)">
        {{year}}
      </span>
    </div>
  </div>
  `,
  styles       : [
    `
@keyframes slideDown {
  0% {
    transform:  translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}

.ng2-datetime-picker-wrapper {
  position: relative;
}

.ng2-datetime-picker {
  color: #333;
  outline-width: 0;
  font: normal 14px sans-serif;
  border: 1px solid #ddd;
  display: inline-block;
  background: #fff;
  animation: slideDown 0.1s ease-in-out;
  animation-fill-mode: both;
}
.ng2-datetime-picker .days {
  width: 210px; /* 30 x 7 days */
}
.ng2-datetime-picker .close-button {
  position: absolute;
  width: 1em;
  height: 1em;
  right: 0;
  z-index: 1;
  padding: 0 5px;
}
.ng2-datetime-picker .close-button:before {
  content: 'X';
  cursor: pointer;
  color: #ff0000;
}
.ng2-datetime-picker > .month {
  text-align: center;
  line-height: 22px;
  padding: 10px;
  background: #fcfcfc;
  text-transform: uppercase;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  position: relative;
}

.ng2-datetime-picker > .month > .prev_next {
  color: #555;
  display: block;
  font: normal 24px sans-serif;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 25px;
  text-align: center;
}
.ng2-datetime-picker > .month > .prev_next:hover {
  background-color: #333;
  color: #fff;
}
.ng2-datetime-picker > .month > .prev_next.prev {
  float: left;
}
.ng2-datetime-picker > .month > .prev_next.next {
  float: right;
}

.ng2-datetime-picker .week-numbers-and-days {
  text-align: center;
}
.ng2-datetime-picker .week-numbers {
  line-height: 30px;
  display: inline-block;
  padding: 30px 0 0 0;
  color: #ddd;
  text-align: right;
  width: 21px;
  vertical-align: top;
}

.ng2-datetime-picker  .days {
  display: inline-block;
  width: 210px; /* 30 x 7 */
  text-align: center;
  padding: 0 10px;
}
.ng2-datetime-picker .days .day-of-week,
.ng2-datetime-picker .days .day {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  border: 1px solid transparent;
  width: 30px;
  line-height: 28px;
  float: left;
}
.ng2-datetime-picker .days .day-of-week {
  font-weight: bold;
}
.ng2-datetime-picker .days .day-of-week.weekend {
  color: #ccc;
  background-color: inherit;
}
.ng2-datetime-picker .days .day:not(.selectable) {
  color: #ccc;
  cursor: default;
}
.ng2-datetime-picker .days .weekend {
  color: #ccc;
  background-color: #eee;
}
.ng2-datetime-picker .days .day.selectable  {
  cursor: pointer;
}
.ng2-datetime-picker .days .day.selected {
  background: gray;
  color: #fff;
}
.ng2-datetime-picker .days .day:not(.selected).selectable:hover {
  background: #eee;
}
.ng2-datetime-picker .days:after {
  content: '';
  display: block;
  clear: left;
  height: 0;
}
.ng2-datetime-picker .time {
  position: relative;
  padding: 10px;
  text-transform: Capitalize;
}
.ng2-datetime-picker .year-selector {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  height: 100%;
  overflow: auto; 
  padding: 5px;
  z-index: 2;
}
.ng2-datetime-picker .year-selector .locale{
  text-align: center;
}
.ng2-datetime-picker .year-selector .year {
  display: inline-block;
  cursor: pointer;
  padding: 2px 5px;
}
.ng2-datetime-picker .year-selector .year:hover {
  background-color: #ddd;
}
.ng2-datetime-picker .select-current-time {
  position: absolute;
  top: 1em;
  right: 5px;
  z-index: 1;
  cursor: pointer;
  color: #0000ff;
}
.ng2-datetime-picker .hourLabel,
.ng2-datetime-picker .minutesLabel {
  display: inline-block;
  width: 45px;
  vertical-align: top;
}
.closing-layer {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0);
}

.ng2-datetime-picker .shortcuts {
  padding: 10px;
  text-align: center;
}

.ng2-datetime-picker .shortcuts a {
  font-family: Sans-serif;
  margin: 0 0.5em;
  text-decoration: none;
}

@media (max-width: 767px) {
  .ng2-datetime-picker {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;    
    width: auto !important;
    animation: slideUp 0.1s ease-in-out;
  }

  .ng2-datetime-picker > .days {
    display: block;
    margin: 0 auto;
  }

  .closing-layer {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.2);
  }
}
  `
  ],
  encapsulation: ViewEncapsulation.None
})
export class Ng2DatetimePickerComponent {
  @Input('date-format')       dateFormat: string;
  @Input('date-only')         dateOnly: boolean;
  @Input('time-only')         timeOnly: boolean;
  @Input('selected-date')     selectedDate: Date;
  @Input('hour')              hour: number;
  @Input('minute')            minute: number;
  @Input('minuteStep')        minuteStep: number = 1;
  @Input('default-value')     defaultValue: Date;
  @Input('min-date')          minDate: Date;
  @Input('max-date')          maxDate: Date;
  @Input('min-hour')          minHour: number;
  @Input('max-hour')          maxHour: number;
  @Input('disabled-dates')    disabledDates: Date[];
  @Input('show-close-button') showCloseButton: boolean;
  @Input('show-close-layer')  showCloseLayer: boolean;
  @Input('show-week-numbers') showWeekNumbers: boolean = false;
  @Input('show-today-shortcut') showTodayShortcut: boolean = false;

  @Output('selected$')  selected$:EventEmitter<any> = new EventEmitter();
  @Output('closing$')   closing$:EventEmitter<any> = new EventEmitter();

  @ViewChild('hours')   hours:ElementRef;
  @ViewChild('minutes') minutes:ElementRef;

  public el:HTMLElement; // this component element
  public disabledDatesInTime: number[];
  public locale = Ng2Datetime.locale;
  public showYearSelector = false;

  private _monthData: any;

  public constructor (
    elementRef: ElementRef,
    public ng2Datetime: Ng2Datetime,
    public cdRef: ChangeDetectorRef
  ) {
    this.el = elementRef.nativeElement;
  }

  public get yearsSelectable(): number[] {
    let startYear = this.year - 100;
    let endYear = this.year + 50;
    let years: number[] = [];
    for (let year = startYear; year < endYear; year++) {
      years.push(year);
    }
    return years;
  }

  public get year(): number {
    return this.selectedDate.getFullYear();
  }

  public get month(): number {
    return this.selectedDate.getMonth();
  }

  public get day(): number {
    return this.selectedDate.getDate();
  }

  public get monthData(): any {
    return this._monthData;
  }

  public get today ():Date {
    let dt = new Date();
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }

  public set year (year) {}
  public set month (month) {}
  public set day (day) {}
  public set today (today) {}

  public ngOnInit() {
    if(!this.defaultValue || isNaN(this.defaultValue.getTime())) {
      this.defaultValue = new Date();
    }
    this.selectedDate = this.defaultValue;

    // set hour and minute using moment if available to avoid having Javascript change timezones
    if (typeof moment === 'undefined') {
      this.hour         = this.selectedDate.getHours();
      this.minute       = this.selectedDate.getMinutes();
    } else {
      let m = moment(this.selectedDate);
      this.hour = m.hours();
      this.minute = m.minute();
    }

    this._monthData = this.ng2Datetime.getMonthData(this.year, this.month);
  }

  public isWeekend(dayNum: number, month?: number): boolean {
    if (typeof month === 'undefined') {
      return Ng2Datetime.weekends.indexOf(dayNum % 7) !== -1; //weekday index
    } else {
      let weekday = this.toDate(dayNum, month).getDay();
      return Ng2Datetime.weekends.indexOf(weekday) !== -1;
    }
  }

  public selectYear(year) {
    this._monthData = this.ng2Datetime.getMonthData(year, this._monthData.month);
    this.showYearSelector = false;
  }

  public toDate (day:number, month?: number):Date {
    return new Date(this._monthData.year, month || this._monthData.month, day);
  }

  public toDateOnly (date:Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  public selectCurrentTime(){
    this.hour = (new Date()).getHours();
    this.minute = (new Date()).getMinutes();
    this.selectDateTime();
  }

  /**
   * set the selected date and close it when closeOnSelect is true
   * @param date {Date}
   */
  public selectDateTime(date?: Date) {
    this.selectedDate = date || this.selectedDate;
    if (this.isDateDisabled(this.selectedDate)) {
      return false;
    }

    // editing hours and minutes via javascript date methods causes date to lose timezone info,
    // so edit using moment if available
    let hour = parseInt( '' + this.hour || '0', 10);
    let minute = parseInt( '' + this.minute || '0', 10);

    if (typeof moment !== 'undefined') {
      // here selected date has a time of 00:00 in local time,
      // so build moment by getting year/month/day separately
      // to avoid it saving as a day earlier
      let m = moment([this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()]);
      m.hours(hour);
      m.minutes(minute);
      this.selectedDate = m.toDate();
    } else {
      this.selectedDate.setHours(hour);
      this.selectedDate.setMinutes(minute);
    }
    //console.log('this.selectedDate', this.selectedDate)

    this.selectedDate.toString = () => {
      return Ng2Datetime.formatDate(this.selectedDate, this.dateFormat, this.dateOnly);
    };
    this.selected$.emit(this.selectedDate);
  };

  /**
   * show prev/next month calendar
   */
  public updateMonthData (num:number) {
    this._monthData = this.ng2Datetime.getMonthData(this._monthData.year, this._monthData.month + num);
  }

  public isDateDisabled(date: Date) {
    let dateInTime  = date.getTime();
    this.disabledDatesInTime =
      this.disabledDatesInTime || (this.disabledDates || []).map(d => d.getTime());

    if (this.minDate && (dateInTime < this.minDate.getTime())) {
      return true;
    } else if (this.maxDate && (dateInTime > this.maxDate.getTime())) {
      return true;
    } else if (this.disabledDatesInTime.indexOf(dateInTime) >= 0) {
      return true
    }

    return false;
  }

  public close() {
    this.closing$.emit(true);
  }

  public selectToday() {
    this.selectDateTime(new Date());
  }
}
