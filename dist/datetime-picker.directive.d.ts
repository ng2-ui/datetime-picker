import { ViewContainerRef, EventEmitter, OnInit, ComponentFactoryResolver } from '@angular/core';
/**
 * To simplify the implementation, it limits the type if ngModel to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
export declare class DateTimePickerDirective implements OnInit {
    private _resolver;
    private _viewContainerRef;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    dateFormat: string;
    dateOnly: boolean;
    closeOnSelect: string;
    ngModel: Date;
    ngModelChange: EventEmitter<{}>;
    private _componentRef;
    private _el;
    private _datetimePickerEl;
    private _keyEventListener;
    constructor(_resolver: ComponentFactoryResolver, _viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    showDatetimePicker(): void;
    hideDatetimePicker(): void;
    private _registerEventListeners();
    private _styleDatetimePicker();
}
