import {
  Directive,
  ElementRef,
  Input,
  Output,
  DynamicComponentLoader,
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

  @Input() ngModel: String; //not Date, only String !!!
  @Output() ngModelChange = new EventEmitter();

  componentRef: ComponentRef<DateTimePickerComponent>;
  el: HTMLElement;
  datetimePickerEl: HTMLElement; // datetime picker element
  
  constructor(
    private resolver: ComponentFactoryResolver,
    // public dcl: DynamicComponentLoader,
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

    let dateNgModel: Date | String =  this.ngModel;
    if (!(this.ngModel instanceof Date || typeof this.ngModel === 'string')) {
      // console.log("datetime-picker directive requires ngModel");
      this.ngModel = DateTime.formatDate(new Date(), this.dateOnly);
    }

    if (typeof this.ngModel === 'string') { //remove timezone and respect day light saving time
      dateNgModel = DateTime.fromString((<string>this.ngModel));
    }
    
    this.year   && (<Date>dateNgModel).setFullYear(this.year);
    this.month  && (<Date>dateNgModel).setMonth(this.month-1);
    this.day    && (<Date>dateNgModel).setDate(this.day);
    this.hour   && (<Date>dateNgModel).setHours(this.hour);
    this.minute && (<Date>dateNgModel).setMinutes(this.minute);

    // emit toString Modified(date formatted) instance
    // https://angular.io/docs/ts/latest/api/common/DatePipe-class.html
    //let newNgModel = new DatePipe().transform(dateNgModel, this.dateFormat || 'yMd HH:mm');
    setTimeout(() => {
      let newNgModel = DateTime.formatDate(<Date>dateNgModel, this.dateOnly);
      this.ngModelChange.emit(newNgModel);
    });

    this.registerEventListeners();
  }

  ngOnDestroy(): void {
    // add a click listener to document, so that it can hide when others clicked
    document.body.removeEventListener('click', this.hideDatetimePicker);
    this.el.removeEventListener('keyup', this.keyEventListener);
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
    let component = this.componentRef.instance;

    component.initDateTime(this.ngModel || new Date());
    component.dateOnly = this.dateOnly;
    this.styleDatetimePicker();

    component.changes.subscribe(changes => {
      changes.selectedDate.setHours(changes.hour);
      changes.selectedDate.setMinutes(changes.minute);
      //let newNgModel = new DatePipe().transform(changes.selectedDate, this.dateFormat || 'yMd HH:mm');
      let newNgModel = DateTime.formatDate(changes.selectedDate, this.dateOnly);
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