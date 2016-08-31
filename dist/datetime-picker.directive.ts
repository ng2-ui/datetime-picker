import {
  Directive,
  ElementRef,
  Input,
  Output,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  OnInit, ComponentFactoryResolver
} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DateTimePickerComponent} from "./datetime-picker.component";
import {DateTime} from "./datetime";

/**
 * To simplify the implementation, it limits the type if ngModel to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
  selector: '[datetime-picker], [ng2-datetime-picker]',
  providers: [DateTime],
  host: {
    '(click)': 'showDatetimePicker($event)'
  }
})
export class DateTimePickerDirective implements OnInit {

  @Input() year: number;
  @Input() month: number;
  @Input() day: number;
  @Input() hour: number;
  @Input() minute: number;

  @Input('date-format') dateFormat: string;
  @Input('date-only') dateOnly: boolean;
  @Input('close-on-select') closeOnSelect: string;

  @Input()  ngModel: Date;  //if string given, will be converted to Date
  @Output() ngModelChange = new EventEmitter();

  componentRef: ComponentRef<DateTimePickerComponent>;
  el: HTMLElement;
  datetimePickerEl: HTMLElement; // datetime picker element
  
  constructor(
    private resolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef,
    public dateTime: DateTime
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {

    //wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
    let divEl = document.createElement("div");
    divEl.className = 'ng2-datetime-picker';
    divEl.style.display = 'inline-block';
    divEl.style.position = 'relative';
    this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
    divEl.appendChild(this.el);

    let dateNgModel: Date;
    if (typeof this.ngModel === 'string') { //remove timezone and respect day light saving time
      dateNgModel = this.dateFormat ?
        DateTime.momentParse(''+this.ngModel) :
        DateTime.parse(''+this.ngModel);
    } else if (typeof this.ngModel === 'Date') {
      dateNgModel = <Date>this.ngModel;
    } else {
      dateNgModel = new Date();
    }

    this.year   && dateNgModel.setFullYear(this.year);
    this.month  && dateNgModel.setMonth(this.month-1);
    this.day    && dateNgModel.setDate(this.day);
    this.hour   && dateNgModel.setHours(this.hour);
    this.minute && dateNgModel.setMinutes(this.minute);

    // emit toString Modified(date formatted) instance
    // https://angular.io/docs/ts/latest/api/common/DatePipe-class.html
    setTimeout(() => {
      if (this.dateFormat) {
        dateNgModel.toString = () => {
          return DateTime.momentFormatDate(dateNgModel, this.dateFormat)
        }
      } else {
        dateNgModel.toString = () => {
          return DateTime.formatDate(dateNgModel, this.dateOnly);
        }
      }
      this.ngModelChange.emit(dateNgModel);
    });

    this.registerEventListeners();
  }

  ngOnDestroy(): void {
    // add a click listener to document, so that it can hide when others clicked
    document.body.removeEventListener('click', this.hideDatetimePicker);
    this.el.removeEventListener('keyup', this.keyEventListener);
    this.datetimePickerEl &&
      this.datetimePickerEl.removeEventListener('keyup', this.keyEventListener);
  }

  registerEventListeners() {
    // add a click listener to document, so that it can hide when others clicked
    document.body.addEventListener('click', this.hideDatetimePicker);
    this.el.addEventListener('keyup', this.keyEventListener);
  }

  keyEventListener = (evt: KeyboardEvent): void => {
    if (evt.keyCode === 27) { //ESC key
      this.hideDatetimePicker();
    }
  };

  //show datetimePicker below the current element
  showDatetimePicker($event) {

    this.hideDatetimePicker();

    let factory = this.resolver.resolveComponentFactory(DateTimePickerComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.datetimePickerEl = this.componentRef.location.nativeElement;
    this.datetimePickerEl.addEventListener('keyup', this.keyEventListener);

    let component = this.componentRef.instance;

    let initDate: string | Date = this.ngModel || new Date();
    console.log('initDate', initDate);
    if (typeof initDate === 'string') {
      initDate = this.dateFormat ?
        DateTime.momentParse(<string>initDate) : DateTime.parse(<string>initDate);
    }
    console.log('initDate', initDate);
    component.initDateTime(<Date>initDate);
    component.dateOnly = this.dateOnly;
    this.styleDatetimePicker();

    component.changes.subscribe(changes => {
      let newNgModel = new Date(changes.selectedDate);
      newNgModel.setHours(parseInt(changes.hour, 10));
      newNgModel.setMinutes(parseInt(changes.minute, 10));
      if (this.dateFormat) {
        newNgModel.toString = () => {
          return DateTime.momentFormatDate(newNgModel, this.dateFormat)
        }
      } else {
        newNgModel.toString = () => {
          return DateTime.formatDate(newNgModel, this.dateOnly);
        }
      }
      this.ngModelChange.emit(newNgModel);
    });

    component.closing.subscribe(() => {
      setTimeout(() => {
        this.closeOnSelect !== "false" && this.hideDatetimePicker();
      });
    });
  }

  styleDatetimePicker = () => {

    /* setting width/height auto complete */
    let thisElBCR = this.el.getBoundingClientRect();
    this.datetimePickerEl.style.width = thisElBCR.width + 'px';
    this.datetimePickerEl.style.position = 'absolute';
    this.datetimePickerEl.style.zIndex = '1';
    this.datetimePickerEl.style.left = '0';
    this.datetimePickerEl.style.transition = 'height 0.3s ease-in';

    this.datetimePickerEl.style.visibility = 'hidden';
    setTimeout(() => { //it needs time to have width and height
      let thisElBcr = this.el.getBoundingClientRect();
      let datetimePickerElBcr = this.datetimePickerEl.getBoundingClientRect();

      if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) { // if not enough space to show on below, show above
        this.datetimePickerEl.style.bottom = '0';
      } else { // otherwise, show below
        this.datetimePickerEl.style.top = thisElBcr.height + 'px';
      }
      this.datetimePickerEl.style.visibility = 'visible';
    });

  };

  hideDatetimePicker = (event?): void =>  {
    if (this.componentRef) {
      if (
        event && event.type === 'click' &&
        event.target !== this.el &&
        !this.elementIn(event.target, this.datetimePickerEl)
      ) {
        this.componentRef.destroy();
        this.componentRef = undefined;
      } else if (!event) {
        this.componentRef.destroy();
        this.componentRef = undefined;
      }
    }
  };

  private elementIn(el: Node, containerEl: Node): boolean {
    while ( el = el.parentNode ) {
      if ( el === containerEl ) return true;
    }
    return false;
  }
}