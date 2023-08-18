import { ComponentFactoryResolver, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ControlContainer } from '@angular/forms';
/**
 * If the given string is not a valid date, it defaults back to today
 */
export declare class NguiDatetimePickerDirective implements OnInit, OnChanges {
    private resolver;
    private viewContainerRef;
    private parent;
    dateFormat: string;
    parseFormat: string;
    dateOnly: boolean;
    timeOnly: boolean;
    closeOnSelect: boolean;
    defaultValue: Date | string;
    minuteStep: number;
    minDate: Date | string;
    maxDate: Date | string;
    minHour: Date | number;
    maxHour: Date | number;
    disabledDates: Date[];
    showCloseLayer: boolean;
    showTodayShortcut: boolean;
    showWeekNumbers: boolean;
    formControlName: string;
    isDraggable: boolean;
    useUtc: boolean;
    currToday: boolean;
    ngModel: any;
    ngModelChange: EventEmitter<{}>;
    valueChanged$: EventEmitter<{}>;
    popupClosed$: EventEmitter<{}>;
    private el;
    private nguiDatetimePickerEl;
    private componentRef;
    private ctrl;
    private sub;
    inputEl: HTMLInputElement;
    clickedDatetimePicker: boolean;
    userModifyingValue: boolean;
    constructor(resolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, parent: ControlContainer);
    /**
     * convert defaultValue, minDate, maxDate, minHour, and maxHour to proper types
     */
    normalizeInput(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    handleKeyDown: (event: any) => void;
    ngOnChanges(changes: SimpleChanges): void;
    updateDatepicker(): void;
    setInputElDateValue(date: any): void;
    ngOnDestroy(): void;
    inputElValueChanged: (date: string | Date) => void;
    showDatetimePicker: (event?: any) => void;
    dateSelected: (date: any) => void;
    hideDatetimePicker: (event?: any) => any;
    private elementIn(el, containerEl);
    private styleDatetimePicker();
    private getDate;
    private drag_start;
    private drag_over(event);
    private drop;
}
