import {Component, Input, ElementRef} from '@angular/core';
import {DateTime} from './datetime';
import {ViewEncapsulation} from "@angular/core/src/metadata/view";

//@TODO
// . display currently selected day

/**
 * show a selected date in monthly calendar
 */
@Component({
  selector: 'datetime-picker',
  moduleId: module.id,
  templateUrl: './datetime-picker.html',
  styleUrls: ['./datetime-picker.css'],
  encapsulation: ViewEncapsulation.Native
  // encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.Emulated is default

})
export class DateTimePickerComponent {

  @Input() year: number;
  @Input() month: number;
  @Input() day: number;
  @Input() hour: number;
  @Input() minute: number;

  @Input() dateFormat: string;
  @Input() dateOnly: boolean;
  @Input() closeOnSelect: boolean;

  public selectedDate: Date;      //currently selected date
  public opened: boolean = false; //show/hide datetime picker
  
  public el: HTMLElement;
  public monthData: any;

  constructor(elementRef: ElementRef, public dateTime: DateTime) {
    this.el = elementRef.nativeElement;
    this.setSelectedDate(new Date());
    this.monthData = dateTime.getMonthData(this.year, this.month);
  }

  get today() {
    let dt = new Date();
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }
  
  toDateInt(year, month, day): number {
    return new Date(year, month, day, 0, 0, 0).getTime();
  }
  
  /**
   * open datetime picker under the give element in given options
   * @param triggerEl
   * @param options
   */
  openUnder(triggerEl, options): any {
    this.close();
    for(let key in options) {
      this[key] = options[key];
    }

    //show datetimePicker below triggerEl
    let targetBcr = triggerEl.getBoundingClientRect();

    //show element transparently then calculate width/height
    this.el.style.dispay = '';
    this.el.style.opacity = 0;
    this.el.style.position='absolute';
    let thisBcr = this.el.getBoundingClientRect();

    let left: number = targetBcr.width > thisBcr.width ?
      targetBcr.left + targetBcr.width - thisBcr.width + window.scrollX :
      targetBcr.left + window.scrollX;
    let top: number = targetBcr.top < 300 || window.innerHeight - targetBcr.bottom > 300 ?
      targetBcr.bottom + window.scrollY : targetBcr.top - thisBcr.height + window.scrollY;

    this.el.style.top = top + 'px';
    this.el.style.left = left + 'px';
    this.el.style.opacity = 1;

    document.body.addEventListener('click', this.close);
  };

  /**
   * close datetime picker
   */
  close() {
    this.opened = false
  }

  /**
   * set the selected date and close it when closeOnSelect is true
   * @param date {Date}
   */
  setSelectedDate(date: number) {
    let now = new Date();
    this.year = this.year || now.getFullYear();
    this.month =  this.month || now.getMonth();
    this.day = date || now.getDate();
    this.hour = this.hour || now.getHours();
    this.minute = this.minute || now.getMinutes();
    this.selectedDate = new Date(this.year, this.month, this.day, 0, 0, 0);
    this.closeOnSelect && (this.close());
  };

  /**
   * show next month calendar
   */
  showNextMonth() {
    this.monthData = this.dateTime.getMonthData(this.year, this.month+1);
  }

  /**
   * show previous month calendar
   */
  showPrevMonth() {
    this.monthData = this.dateTime.getMonthData(this.year, this.month-1);
  }

}