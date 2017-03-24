import {
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Host,
  Input, OnChanges, OnInit, Optional, Output,
  SimpleChanges, SkipSelf, ViewContainerRef
} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroup, FormGroupDirective} from '@angular/forms';
import {Ng2DatetimePickerComponent} from './ng2-datetime-picker.component';
import {Ng2Datetime} from './ng2-datetime';

declare var moment: any;

function isInteger(value) {
  if (Number.isInteger) {
    return Number.isInteger(value);
  }
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function isNaN(value) {
  if (Number.isNaN) {
    return Number.isNaN(value);
  }
  return value !== value;
};

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector : '[ng2-datetime-picker]',
  providers: [Ng2Datetime]
})
export class Ng2DatetimePickerDirective implements OnInit, OnChanges {
  @Input('date-format')       dateFormat: string;
  @Input('parse-format')      parseFormat: string;
  @Input('date-only')         dateOnly: boolean;
  @Input('time-only')         timeOnly: boolean;
  @Input('close-on-select')   closeOnSelect: boolean = true;
  @Input('default-value')     defaultValue: Date | string;
  @Input('minute-step')       minuteStep: number;
  @Input('min-date')          minDate: Date | string;
  @Input('max-date')          maxDate: Date | string;
  @Input('min-hour')          minHour: Date | number;
  @Input('max-hour')          maxHour: Date | number;
  @Input('disabled-dates')    disabledDates: Date[];
  @Input('show-close-layer')  showCloseLayer: boolean;
  @Input('show-week-numbers') showWeekNumbers: boolean;
  @Input() formControlName: string;

  @Input('ngModel')        ngModel: any;
  @Output('ngModelChange') ngModelChange = new EventEmitter();
  @Output('valueChanged')  valueChanged$  = new EventEmitter();
  @Output('popupClosed')   popupClosed$   = new EventEmitter();

  private el: HTMLInputElement;                                  /* input element */
  private ng2DatetimePickerEl: HTMLElement;                      /* dropdown element */
  private componentRef:ComponentRef<Ng2DatetimePickerComponent>; /* dropdown component reference */
  private ctrl: AbstractControl;
  private sub: any;
  // private justShown: boolean;

  inputEl: HTMLInputElement;
  clickedDatetimePicker: boolean;

