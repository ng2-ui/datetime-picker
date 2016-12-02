import { ElementRef, ChangeDetectorRef, EventEmitter, AfterViewInit } from '@angular/core';
import { DateTime } from './datetime';
/**
 * show a selected date in monthly calendar
 */
export declare class DateTimePickerComponent implements AfterViewInit {
    dateTime: DateTime;
    cdRef: ChangeDetectorRef;
    /**
     * public variables
     */
    dateOnly: boolean;
    selectedDate: Date;
    hour: number;
    minute: number;
    el: HTMLElement;
    monthData: any;
    changes: EventEmitter<any>;
    closing: EventEmitter<any>;
    private _hours;
    private _minutes;
    constructor(elementRef: ElementRef, dateTime: DateTime, cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly today: Date;
    initDateTime(date: Date, defaultValue: Date): void;
    toDate(year: number, month: number, day: number): Date;
    toDateOnly(date: Date): Date;
    /**
     * set the selected date and close it when closeOnSelect is true
     * @param date {Date}
     */
    selectDate(dayNum?: number): void;
    /**
     * show prev/next month calendar
     */
    updateMonthData(num: number): void;
}
