import { ComponentRef, ViewContainerRef, EventEmitter, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DateTimePickerComponent } from "./datetime-picker.component";
import { DateTime } from "./datetime";
/**
 * To simplify the implementation, it limits the type if ngModel to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
export declare class DateTimePickerDirective implements OnInit {
    private resolver;
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
    componentRef: ComponentRef<DateTimePickerComponent>;
    el: HTMLElement;
    datetimePickerEl: HTMLElement;
    constructor(resolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, dateTime: DateTime);
    ngOnInit(): void;
    ngOnDestroy(): void;
    registerEventListeners(): void;
    keyEventListener: (evt: KeyboardEvent) => void;
    showDatetimePicker($event: any): void;
    styleDatetimePicker: () => void;
    hideDatetimePicker: (event?: any) => void;
    private elementIn(el, containerEl);
}
