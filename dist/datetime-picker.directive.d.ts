import { ViewContainerRef, EventEmitter, ComponentFactoryResolver } from '@angular/core';
/**
 * If the given string is not a valid date, it defaults back to today
 */
export declare class DateTimePickerDirective {
    private resolver;
    private viewContainerRef;
    dateFormat: string;
    dateOnly: boolean;
    closeOnSelect: string;
    ngModel: any;
    ngModelChange: EventEmitter<{}>;
    private el;
    private datetimePickerEl;
    private componentRef;
    constructor(resolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    valueChanged: (date: string | Date) => void;
    showDatetimePicker(): void;
    hideDatetimePicker: (event?: any) => void;
    private keyEventListener;
    private elementIn(el, containerEl);
    private styleDatetimePicker();
    /**
     *  returns toString function of date object
     */
    private getFormattedDateStr();
    private getDate(arg);
}