  constructor (
    private resolver:ComponentFactoryResolver,
    private viewContainerRef:ViewContainerRef,
    @Optional() @Host() @SkipSelf() private parent: ControlContainer
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  /**
   * convert defaultValue, minDate, maxDate, minHour, and maxHour to proper types
   */
  normalizeInput() {
    if (this.defaultValue && typeof this.defaultValue === 'string') {
      let d = Ng2Datetime.parseDate(<string>this.defaultValue);
      this.defaultValue = isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.minDate && typeof this.minDate == 'string') {
      let d = Ng2Datetime.parseDate(<string>this.minDate);
      this.minDate = isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.maxDate && typeof this.maxDate == 'string') {
      let d = Ng2Datetime.parseDate(<string>this.maxDate);
      this.maxDate = isNaN(d.getTime()) ? new Date() : d;
    }

    if (this.minHour) {
      if (this.minHour instanceof Date) {
        this.minHour = (<Date>this.minHour).getHours();
      } else {
        let hour = Number(this.minHour.toString());
        if (!isInteger(hour) || hour > 23 || hour < 0) {
          this.minHour = undefined;
        }
      }
    }

    if (this.maxHour) {
      if (this.maxHour instanceof Date) {
        this.maxHour = (<Date>this.maxHour).getHours();
      } else {
        let hour = Number(this.maxHour.toString());
        if (!isInteger(hour) || hour > 23 || hour < 0) {
          this.maxHour = undefined;
        }
      }
    }
  }

  ngOnInit ():void {
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
          this.setInputElDateValue(date);
          this.updateDatepicker();
        });
      }
    }

    this.normalizeInput();

    //wrap this element with a <div> tag, so that we can position dynamic element correctly
    let wrapper            = document.createElement("div");
    wrapper.className      = 'ng2-datetime-picker-wrapper';
    this.el.parentElement.insertBefore(wrapper, this.el.nextSibling);
    wrapper.appendChild(this.el);

    if (this.ngModel && this.ngModel.getTime) { // if it is a Date object given, set dateValue and toString method
      this.ngModel.toString = () => Ng2Datetime.formatDate(this.ngModel, this.dateFormat, this.dateOnly);
    }
    setTimeout( () => { // after [(ngModel)] is applied
      if (this.el.tagName === 'INPUT') {
        this.inputElValueChanged(this.el.value); //set this.el.dateValue and reformat this.el.value
      }
      if(this.ctrl) {
        this.ctrl.markAsPristine();
      }
    });
  }

  ngAfterViewInit() {
    // if this element is not an input tag, move dropdown after input tag
    // so that it displays correctly
    this.inputEl = this.el.tagName === "INPUT" ?
        <HTMLInputElement>this.el : <HTMLInputElement>this.el.querySelector("input");

    if (this.inputEl) {
      this.inputEl.addEventListener('focus', this.showDatetimePicker);
      this.inputEl.addEventListener('blur', this.hideDatetimePicker);
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    let date;
    if(changes && changes['ngModel']) {
      date = changes['ngModel'].currentValue;

      if (date && typeof date !== 'string') {
        date.toString = () => Ng2Datetime.formatDate(date, this.dateFormat, this.dateOnly);
        this.setInputElDateValue(date);
        this.updateDatepicker();
      } else if (date && typeof date === 'string') {
        /** if program assigns a string value, then format to date later */
        setTimeout( () => {
          let dt = this.getDate(date);
          dt.toString = () => Ng2Datetime.formatDate(dt, this.dateFormat, this.dateOnly);
          this.ngModel = dt;
          this.inputEl.value = ''+dt;
        })
      }
    } 

  }

  updateDatepicker() {
    if(this.componentRef) {
      let component = this.componentRef.instance;
      component.defaultValue   = <Date>this.el['dateValue'];
    }
  }

  setInputElDateValue(date) {
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
  }

  /* input element string value is changed */
  inputElValueChanged = (date: string | Date): void => {
    this.setInputElDateValue(date);
    this.el.value = date.toString();
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
  showDatetimePicker = (event?): void =>  {
    if (this.componentRef) { /* if already shown, do nothing */
      return;
    }

    let factory = this.resolver.resolveComponentFactory(Ng2DatetimePickerComponent);

    this.componentRef   = this.viewContainerRef.createComponent(factory);
    this.ng2DatetimePickerEl = this.componentRef.location.nativeElement;
    this.ng2DatetimePickerEl.setAttribute('tabindex', '32767');
    this.ng2DatetimePickerEl.setAttribute('draggable', 'true');
    this.ng2DatetimePickerEl.addEventListener('mousedown', (event) => {
      this.clickedDatetimePicker = true
    });
    this.ng2DatetimePickerEl.addEventListener('mouseup', (event) => {
      this.clickedDatetimePicker = false;
    });
    //This is for material design. MD has click event to make blur to happen
    this.ng2DatetimePickerEl.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    this.ng2DatetimePickerEl.addEventListener('blur', (event) => {
      this.hideDatetimePicker();
    });
    this.ng2DatetimePickerEl.addEventListener('dragstart',this.drag_start,false);
    document.body.addEventListener('dragover',this.drag_over,false);
    document.body.addEventListener('drop',this.drop,false); 

    let component = this.componentRef.instance;
    component.defaultValue   = <Date>this.defaultValue || <Date>this.el['dateValue'];
    component.dateFormat     = this.dateFormat;
    component.dateOnly       = this.dateOnly;
    component.timeOnly       = this.timeOnly;
    component.minuteStep     = this.minuteStep;
    component.minDate        = <Date>this.minDate;
    component.maxDate        = <Date>this.maxDate;
    component.minHour        = <number>this.minHour;
    component.maxHour        = <number>this.maxHour;
    component.disabledDates  = this.disabledDates;
    component.showCloseButton = this.closeOnSelect === false;
    component.showCloseLayer = this.showCloseLayer;
    component.showWeekNumbers = this.showWeekNumbers;

    this.styleDatetimePicker();

    component.selected$.subscribe(this.dateSelected);
    component.closing$.subscribe(() => {
      this.hideDatetimePicker();
    });
    
    //Hack not to fire tab keyup event
    // this.justShown = true;
    // setTimeout(() => this.justShown = false, 100);
  };

  dateSelected = (date) => {
    this.el.tagName === 'INPUT' && this.inputElValueChanged(date);
    this.valueChanged$.emit(date);
    if (this.closeOnSelect !== false) {
      this.hideDatetimePicker();
    } else {
      this.ng2DatetimePickerEl.focus();
    }
  };

  hideDatetimePicker = (event?): any => {
    if (this.clickedDatetimePicker) {
      return false;
    } else {  /* invoked by function call */
      setTimeout(() => { //having exception without setTimeout
        if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = undefined;
        }
        this.popupClosed$.emit(true);
      })
    }
    event && event.stopPropagation();
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
    // this.ng2DatetimePickerEl.style.minWidth      = thisElBCR.width + 'px';
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

  private getDate = (arg: any): Date  => {
    let date: Date = <Date>arg;
    if (typeof arg === 'string') {
      date =  Ng2Datetime.parseDate(arg, this.parseFormat, this.dateFormat);
    }
    return date;
  }

  private drag_start = (event) => {
   if (document.activeElement.tagName == 'INPUT') {
      event.preventDefault();
      return false; // block dragging
   }
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
      (parseInt(style.getPropertyValue("left"),10) - event.clientX)
      + ',' 
      + (parseInt(style.getPropertyValue("top"),10) - event.clientY)
    );
  }

  private drag_over(event) {
    event.preventDefault();
    return false;
  } 

  private drop = (event) => {
    var offset = event.dataTransfer.getData("text/plain").split(',');
    this.ng2DatetimePickerEl.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    this.ng2DatetimePickerEl.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    this.ng2DatetimePickerEl.style.bottom = '';
    event.preventDefault();
    return false;
  } 
}
