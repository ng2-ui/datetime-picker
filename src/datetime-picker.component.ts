import {
  Input,
  Output,
  Component,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectorRef,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {DateTime} from './datetime';

//@TODO
// . display currently selected day

/**
 * show a selected date in monthly calendar
 */
@Component({
  providers    : [DateTime],
  selector     : 'datetime-picker',
  template     : `
<div class="datetime-picker" tabindex="0">

  <!-- Month - Year  -->
  <div class="month" *ngIf="!timeOnly">
    <b class="prev_next prev" (click)="updateMonthData(-12)">&laquo;</b>
    <b class="prev_next prev" (click)="updateMonthData(-1)">&lsaquo;</b>
     <span title="{{dateTime.months[monthData.month]?.fullName}}">
           {{dateTime.months[monthData.month]?.shortName}}
     </span>
    {{monthData.year}}
    <b class="prev_next next" (click)="updateMonthData(+12)">&raquo;</b>
    <b class="prev_next next" (click)="updateMonthData(+1)">&rsaquo;</b>
  </div>

  <!-- Date -->
  <div class="days" *ngIf="!timeOnly">

    <!-- Su Mo Tu We Th Fr Sa -->
    <div class="day-of-week"
         *ngFor="let dayOfWeek of dateTime.localizedDaysOfWeek"
         [ngClass]="{weekend: dayOfWeek.weekend}"
         title="{{dayOfWeek.fullName}}">
      {{dayOfWeek.shortName}}
    </div>

    <!-- Fill up blank days for this month -->
    <div *ngIf="monthData.leadingDays.length < 7">
      <div class="day" *ngFor="let dayNum of monthData.leadingDays"
           [ngClass]="{weekend: [0,6].indexOf(toDate(dayNum, monthData.month-1).getDay()) !== -1}">
        {{dayNum}}
      </div>
    </div>

    <div class="day"
         *ngFor="let dayNum of monthData.days"
         (click)="selectDate(toDate(dayNum))"
         title="{{monthData.year}}-{{monthData.month+1}}-{{dayNum}}"
         [ngClass]="{
           selectable: !isDateDisabled(toDate(dayNum)),
           selected:
             toDate(dayNum).getTime() === toDateOnly(selectedDate).getTime(),
           today:
             toDate(dayNum).getTime() === today.getTime(),
           weekend:
             [0,6].indexOf(toDate(dayNum).getDay()) !== -1
         }">
      {{dayNum}}
    </div>

    <!-- Fill up blank days for this month -->
    <div *ngIf="monthData.trailingDays.length < 7">
      <div class="day"
           *ngFor="let dayNum of monthData.trailingDays"
           [ngClass]="{weekend: [0,6].indexOf(toDate(dayNum, monthData.month+1).getDay()) !== -1}">
        {{dayNum}}
      </div>
    </div>
  </div>

  <!-- Time -->
  <div class="days" id="time" *ngIf="!dateOnly">
    <label class="timeLabel">Time:</label>
    <span class="timeValue">
      {{("0"+hour).slice(-2)}} : {{("0"+minute).slice(-2)}}
    </span><br/>
    <label class="hourLabel">Hour:</label>
    <input #hours class="hourInput"
           (change)="selectDate()"
           type="range"
           min="{{minHour || 0}}"
           max="{{maxHour || 23}}"
           [(ngModel)]="hour" />
    <label class="minutesLabel">Min:</label>
    <input #minutes class="minutesInput"
           step="{{minuteStep}}"
           (change)="selectDate()"
           type="range" min="0" max="59" range="10" [(ngModel)]="minute"/>
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

.ng2-datetime-picker {
    position: relative;
}

.datetime-picker {
    color: #333;
    outline-width: 0;
    font: normal 14px sans-serif;
    border: 1px solid #ddd;
    display: inline-block;
    background: #fff;
    animation: slideDown 0.1s ease-in-out;
    animation-fill-mode: both;
}
.datetime-picker > .month {
    text-align: center;
    line-height: 22px;
    padding: 10px;
    background: #fcfcfc;
    text-transform: uppercase;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    position: relative;
}
.datetime-picker > .month > .prev_next {
    color: #555;
    display: block;
    font: normal 24px sans-serif;
    outline: none;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 15px;
    text-align: center;
}
.datetime-picker > .month > .prev_next:hover {
  background-color: #333;
  color: #fff;
}
.datetime-picker > .month > .prev_next.prev {
  float: left;
}
.datetime-picker > .month > .prev_next.next {
  float: right;
}
.datetime-picker > .days {
    width: 210px; /* 30 x 7 */
    margin: 10px;
    text-align: center;
}
.datetime-picker > .days .day-of-week,
.datetime-picker > .days .day {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    border: 1px solid transparent;
    width: 30px;
    line-height: 28px;
    float: left;
}
.datetime-picker > .days .day-of-week {
    font-weight: bold;
}
.datetime-picker > .days .day-of-week.weekend {
    color: #ccc;
    background-color: inherit;
}
.datetime-picker > .days .day:not(.selectable) {
    color: #ccc;
    cursor: default;
}
.datetime-picker > .days .weekend {
    color: #ccc;
    background-color: #eee;
}
.datetime-picker > .days .day.selectable  {
    cursor: pointer;
}
.datetime-picker > .days .day.selected {
    background: gray;
    color: #fff;
}
.datetime-picker > .days .day:not(.selected).selectable:hover {
    background: #eee;
}
.datetime-picker > .days:after {
    content: '';
    display: block;
    clear: left;
    height: 0;
}
.datetime-picker .hourLabel,
.datetime-picker .minutesLabel {
    display: inline-block;
    width: 40px;
    text-align: right;
}
.datetime-picker input[type=range] {
    width: 200px;
}
  `
  ],
  encapsulation: ViewEncapsulation.None
})
export class DateTimePickerComponent implements AfterViewInit {
  @Input('date-only')         dateOnly: boolean;
  @Input('time-only')         timeOnly: boolean;
  @Input('selected-date')     selectedDate: Date;
  @Input('hour')              hour: number;
  @Input('minute')            minute: number;
  @Input('minuteStep')        minuteStep: number = 1;
  @Input('first-day-of-week') firstDayOfWeek: string;
  @Input('default-value')     defaultValue: Date;
  @Input('min-date')          minDate: Date;
  @Input('max-date')          maxDate: Date;
  @Input('min-hour')          minHour: Date;
  @Input('max-hour')          maxHour: Date;
  @Input('disabled-dates')    disabledDates: Date[];

