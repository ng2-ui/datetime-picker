import {
  Directive,
  Input,
  Output,
  OnInit,
  OnChanges,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  ComponentFactoryResolver,
  Optional,
  SimpleChanges,
  SkipSelf,
  Host
} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroup, FormGroupDirective} from '@angular/forms';
import {Ng2DatetimePickerComponent} from './ng2-datetime-picker.component';
import {Ng2Datetime} from './ng2-datetime';

declare var moment: any;

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

Number.isNaN = Number.isNaN || function(value) {
    return value !== value;
};

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector : '[ng2-datetime-picker]',
  providers: [Ng2Datetime],
  host     : {
    '(click)': 'showDatetimePicker()',
    '(focus)': 'showDatetimePicker()'
  }
})
export class Ng2DatetimePickerDirective implements OnInit, OnChanges {
  @Input('date-format')       dateFormat: string;
  @Input('date-only')         dateOnly: boolean;
  @Input('time-only')         timeOnly: boolean;
  @Input('close-on-select')   closeOnSelect: string;
  @Input('first-day-of-week') firstDayOfWeek: string;
  @Input('default-value')     defaultValue: Date | string;
  @Input('minute-step')       minuteStep: number;
  @Input('min-date')          minDate: Date | string;
  @Input('max-date')          maxDate: Date | string;
  @Input('min-hour')          minHour: Date | number;
  @Input('max-hour')          maxHour: Date | number;
  @Input('disabled-dates')  disabledDates: Date[];
  @Input() formControlName: string;

  @Input('ngModel')        ngModel: any;
  @Output('ngModelChange') ngModelChange = new EventEmitter();

  private el: HTMLInputElement;                               /* input element */
  private ng2DatetimePickerEl: HTMLElement;                      /* dropdown element */
  private componentRef:ComponentRef<Ng2DatetimePickerComponent>; /* dropdown component reference */
  private ctrl: AbstractControl;
  private sub: any;
  private justShown: boolean;

