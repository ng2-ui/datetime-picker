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

  @Input() hour: number;
  @Input() minute: number;

  @Input('date-format') dateFormat: string;
  @Input('date-only') dateOnly: boolean;
  @Input('close-on-select') closeOnSelect: boolean;

  @Input() ngModel: String; //not Date, only String !!!
  @Output() ngModelChange = new EventEmitter();
  
  public componentRef: Promise<ComponentRef>;
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
    let dateNgModel: Date =  this.ngModel;
    if (!(this.ngModel instanceof Date || typeof this.ngModel === 'string')) {
      console.error("datetime-picker directive requres ngModel");
    }

    if (typeof this.ngModel === 'string') { //remove timezone and respect day light saving time
      dateNgModel = this.dateTime.fromString(this.ngModel);
    }
    
    if (this.hour) {
      dateNgModel.setHours(this.hour);
    }
    if (this.minute) {
      dateNgModel.setMinutes(this.minute);
    }

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
        dtpEl.style.dispay = '';
        dtpEl.style.opacity = 0;
        dtpEl.style.position='absolute';

        setTimeout(() => { //it needs time to have width and height
          let thisElBcr = this.el.getBoundingClientRect();
          let dtpElBcr = dtpEl.getBoundingClientRect();

          let left: number = thisElBcr.width > dtpElBcr.width ?
          thisElBcr.left + thisElBcr.width - dtpElBcr.width + window.scrollX :
          thisElBcr.left + window.scrollX;
          let top: number = thisElBcr.top < 300 || window.innerHeight - thisElBcr.bottom > 300 ?
          thisElBcr.bottom + window.scrollY :
          thisElBcr.top - dtpElBcr.height + window.scrollY;

          dtpEl.style.top = top + 'px';
          dtpEl.style.left = left + 'px';
          dtpEl.style.opacity = 1;
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