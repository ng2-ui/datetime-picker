import { ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Ng2Datetime } from './ng2-datetime';
/**
 * show a selected date in monthly calendar
 */
export declare class Ng2DatetimePickerComponent {
    ng2Datetime: Ng2Datetime;
    cdRef: ChangeDetectorRef;
    dateFormat: string;
    dateOnly: boolean;
    timeOnly: boolean;
    selectedDate: Date;
    hour: number;
    minute: number;
    minuteStep: number;
    defaultValue: Date;
    minDate: Date;
    maxDate: Date;
    minHour: number;
    maxHour: number;
    disabledDates: Date[];
    showCloseButton: boolean;
    showCloseLayer: boolean;
    selected$: EventEmitter<any>;
    closing$: EventEmitter<any>;
    hours: ElementRef;
    minutes: ElementRef;
    el: HTMLElement;
    monthData: any;
    disabledDatesInTime: number[];
    locale: any;
    constructor(elementRef: ElementRef, ng2Datetime: Ng2Datetime, cdRef: ChangeDetectorRef);
    year: number;
    month: number;
    day: number;
    today: Date;
    isWeekend(dayNum: number, month?: number): boolean;
    ngOnInit(): void;
    toDate(day: number, month?: number): Date;
    toDateOnly(date: Date): Date;
    selectCurrentTime(): void;
    /**
     * set the selected date and close it when closeOnSelect is true
     * @param date {Date}
     */
    selectDateTime(date?: Date): boolean;
    /**
     * show prev/next month calendar
     */
    updateMonthData(num: number): void;
    isDateDisabled(date: Date): boolean;
    close(): void;
}