  @Output('changes')   changes:EventEmitter<any> = new EventEmitter();
  @Output('closing')   closing:EventEmitter<any> = new EventEmitter();

  @ViewChild('hours')   hours:ElementRef;
  @ViewChild('minutes') minutes:ElementRef;

  public el:HTMLElement; // this component element
  public monthData:any;  // month calendar data
  public disabledDatesInTime: number[];

  public constructor (elementRef:ElementRef, public dateTime:DateTime, public cdRef:ChangeDetectorRef) {
    this.el = elementRef.nativeElement;
    if (this.firstDayOfWeek !== undefined) {
      DateTime.setFirstDayOfWeek(parseInt(this.firstDayOfWeek));
    }
  }

  public ngAfterViewInit ():void {
    let stopPropagation = (e: Event) => e.stopPropagation();
    if (!this.dateOnly) {
      this.hours.nativeElement.addEventListener('keyup', stopPropagation);
      this.hours.nativeElement.addEventListener('mousedown', stopPropagation);
      this.minutes.nativeElement.addEventListener('keyup', stopPropagation);
      this.minutes.nativeElement.addEventListener('mousedown', stopPropagation);
    }
  }

  public get year ():number {
    return this.selectedDate.getFullYear();
  }

  public get month ():number {
    return this.selectedDate.getMonth();
  }

  public get day ():number {
    return this.selectedDate.getDate();
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

  public initDateTime (date:Date) {
    this.selectedDate = date || this.defaultValue || new Date();
    this.hour         = this.selectedDate.getHours();
    this.minute       = this.selectedDate.getMinutes();
    this.monthData    = this.dateTime.getMonthData(this.year, this.month);
  }

  public toDate (day:number, month?: number):Date {
    return new Date(this.monthData.year, month || this.monthData.month, day);
  }

  public toDateOnly (date:Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  /**
   * set the selected date and close it when closeOnSelect is true
   * @param date {Date}
   */
  public selectDate(date?: Date) {
    this.selectedDate = date || this.selectedDate;
    if (this.isDateDisabled(this.selectedDate)) {
      return false;
    }
    this.selectedDate.setHours(parseInt( ''+this.hour || '0', 10));
    this.selectedDate.setMinutes(parseInt( ''+this.minute|| '0', 10));
    this.changes.emit(this.selectedDate);
    this.closing.emit(true);
  };

  /**
   * show prev/next month calendar
   */
  public updateMonthData (num:number) {
    this.monthData = this.dateTime.getMonthData(this.monthData.year, this.monthData.month + num);
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

}
