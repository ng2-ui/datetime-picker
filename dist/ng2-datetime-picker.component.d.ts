import { ElementRef, ChangeDetectorRef, EventEmitter, AfterViewInit } from '@angular/core';
import { Ng2Datetime } from './ng2-datetime';
/**
 * show a selected date in monthly calendar
 */
export declare class Ng2DatetimePickerComponent implements AfterViewInit {
    ng2Datetime: Ng2Datetime;
    cdRef: ChangeDetectorRef;
    dateOnly: boolean;
    timeOnly: boolean;
    selectedDate: Date;
    hour: number;
    minute: number;
    minuteStep: number;
    firstDayOfWeek: string;
    defaultValue: Date;
    minDate: Date;
    maxDate: Date;
    minHour: number;
    maxHour: number;
    disabledDates: Date[];
    selected$: EventEmitter<any>;
    closing$: EventEmitter<any>;
    hours: ElementRef;
    minutes: ElementRef;
    el: HTMLElement;
    monthData: any;
    disabledDatesInTime: number[];
    constructor(elementRef: ElementRef, ng2Datetime: Ng2Datetime, cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    year: number;
    month: number;
    day: number;
    today: Date;
    initDatetime(date: Date): void;
    toDate(day: number, month?: number): Date;
    toDateOnly(date: Date): Date;
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
}
