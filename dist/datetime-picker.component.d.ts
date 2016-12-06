import { ElementRef, ChangeDetectorRef, EventEmitter, AfterViewInit } from '@angular/core';
import { DateTime } from './datetime';
/**
 * show a selected date in monthly calendar
 */
export declare class DateTimePickerComponent implements AfterViewInit {
    dateTime: DateTime;
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
    minHour: Date;
    maxHour: Date;
    disabledDates: Date[];
    changes: EventEmitter<any>;
    closing: EventEmitter<any>;
    hours: ElementRef;
    minutes: ElementRef;
    el: HTMLElement;
    monthData: any;
    disabledDatesInTime: number[];
    constructor(elementRef: ElementRef, dateTime: DateTime, cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    year: number;
    month: number;
    day: number;
    today: Date;
    initDateTime(date: Date): void;
    toDate(day: number, month?: number): Date;
    toDateOnly(date: Date): Date;
    /**
     * set the selected date and close it when closeOnSelect is true
     * @param date {Date}
     */
    selectDate(date?: Date): boolean;
    /**
     * show prev/next month calendar
     */
    updateMonthData(num: number): void;
    isDateDisabled(date: Date): boolean;
}
