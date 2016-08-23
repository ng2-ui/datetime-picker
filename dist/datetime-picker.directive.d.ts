import { DynamicComponentLoader, ComponentRef, ViewContainerRef, EventEmitter, OnInit } from '@angular/core';
import { DateTime } from "./datetime";
/**
 * To simplify the implementation, it limits the type if ngModel to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
export declare class DateTimePickerDirective implements OnInit {
    dcl: DynamicComponentLoader;
    viewContainerRef: ViewContainerRef;
    dateTime: DateTime;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    dateFormat: string;
    dateOnly: boolean;
    closeOnSelect: string;
    ngModel: String;
    ngModelChange: EventEmitter<{}>;
    componentRef: Promise<ComponentRef<any>>;
    el: HTMLElement;
    datetimePickerEl: HTMLElement;
    constructor(dcl: DynamicComponentLoader, viewContainerRef: ViewContainerRef, dateTime: DateTime);
    ngOnInit(): void;
    ngOnDestroy(): void;
    registerEventListeners(): void;
    keyEventListener: (evt: KeyboardEvent) => void;
    showDatetimePicker($event: any): void;
    hideDatetimePicker(): Promise<any>;
    hideWhenOthersClicked: (event: any) => void;
    private elementIn(el, containerEl);
}
