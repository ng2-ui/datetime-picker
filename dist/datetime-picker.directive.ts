import {
  Directive,
  ElementRef,
  Input,
  Output,
  DynamicComponentLoader,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  OnInit
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
  
  public componentRef: Promise<ComponentRef<any>>;
  public el: HTMLElement;
  public datetimePickerEl: HTMLElement; // datetime picker element
  
  constructor(
    public dcl: DynamicComponentLoader,
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
      this.ngModel = this.dateTime.formatDate(new Date(), this.dateOnly);
    }

    if (typeof this.ngModel === 'string') { //remove timezone and respect day light saving time
      dateNgModel = this.dateTime.fromString((<string>this.ngModel));
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
      let newNgModel = this.dateTime.formatDate(<Date>dateNgModel, this.dateOnly);
      this.ngModelChange.emit(newNgModel);
    });

    this.registerEventListeners();
  }

  ngOnDestroy(): void {
    // add a click listener to document, so that it can hide when others clicked
    document.body.removeEventListener('click', this.hideWhenOthersClicked);
    this.el.removeEventListener('keyup', this.keyEventListener);
  }


  registerEventListeners() {
    // add a click listener to document, so that it can hide when others clicked
    document.body.addEventListener('click', this.hideWhenOthersClicked);
    this.el.addEventListener('keyup', this.keyEventListener);
  }

  keyEventListener = (evt: KeyboardEvent): void => {
    if (evt.keyCode === 27) { //ESC key
      this.hideDatetimePicker();
    }
  };

  //show datetimePicker below the current element
  showDatetimePicker($event) {
    this.hideDatetimePicker().then(() => {
      this.componentRef = this.dcl.loadNextToLocation(DateTimePickerComponent, this.viewContainerRef);
      this.componentRef.then( componentRef => {
        this.datetimePickerEl = componentRef.location.nativeElement;
        let datetimePickerEl = this.datetimePickerEl;
        //console.log('this.keyEventListener', this.keyEventListener);

        componentRef.instance.initDateTime(this.ngModel || new Date());
        componentRef.instance.dateOnly = this.dateOnly;
        
        componentRef.instance.changes.subscribe(changes => {
          changes.selectedDate.setHours(changes.hour);
          changes.selectedDate.setMinutes(changes.minute);
          //let newNgModel = new DatePipe().transform(changes.selectedDate, this.dateFormat || 'yMd HH:mm');
          let newNgModel = this.dateTime.formatDate(changes.selectedDate, this.dateOnly);
          this.ngModelChange.emit(newNgModel);
        });
        
        componentRef.instance.closing.subscribe(() => {
          setTimeout(() => {
            this.closeOnSelect !== "false" && this.hideDatetimePicker();
          });
        });

        /* setting width/height auto complete */
        let thisElBCR = this.el.getBoundingClientRect();
        datetimePickerEl.style.width = thisElBCR.width + 'px';
        datetimePickerEl.style.position = 'absolute';
        datetimePickerEl.style.zIndex = '1';
        datetimePickerEl.style.left = '0';
        datetimePickerEl.style.transition = 'height 0.3s ease-in';

        datetimePickerEl.style.visibility = 'hidden';
        setTimeout(() => { //it needs time to have width and height
          let thisElBcr = this.el.getBoundingClientRect();
          let datetimePickerElBcr = datetimePickerEl.getBoundingClientRect();
          
          if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) { // if not enough space to show on below, show above
            datetimePickerEl.style.bottom = '0';
          } else { // otherwise, show below
            datetimePickerEl.style.top = thisElBcr.height + 'px';
          }
          datetimePickerEl.style.visibility = 'visible';
        });

        //$event.stopPropagation();
      })
    });

  }

  hideDatetimePicker(): Promise<any> {
    if (this.componentRef) {
      return this.componentRef.then(componentRef=> componentRef.destroy());
    } else {
      return Promise.resolve(true);
    }
  }
  
  hideWhenOthersClicked = (event): void => {
    if (event.target === this.el) {
      // do nothing 
    } else if (this.elementIn(event.target, this.datetimePickerEl)) {
      // Do Nothing
    } else {
      this.hideDatetimePicker();
    }
  }

  private elementIn(el: Node, containerEl: Node): boolean {
    while ( el = el.parentNode ) {
      if ( el === containerEl ) return true;
    }
    return false;
  }
}