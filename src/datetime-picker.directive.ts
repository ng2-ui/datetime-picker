import {
  Directive,
  Input,
  Output,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  ComponentFactoryResolver,
  SimpleChanges
} from '@angular/core';
import {DateTimePickerComponent} from './datetime-picker.component';
import {DateTime} from './datetime';

/**
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector : '[datetime-picker], [ng2-datetime-picker]',
  providers: [DateTime],
  host     : {
    '(click)': 'showDatetimePicker()',
    '(focus)': 'showDatetimePicker()',
    '(change)': 'valueChanged()'
  }
})
export class DateTimePickerDirective {
  @Input('date-format')     dateFormat:string;
  @Input('date-only')       dateOnly:boolean;
  @Input('close-on-select') closeOnSelect:string;

  @Input('ngModel')        ngModel: any;
  @Output('ngModelChange') ngModelChange = new EventEmitter();

  private el: HTMLInputElement;                               /* input element */
  private datetimePickerEl: HTMLElement;                      /* dropdown element */
  private componentRef:ComponentRef<DateTimePickerComponent>; /* dropdown component reference */

  public constructor (
    private resolver:ComponentFactoryResolver,
    private viewContainerRef:ViewContainerRef
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  public ngOnInit ():void {
    //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
    let wrapper            = document.createElement("div");
    wrapper.className      = 'ng2-datetime-picker';
    wrapper.style.display  = 'inline-block';
    wrapper.style.position = 'relative';
    this.el.parentElement.insertBefore(wrapper, this.el.nextSibling);
    wrapper.appendChild(this.el);

    // add a click listener to document, so that it can hide when others clicked
    document.body.addEventListener('click', this.hideDatetimePicker);
    this.el.addEventListener('keyup', this.keyEventListener);
    setTimeout( () => { // after [(ngModel)] is applied
      this.valueChanged(this.el.value);
    });
  }

  public ngOnDestroy ():void {
    // add a click listener to document, so that it can hide when others clicked
    document.body.removeEventListener('click', this.hideDatetimePicker);
    this.el.removeEventListener('keyup', this.keyEventListener);

    if (this.datetimePickerEl) {
      this.datetimePickerEl.removeEventListener('keyup', this.keyEventListener);
    }
  }

  /* input element string value is changed */
  valueChanged = (date: string | Date): void => {
    if (typeof date === 'string' && date) {
      this.el['dateValue'] = this.getDate(date);
    } else if (typeof date === 'object') {
      this.el['dateValue'] = date;
    }

    this.el.value = this.getFormattedDateStr();

    this.ngModel = this.el['dateValue'];
    this.ngModel.toString = () => { return this.el.value; };
    this.ngModelChange.emit(this.ngModel);
  };

  //show datetimePicker element below the current element
  public showDatetimePicker() {
    if (this.componentRef) { /* if already shown, do nothing */
      return;
    }

    let factory = this.resolver.resolveComponentFactory(DateTimePickerComponent);

    this.componentRef   = this.viewContainerRef.createComponent(factory);
    this.datetimePickerEl = this.componentRef.location.nativeElement;
    this.datetimePickerEl.addEventListener('keyup', this.keyEventListener);

    let component = this.componentRef.instance;
    component.initDateTime(<Date>this.el['dateValue']);
    component.dateOnly = this.dateOnly;

    this.styleDatetimePicker();

    component.changes.subscribe(this.valueChanged);
    component.closing.subscribe(() => {
      this.closeOnSelect !== "false" && this.hideDatetimePicker();
    });
  }

  public hideDatetimePicker = (event?):void => {
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
    }
  };

  private keyEventListener = (e:KeyboardEvent):void => {
    if (e.keyCode === 27) { //ESC key
      this.hideDatetimePicker();
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
        // if not enough space to show on below, show above
        this.datetimePickerEl.style.bottom = '0';
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
      if (this.dateFormat) {
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
      if (this.dateFormat) {
        date = DateTime.momentParse(arg);
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