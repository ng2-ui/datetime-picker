import { ViewContainerRef, EventEmitter, OnInit, ComponentFactoryResolver, SimpleChanges, OnChanges } from '@angular/core';
/**
 * To simplify the implementation, it limits the type if value to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
export declare class DateTimePickerDirective implements OnInit, OnChanges {
    private _resolver;
    private _viewContainerRef;
    dateFormat: string;
    dateOnly: boolean;
    closeOnSelect: string;
    /**
     * @deprecated
     */
    ngModel: Date;
    /**
     * @deprecated
     */
    ngModelChange: EventEmitter<any>;
    value: any;
    valueChange: EventEmitter<Date>;
    private _value;
    private _componentRef;
    private _el;
    private _datetimePicker;
    private _keyEventListener;
    constructor(_resolver: ComponentFactoryResolver, _viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    showDatetimePicker(): void;
    hideDatetimePicker: (event?: any) => void;
    private _elementIn(el, containerEl);
    private _initDate();
    private _registerEventListeners();
    private _styleDatetimePicker();
}
