import {
	Directive,
	Input,
	Output,
	ComponentRef,
	ViewContainerRef,
	EventEmitter,
	OnInit,
	ComponentFactoryResolver
} from '@angular/core';
import {DateTimePickerComponent} from './datetime-picker.component';
import {DateTime} from './datetime';

/**
 * To simplify the implementation, it limits the type if ngModel to string only, not a date
 * If the given string is not a valid date, it defaults back to today
 */
@Directive({
	selector : '[datetime-picker], [ng2-datetime-picker]',
	providers: [DateTime],
	host     : {
		'(click)': 'showDatetimePicker($event)'
	}
})
export class DateTimePickerDirective implements OnInit {
	@Input()
	public year:number;
	@Input()
	public month:number;
	@Input()
	public day:number;
	@Input()
	public hour:number;
	@Input()
	public minute:number;

	@Input('date-format')
	public dateFormat:string;
	@Input('date-only')
	public dateOnly:boolean;
	@Input('close-on-select')
	public closeOnSelect:string;

	@Input()
	public ngModel:Date;  //if string given, will be converted to Date
	@Output()
	public ngModelChange = new EventEmitter();

	private _componentRef:ComponentRef<DateTimePickerComponent>;
	private _el:HTMLElement;
	private _datetimePickerEl:HTMLElement;

	private _keyEventListener = (e:KeyboardEvent):void => {
		if (e.keyCode === 27) { //ESC key
			this.hideDatetimePicker();
		}
	};

	public constructor (private _resolver:ComponentFactoryResolver,
						private _viewContainerRef:ViewContainerRef) {
		this._el = this._viewContainerRef.element.nativeElement;
	}

	public ngOnInit ():void {
		//wrap this element with a <div> tag, so that we can position dynamic elememnt correctly
		let divEl            = document.createElement("div");
		divEl.className      = 'ng2-datetime-picker';
		divEl.style.display  = 'inline-block';
		divEl.style.position = 'relative';
		this._el.parentElement.insertBefore(divEl, this._el.nextSibling);
		divEl.appendChild(this._el);

		let dateNgModel:Date;
		if (typeof this.ngModel === 'string') { //remove timezone and respect day light saving time
			dateNgModel = this.dateFormat ?
				DateTime.momentParse('' + this.ngModel) :
				DateTime.parse('' + this.ngModel);
		}
		else if (this.ngModel instanceof Date) {
			dateNgModel = this.ngModel;
		}
		else {
			dateNgModel = new Date();
		}

		this.year && dateNgModel.setFullYear(this.year);
		this.month && dateNgModel.setMonth(this.month - 1);
		this.day && dateNgModel.setDate(this.day);
		this.hour && dateNgModel.setHours(this.hour);
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

		this._registerEventListeners();
	}

	public ngOnDestroy ():void {
		// add a click listener to document, so that it can hide when others clicked
		document.body.removeEventListener('click', this.hideDatetimePicker);
		this._el.removeEventListener('keyup', this._keyEventListener);
		this._datetimePickerEl &&
		this._datetimePickerEl.removeEventListener('keyup', this._keyEventListener);
	}

	//show datetimePicker below the current element
	public showDatetimePicker () {
		this.hideDatetimePicker();

		let factory = this._resolver.resolveComponentFactory(DateTimePickerComponent);

		this._componentRef     = this._viewContainerRef.createComponent(factory);
		this._datetimePickerEl = this._componentRef.location.nativeElement;
		this._datetimePickerEl.addEventListener('keyup', this._keyEventListener);

		let component = this._componentRef.instance;

		let initDate:string | Date = this.ngModel || new Date();
		if (typeof initDate === 'string') {
			initDate = this.dateFormat ?
				DateTime.momentParse(<string>initDate) : DateTime.parse(<string>initDate);
		}
		component.initDateTime(<Date>initDate);
		component.dateOnly = this.dateOnly;
		this._styleDatetimePicker();

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

	public hideDatetimePicker ():void {
		if (this._componentRef) {
			this._componentRef.destroy();
			this._componentRef = undefined;
		}
	};

	private _registerEventListeners () {
		// add a click listener to document, so that it can hide when others clicked
		document.body.addEventListener('click', this.hideDatetimePicker);
		this._el.addEventListener('keyup', this._keyEventListener);
	}

	private _styleDatetimePicker () {
		/* setting width/height auto complete */
		let thisElBCR                           = this._el.getBoundingClientRect();
		this._datetimePickerEl.style.width      = thisElBCR.width + 'px';
		this._datetimePickerEl.style.position   = 'absolute';
		this._datetimePickerEl.style.zIndex     = '1';
		this._datetimePickerEl.style.left       = '0';
		this._datetimePickerEl.style.transition = 'height 0.3s ease-in';

		this._datetimePickerEl.style.visibility = 'hidden';
		setTimeout(() => { //it needs time to have width and height
			let thisElBcr           = this._el.getBoundingClientRect();
			let datetimePickerElBcr = this._datetimePickerEl.getBoundingClientRect();

			if (thisElBcr.bottom + datetimePickerElBcr.height > window.innerHeight) { // if not enough space to show on below, show above
				this._datetimePickerEl.style.bottom = '0';
			} else { // otherwise, show below
				this._datetimePickerEl.style.top = thisElBcr.height + 'px';
			}
			this._datetimePickerEl.style.visibility = 'visible';
		});

	};
}