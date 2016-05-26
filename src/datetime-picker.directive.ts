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
  selector: '[datetime-picker]',
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
  @Input('close-on-select') closeOnSelect: boolean;

  @Input() ngModel: String; //not Date, only String !!!
  @Output() ngModelChange = new EventEmitter();
  
  public componentRef: Promise<ComponentRef<any>>;
  public el: HTMLElement;
  public dtpEl: HTMLElement; // datetime picker element

  constructor(
    public dcl: DynamicComponentLoader,
    public viewContainerRef: ViewContainerRef,
    public dateTime: DateTime
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    let dateNgModel: Date | String =  this.ngModel;
    if (!(this.ngModel instanceof Date || typeof this.ngModel === 'string')) {
      console.error("datetime-picker directive requires ngModel");
      this.ngModel = (new Date()).toString();
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
    let newNgModel = new DatePipe().transform(dateNgModel, this.dateFormat || 'yMd HH:mm');
    this.ngModelChange.emit(newNgModel);
  }
  
  //show datetimePicker below the current element
  showDatetimePicker($event) {
    this.hideDatetimePicker().then(() => {
      this.componentRef = this.dcl.loadNextToLocation(DateTimePickerComponent, this.viewContainerRef);
      this.componentRef.then( componentRef => {
        this.dtpEl = componentRef.location.nativeElement;
        let dtpEl = this.dtpEl;

        componentRef.instance.initDateTime(this.ngModel || new Date());
        componentRef.instance.dateOnly = this.dateOnly;
        
        componentRef.instance.changes.subscribe(changes => {
          changes.selectedDate.setHours(changes.hour);
          changes.selectedDate.setMinutes(changes.minute);
          let newNgModel = new DatePipe().transform(changes.selectedDate, this.dateFormat || 'yMd HH:mm');
          this.ngModelChange.emit(newNgModel);
        });
        
        componentRef.instance.closing.subscribe(() => {
          setTimeout(() => {
            this.closeOnSelect !== false && this.hideDatetimePicker();
          });
        });

        //show element transparently then calculate width/height
        dtpEl.style.display = '';
        dtpEl.style.opacity = '0';
        dtpEl.style.position='fixed';

        setTimeout(() => { //it needs time to have width and height
          let thisElBcr = this.el.getBoundingClientRect();
          let dtpElBcr = dtpEl.getBoundingClientRect();

          let left: number = thisElBcr.left; 
          let top: number = thisElBcr.bottom;
          let bottom: number;
          if ((thisElBcr.bottom + dtpElBcr.height) > window.innerHeight) {
            bottom = window.innerHeight - thisElBcr.top; 
          }

          if (bottom) {
            dtpEl.style.bottom = bottom + window.scrollY + 'px';
          } else {
            dtpEl.style.top = top + window.scrollY + 'px';
          }
          dtpEl.style.left = left + window.scrollX + 'px';
          dtpEl.style.opacity = '1';
          dtpEl.style.zIndex = '1';
        });
        $event.stopPropagation();
      })
    });
    
    document.addEventListener('click', event => {
      if (event.target !== this.el && event.target !== this.dtpEl) {
        this.hideDatetimePicker();
      }
    });
  }

  hideDatetimePicker(): Promise<any> {
    if (this.componentRef) {
      return this.componentRef.then( componentRef=> componentRef.destroy() );
    } else {
      return Promise.resolve(true);
    }
  }

}