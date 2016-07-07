import {Component, Input, ElementRef,  ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {DateTime} from './datetime';
import {ChangeDetectorRef} from "@angular/core";

//@TODO
// . display currently selected day

/**
 * show a selected date in monthly calendar
 */
@Component({
  providers: [DateTime],
  selector: 'datetime-picker',
  moduleId: module.id,
  templateUrl: './datetime-picker.html',
  styleUrls: ['./datetime-picker.css'],
  encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.Emulated is default
})
export class DateTimePickerComponent {

  /**
   * public variables
   */
  public dateOnly: boolean;
  
  public selectedDate: Date; //currently selected date
  public hour: number;
  public minute: number;
  
  public el: HTMLElement; // this component element
  public monthData: any;  // month calendar data

  public changes: Subject<any> = new Subject();
  public closing: Subject<any> = new Subject();

  /**
   * constructor
   */
  constructor(elementRef: ElementRef, public dateTime: DateTime, public cdRef: ChangeDetectorRef) {
    this.el = elementRef.nativeElement;
  }

  // ngOnInit(): void {
  //   console.log(' on init');
  // }
  // ngAfterContentInit(): void {
  //   console.log('after content init');
  // }
  // ngAfterViewInit(): void {
  //   console.log('after view init');
  // }

  private prevHour: number;
  private prevMinute: number;

  /**
   * getters
   */
  get year():   number { return this.selectedDate.getFullYear(); }
  get month():  number { return this.selectedDate.getMonth(); }
  get day():    number { return this.selectedDate.getDate(); }
  
  get today() {
    let dt = new Date();
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }
  
  initDateTime(date?: Date | String) {
    console.log('initDateTime', date, typeof date);
    if (typeof date === 'string') {
      date = this.dateTime.fromString(<string>date);
    }
    this.selectedDate = (<Date>date) || new Date();
    this.hour = this.selectedDate.getHours();
    this.minute = this.selectedDate.getMinutes();
    this.monthData = this.dateTime.getMonthData(this.year, this.month);
  }

  toDate(year: number, month: number, day: number): Date {
    return new Date(year, month, day);
  }
  
  toDateOnly(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0,0,0,0);
  }

  /**
   * set the selected date and close it when closeOnSelect is true
   * @param date {Date}
   */
  selectDate(dayNum?: number) {
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

  /**
   * show prev/next month calendar
   */
  updateMonthData(num: number) {
    this.monthData = this.dateTime.getMonthData(this.monthData.year, this.monthData.month+num);
  }

}