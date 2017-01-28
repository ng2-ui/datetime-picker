import { Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

//noinspection TypeScriptCheckImport
import { Ng2Datetime } from 'ng2-datetime-picker';

declare var moment: any;
moment['locale']('en-ca'); //e.g. fr-ca

var templateStr = `
  <div id="my-div">
    <h1>Ng2 DateTime Picker Test</h1>
    
    <fieldset id="test1"><legend><h2>Open from a button</h2></legend>
      <ng2-utils-1>
        <input [(ngModel)]="myDate0" />
        <i class="fa fa-calendar"
           ng2-datetime-picker
           [default-value]="defaultValue"
           (valueChanged)="myDate0=$event"></i>
      </ng2-utils-1>
      myDate0: {{myDate0}}
      <pre>{{templateStr | htmlCode:'ng2-utils-1'}}</pre>
    </fieldset>
    
    <fieldset id="test2"><legend><h2>min date, max date, disabled dates</h2></legend>
      <ng2-utils-2>
        <input
          id="test1"
          [(ngModel)]="myDate" 
          ng2-datetime-picker
          [disabled-dates]="disabledDates"
          [min-date]="minDate"
          [max-date]="maxDate"
          date-only="true"/>
        myDate: {{myDate}}
      </ng2-utils-2>
      <pre>{{templateStr | htmlCode:'ng2-utils-2'}}</pre>
    </fieldset>
     
    <fieldset id="test3"><legend><h2>time only</h2></legend>
      <ng2-utils-4>
        <input [(ngModel)]="date" ng2-datetime-picker 
          id="test3"
          date-format="DD-MM-YYYY hh:mm"
          time-only="true"
          minute-step="5"
          close-on-select="false" />
      </ng2-utils-4>
      <pre>{{templateStr | htmlCode:'ng2-utils-4'}}</pre>
    </fieldset>
   
    <fieldset id="test4"><legend><h2>with timezone</h2></legend>
      <ng2-utils-6>
        <input 
          id="test6"
          [(ngModel)]="dateWithTimezone" 
          ng2-datetime-picker
          [date-format]="timezoneFormat" />
          dateWithTimezone: {{dateWithTimezone}}
        <br/>
      </ng2-utils-6>
      <pre>{{templateStr | htmlCode:'ng2-utils-6'}}</pre>
    </fieldset>
   
    <fieldset id="test5"><legend><h2>Reactive form</h2></legend>
      <ng2-utils-3>
        <form [formGroup]="myForm">
            <input 
              id="test2"
              required
              formControlName="date" 
              ng2-datetime-picker
              close-on-select="false"/>
        </form>
        myForm.controls.date.value: {{myForm.controls.date.value}}
        <br/>myForm.value: {{myForm.value | json}}
        <br/>myForm.dirty: {{myForm.dirty}}
        <br/>myForm.controls.date.dirty: {{myForm.controls.date.dirty}}
        <br/>
        <a href="javascript:void()" 
          (click)="myForm.controls.date.patchValue('2015-06-30')">
          2015-06-30
        </a>
        <a href="javascript:void()"
          (click)="myForm.controls.date.patchValue('2015-07-19')">
          2015-07-19
        </a>
        <a href="javascript:void()"
          (click)="myForm.controls.date.patchValue('2015-12-31')">
          2015-12-31
        </a>
      </ng2-utils-3>
      <pre>{{templateStr | htmlCode:'ng2-utils-3'}}</pre>
    </fieldset>
    
  </div>
`;

@Component({
  selector: 'my-app',
  template: templateStr,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    ng2-utils-1 .ng2-datetime-picker-wrapper { display: inline-block }
    div { font-family: Courier; font-size: 13px}
    input { min-width: 200px; font-size: 15px; }
    input.ng-dirty { background: #ddd; }
    fieldset {display: inline-block; vertical-align: top; margin: 10px; padding: 20px }
  `]
})
export class DirectiveTestComponent {
  templateStr: string = templateStr;

  myForm: FormGroup; // our form model
  date = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
  defaultValue = new Date(2014, 11, 31, 21, 45, 59);
  minDate = new Date(2017, 0, 1);
  maxDate = new Date(2017, 11, 31);
  disabledDates = [new Date(2016, 11, 26), new Date(2016, 11, 27)];
  dateWithTimezone: string;
  timezoneFormat = 'DD/MM/YYYY HH:mm Z';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      date: ['2016-02-15', [Validators.required]],
    });

    //moment.tz.setDefault('US/Central'); // Set the default timezone that moment will use

    this.dateWithTimezone = Ng2Datetime.formatDate(
      Ng2Datetime.parseDate('2017-01-15T14:22:00-06:00', this.timezoneFormat), this.timezoneFormat
    );
  }

}
