import { ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NguiDatetime } from './datetime';
/**
 * show a selected date in monthly calendar
 */
export declare class NguiDatetimePickerComponent {
    nguiDatetime: NguiDatetime;
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
    showWeekNumbers: boolean;
    showTodayShortcut: boolean;
    showAmPm: boolean;
    selected$: EventEmitter<any>;
    closing$: EventEmitter<any>;
    hours: ElementRef;
    minutes: ElementRef;
    el: HTMLElement;
    disabledDatesInTime: number[];
    locale: any;
    showYearSelector: boolean;
    private _monthData;
    private timeSuffix;
    constructor(elementRef: ElementRef, nguiDatetime: NguiDatetime, cdRef: ChangeDetectorRef);
    readonly yearsSelectable: number[];
    year: number;
    month: number;
    day: number;
    readonly monthData: any;
    today: Date;
    ngOnInit(): void;
    isWeekend(dayNum: number, month?: number): boolean;
    selectYear(year: any): void;
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
    selectToday(): void;
    private convertHours(hours);
}
