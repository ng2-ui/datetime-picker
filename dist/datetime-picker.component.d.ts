import { ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { DateTime } from './datetime';
/**
 * show a selected date in monthly calendar
 */
export declare class DateTimePickerComponent {
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
    constructor(elementRef: ElementRef, dateTime: DateTime, cdRef: ChangeDetectorRef);
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly today: Date;
    initDateTime(date: Date): void;
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