  constructor (
    private resolver:ComponentFactoryResolver,
    private viewContainerRef:ViewContainerRef,
    @Optional() @Host() @SkipSelf() private parent: ControlContainer
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  normalizeInput() {
    if (this.defaultValue && typeof this.defaultValue === 'string') {
      let d = Ng2Datetime.parse(<string>this.defaultValue);
      this.defaultValue = Number.isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.minDate && typeof this.minDate == 'string') {
      let d = Ng2Datetime.parse(<string>this.minDate);
      this.minDate = Number.isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.maxDate && typeof this.maxDate == 'string') {
      let d = Ng2Datetime.parse(<string>this.minDate);
      this.maxDate = Number.isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.minHour) {
      if (this.minHour instanceof Date) {
        this.minHour = (<Date>this.minHour).getHours();
      } else {
        let hour = Number(this.minHour.toString());
        if (!Number.isInteger(hour) || hour > 23 || hour < 0) {
          this.minHour = undefined;
        }
      }
    }

    if (this.maxHour) {
      if (this.maxHour instanceof Date) {
        this.maxHour = (<Date>this.maxHour).getHours();
      } else {
        let hour = Number(this.maxHour.toString());
        if (!Number.isInteger(hour) || hour > 23 || hour < 0) {
          this.maxHour = undefined;
        }
      }
    }
  }

  ngOnInit ():void {
    if (this.firstDayOfWeek) {
      Ng2Datetime.customFirstDayOfWeek = parseInt(this.firstDayOfWeek);
    }
    if(this.parent && this.formControlName) {
      if (this.parent["form"]) {
        this.ctrl = (<FormGroup>this.parent["form"]).get(this.formControlName);
      } else if (this.parent["name"]) {
        let formDir = this.parent.formDirective;
        if (formDir instanceof FormGroupDirective && formDir.form.get(this.parent["name"])) {
          this.ctrl = formDir.form.get(this.parent["name"]).get(this.formControlName);
        }
      }
      if (this.ctrl) {
        this.sub = this.ctrl.valueChanges.subscribe((date) => {
          this.setElement(date)
          this.updateDatepicker();
        });
      }
    }

    this.normalizeInput();

    //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
    let wrapper            = document.createElement("div");
    wrapper.className      = 'ng2-datetime-picker-wrapper';
    this.el.parentElement.insertBefore(wrapper, this.el.nextSibling);
    wrapper.appendChild(this.el);

    // add a click listener to document, so that it can hide when others clicked
    document.body.addEventListener('click', this.hideDatetimePicker);
    this.el.addEventListener('keyup', this.keyEventListener);
    setTimeout( () => { // after [(ngModel)] is applied
      this.valueChanged(this.el.value);
      if(this.ctrl) {
        this.ctrl.markAsPristine();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let date;
    if(changes && changes['ngModel']) {
      date = changes['ngModel'].currentValue;
    } 

    this.setElement(date);
    this.updateDatepicker();
  }

  updateDatepicker() {
    if(this.componentRef) {
      let component = this.componentRef.instance;
      component.initDatetime(<Date>this.el['dateValue']);
    }
  }

  setElement(date) {
    if (typeof date === 'string' && date) {
      this.el['dateValue'] = this.getDate(date);
    } else if (typeof date === 'object') {
      this.el['dateValue'] = date
    } else if (typeof date === 'undefined') {
      this.el['dateValue'] = null;
    }

    if(this.ctrl) {
      this.ctrl.markAsDirty();
    }
  }

  ngOnDestroy ():void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
    document.body.removeEventListener('click', this.hideDatetimePicker);
  }

  /* input element string value is changed */
  valueChanged = (date: string | Date): void => {
    this.setElement(date);

    this.el.value = this.getFormattedDateStr();

    if(this.ctrl) {
      this.ctrl.patchValue(this.el.value);
    }

    if (this.el['dateValue']) {
      // date formatting that occurs in multiple places causes an error
      // removal of redundant code
      this.ngModelChange.emit(this.el.value);
    } 
  };

  //show datetimePicker element below the current element
  showDatetimePicker(event?) {
    if (this.componentRef) { /* if already shown, do nothing */
      return;
    }

    let factory = this.resolver.resolveComponentFactory(Ng2DatetimePickerComponent);

    this.componentRef   = this.viewContainerRef.createComponent(factory);
    this.ng2DatetimePickerEl = this.componentRef.location.nativeElement;
    this.ng2DatetimePickerEl.addEventListener('keyup', this.keyEventListener);

    let component = this.componentRef.instance;
    component.defaultValue   = <Date>this.defaultValue;
    component.dateOnly       = this.dateOnly;
    component.timeOnly       = this.timeOnly;
    component.minuteStep     = this.minuteStep;
    component.minDate        = <Date>this.minDate;
    component.maxDate        = <Date>this.maxDate;
    component.minHour        = <number>this.minHour;
    component.maxHour        = <number>this.maxHour;
    component.disabledDates  = this.disabledDates;
    component.firstDayOfWeek = this.firstDayOfWeek;

    component.initDatetime(<Date>this.el['dateValue']);
    this.styleDatetimePicker();

    component.changes.subscribe(this.valueChanged);
    component.closing.subscribe(() => {
      this.closeOnSelect !== "false" && this.hideDatetimePicker();
    });
    
    //Hack not to fire tab keyup event
    this.justShown = true;
    setTimeout(() => this.justShown = false, 100);
  }

  hideDatetimePicker = (event?):void => {
    if (this.componentRef) {
      if (  /* invoked by clicking on somewhere in document */
        event &&
        event.type === 'click' &&
        event.target !== this.el &&
        !this.elementIn(event.target, this.ng2DatetimePickerEl)
      ) {
        this.componentRef.destroy();
        this.componentRef = undefined;
      } else if (!event) {  /* invoked by function call */
        this.componentRef.destroy();
        this.componentRef = undefined;
      }
    event && event.stopPropagation();  
    }
  };

  private keyEventListener = (e:KeyboardEvent):void => {
    if (e.keyCode === 27 || e.keyCode === 9 || e.keyCode === 13) { //ESC, TAB, ENTER keys
      if (!this.justShown) {
        this.hideDatetimePicker();
      }
    }
  };

  private elementIn (el:Node, containerEl:Node):boolean {
    while (el = el.parentNode) {
      if (el === containerEl) return true;
    }
    return false;
  }

  private styleDatetimePicker () {
    // setting position, width, and height of auto complete dropdown
    let thisElBCR                         = this.el.getBoundingClientRect();
    this.ng2DatetimePickerEl.style.width      = thisElBCR.width + 'px';
    this.ng2DatetimePickerEl.style.position   = 'absolute';
    this.ng2DatetimePickerEl.style.zIndex     = '1000';
    this.ng2DatetimePickerEl.style.left       = '0';
    this.ng2DatetimePickerEl.style.transition = 'height 0.3s ease-in';

    this.ng2DatetimePickerEl.style.visibility = 'hidden';

    setTimeout(() => {
      let thisElBcr           = this.el.getBoundingClientRect();
      let ng2DatetimePickerElBcr = this.ng2DatetimePickerEl.getBoundingClientRect();

      if (thisElBcr.bottom + ng2DatetimePickerElBcr.height > window.innerHeight) {
        this.ng2DatetimePickerEl.style.bottom =
          (thisElBcr.bottom - window.innerHeight + 15) + 'px';
      }
      else {
        // otherwise, show below
        this.ng2DatetimePickerEl.style.top = thisElBcr.height + 'px';
      }
      this.ng2DatetimePickerEl.style.visibility = 'visible';
    });
  };

  /**
   *  returns toString function of date object
   */
  private getFormattedDateStr(): string {
    if (this.el['dateValue']) {
      if (this.dateFormat && typeof moment !== 'undefined') {
        return  Ng2Datetime.momentFormatDate(this.el['dateValue'], this.dateFormat);
      } else {
        return Ng2Datetime.formatDate(this.el['dateValue'], this.dateOnly);
      }
    } else {
      return null;
    }
  }

  private getDate(arg: string): Date {
    let date: Date;
    if (typeof arg === 'string') {
      if (this.dateFormat && typeof moment !== 'undefined') {
        date = Ng2Datetime.momentParse(arg, this.dateFormat);
      } else {
        //remove timezone and respect day light saving time
        date = Ng2Datetime.parse(arg);
      }
    } else {
      date = <Date>arg;
    }
    return date;
  }
}
