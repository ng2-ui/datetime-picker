import { Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

//noinspection TypeScriptCheckImport
import { Ng2Datetime } from 'ng2-datetime-picker';

declare var moment: any;
moment['locale']('en-ca'); //e.g. fr-ca

var templateStr = `
  <div id="my-div">
    <h1>Ng2 DateTime Picker Test</h1>
    
    <fieldset id="test2"><legend><h2>min date, max date, disabled dates</h2></legend>
      <ng2-utils-2>
        <input
          [(ngModel)]="date2" 
          ng2-datetime-picker
          [disabled-dates]="date2DisabledDates"
          [min-date]="date2MinDate"
          [max-date]="date2MaxDate"
          [show-close-layer]="true"
          [show-week-numbers]="true"
          date-only="true"/>
        date2: {{date2}}
        <button id="set-date" (click)="date2 = date2New">Set 2017-12-31</button>
      </ng2-utils-2>
      <pre>{{templateStr | htmlCode:'ng2-utils-2'}}</pre>
    </fieldset>
     
    <fieldset id="test3"><legend><h2>time only</h2></legend>
      <ng2-utils-4>
        <input [(ngModel)]="date3"
          ng2-datetime-picker 
          date-format="DD-MM-YYYY hh:mm"
          time-only="true"
          minute-step="5"
          (popupClosed)="onDatetimePickerClosed()"
          [close-on-select]="false" />
      </ng2-utils-4>
      <pre>{{templateStr | htmlCode:'ng2-utils-4'}}</pre>
    </fieldset>
   
    <fieldset id="test4"><legend><h2>with timezone</h2></legend>
      <ng2-utils-6>
        <input 
          [(ngModel)]="date4" 
          ng2-datetime-picker
          [date-format]="date4TimezoneFormat" />
          dateWithTimezone: {{dateWithTimezone}}
        <br/>
      </ng2-utils-6>
      <pre>{{templateStr | htmlCode:'ng2-utils-6'}}</pre>
    </fieldset>
   
    <fieldset id="test5"><legend><h2>Reactive form</h2></legend>
      <ng2-utils-3>
        <form [formGroup]="myForm">
            <input 
              required
              formControlName="date" 
              ng2-datetime-picker
              [close-on-select]="false"/>
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

    <fieldset id="test6">
      <legend><h2>Material Design</h2></legend>
      <ng2-utils-4>
        <md-input-container>
          <input mdInput 
            [(ngModel)]="mdDate"
            name="mdDate"
            ng2-datetime-picker
            date-only="true" 
            [close-on-select]="false" />
        </md-input-container>
      </ng2-utils-4>
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

  date2 = new Date(2017, 0, 28);
  date2DisabledDates = [new Date(2017, 0, 10), new Date(2017, 0, 20)];
  date2MinDate = new Date(2017, 0, 1);
  date2MaxDate = new Date(2017, 11, 31);
  date2New = new Date(2017,11,31);

  date3 = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");

  date4TimezoneFormat = 'DD/MM/YYYY HH:mm Z';
  date4: string = Ng2Datetime.formatDate(
    Ng2Datetime.parseDate('2017-01-15T14:22:00-06:00', this.date4TimezoneFormat), this.date4TimezoneFormat
  );

  mdDate: Date = new Date(2017, 0, 28);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      date: ['2016-02-15', [Validators.required]],
    });

    //moment.tz.setDefault('US/Central'); // Set the default timezone that moment will use
  }

  onDatetimePickerClosed() {
    console.log('datetime picker is closed');
  }
}
