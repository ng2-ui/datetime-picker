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
import {AbstractControl, ControlContainer, FormGroup} from '@angular/forms';
import {DateTimePickerComponent} from './datetime-picker.component';
import {DateTime} from './datetime';

declare var moment: any;

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector : '[datetime-picker], [ng2-datetime-picker]',
  providers: [DateTime],
  host     : {
    '(click)': 'showDatetimePicker()',
    '(focus)': 'showDatetimePicker()'
  }
})
export class DateTimePickerDirective implements OnInit, OnChanges {
  @Input('date-format')     dateFormat: string;
  @Input('date-only')       dateOnly: boolean;
  @Input('time-only')       timeOnly: boolean;
  @Input('close-on-select') closeOnSelect: string;
  @Input('first-day-of-week') firstDayOfWeek: string;
  @Input('default-value')   defaultValue: Date;
  @Input('minute-step')     minuteStep: number;
  @Input('min-date')        minDate: Date;
  @Input('max-date')        maxDate: Date;
  @Input('min-hour')        minHour: Date;
  @Input('max-hour')        maxHour: Date;
  @Input('disabled-dates')  disabledDates: Date[];
  @Input() formControlName: string;

  @Input('ngModel')        ngModel: any;
  @Output('ngModelChange') ngModelChange = new EventEmitter();

  private el: HTMLInputElement;                               /* input element */
  private datetimePickerEl: HTMLElement;                      /* dropdown element */
  private componentRef:ComponentRef<DateTimePickerComponent>; /* dropdown component reference */
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

  ngOnInit ():void {
    if(this.parent && this.parent["form"] && this.formControlName) {
      this.ctrl = (<FormGroup>this.parent["form"]).get(this.formControlName);
      this.sub = this.ctrl.valueChanges.subscribe((date) => {
        this.setElement(date)
        this.updateDatepicker();
      })
    }

    //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
    let wrapper            = document.createElement("div");
    wrapper.className      = 'ng2-datetime-picker';
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
      component.initDateTime(<Date>this.el['dateValue']);
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

    this.ngModel = this.el['dateValue'];
    if (this.ngModel) {
      this.ngModel.toString = () => { return this.el.value; };
      this.ngModelChange.emit(this.ngModel);
    } 
  };

  //show datetimePicker element below the current element
  showDatetimePicker(event?) {
    if (this.componentRef) { /* if already shown, do nothing */
      return;
    }

    let factory = this.resolver.resolveComponentFactory(DateTimePickerComponent);

    this.componentRef   = this.viewContainerRef.createComponent(factory);
    this.datetimePickerEl = this.componentRef.location.nativeElement;
    this.datetimePickerEl.addEventListener('keyup', this.keyEventListener);

    let component = this.componentRef.instance;
    component.defaultValue   = this.defaultValue;
    component.dateOnly       = this.dateOnly;
    component.timeOnly       = this.timeOnly;
    component.minuteStep     = this.minuteStep;
    component.minDate        = this.minDate;
    component.maxDate        = this.maxDate;
    component.minHour        = this.minHour;
    component.maxHour        = this.maxHour;
    component.disabledDates  = this.disabledDates;
    component.firstDayOfWeek = this.firstDayOfWeek;

    component.initDateTime(<Date>this.el['dateValue']);
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
        !this.elementIn(event.target, this.datetimePickerEl)
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
    this.datetimePickerEl.style.width      = thisElBCR.width + 'px';
    this.datetimePickerEl.style.position   = 'absolute';
    this.datetimePickerEl.style.zIndex     = '1000';
    this.datetimePickerEl.style.left       = '0';
    this.datetimePickerEl.style.transition = 'height 0.3s ease-in';

    this.datetimePickerEl.style.visibility = 'hidden';

    setTimeout(() => {
      let thisElBcr           = this.el.getBoundingClientRect();
      let datetimePickerElBcr = this.datetimePickerEl.getBoundingClientRect();

      if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) {
        this.datetimePickerEl.style.bottom =
          (thisElBcr.bottom - window.innerHeight + 15) + 'px';
      }
      else {
        // otherwise, show below
        this.datetimePickerEl.style.top = thisElBcr.height + 'px';
      }
      this.datetimePickerEl.style.visibility = 'visible';
    });
  };

  /**
   *  returns toString function of date object
   */
  private getFormattedDateStr(): string {
    if (this.el['dateValue']) {
      if (this.dateFormat && typeof moment !== 'undefined') {
        return  DateTime.momentFormatDate(this.el['dateValue'], this.dateFormat);
      } else {
        return DateTime.formatDate(this.el['dateValue'], this.dateOnly);
      }
    } else {
      return null;
    }
  }

  private getDate(arg: string): Date {
    let date: Date;
    if (typeof arg === 'string') {
      if (this.dateFormat && typeof moment !== 'undefined') {
        date = DateTime.momentParse(arg, this.dateFormat);
      } else {
        //remove timezone and respect day light saving time
        date = DateTime.parse(arg);
      }
    } else {
      date = <Date>arg;
    }
    return date;
  }
}
