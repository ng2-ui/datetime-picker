import { Component, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

declare var moment: any;
moment['locale']('en-ca'); //e.g. fr-ca

//noinspection TypeScriptCheckImport
import { Ng2Datetime, Ng2DatetimePickerDirective } from 'ng2-datetime-picker';
Ng2Datetime.firstDayOfWeek = 0; //e.g. 1, or 6

//
// The following is tested for custom DateTime parser/formatter
//
// Ng2DateTime.formatDate = function(d: Date) {
//   return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + pad0(d.getDate());
// };
//
// Ng2DateTime.parseDate = function(s: string) {
//   let tmp = dateStr.split('/');
//   return  new Date( parseInt(tmp[0]), parseInt(tmp[1]), parseInt(tmp[2]) );
// };
let templateStr = `
  <div id="my-div">
    <h1>Ng2 DateTime Picker Test</h1>
    
    <br/><br/> 
    <h3>Test 1 : minDate, maxDate, disabledDates, date-only</h3>
    <ng2-utils-1>
      <input
        [(ngModel)]="myDate" 
        ng2-datetime-picker
        [min-date]="minDate"
        [max-date]="maxDate"
        [disabled-dates]="disabledDates"
        date-only="true"/>
      myDate: {{myDate}}
    </ng2-utils-1>
    <pre>{{templateStr | htmlCode:'ng2-utils-1'}}</pre>
    
    <br/><br/> 
    <h3>Test 2: formGroup, close-on-select</h3>
    <ng2-utils-2>
      <form [formGroup]="myForm">
          <input 
            required
            formControlName="date" 
            ng2-datetime-picker
            close-on-select="false"/>
      </form>
      myForm.controls.date.value: {{myForm.controls.date.value}}
      <br/>
      myForm.value: {{myForm.value | json}}
      <br/>
      myForm.dirty: {{myForm.dirty}}
      <br/>
      myForm.controls.date.dirty: {{myForm.controls.date.dirty}}
      <br/>
      <a href="javascript:void(0)" (click)="myForm.controls.date.patchValue('2015-06-30')">2015-06-30</a>
      <a href="javascript:void(0)" (click)="myForm.controls.date.patchValue('2015-07-19')">2015-07-19</a>
      <a href="javascript:void(0)" (click)="myForm.controls.date.patchValue('2015-12-31')">2015-12-31</a>
    </ng2-utils-2>
    <pre>{{templateStr | htmlCode:'ng2-utils-2'}}</pre>

    <br/><br/> 
    <h3>Test 3: date-format, time-only, minute-step</h3>
    <ng2-utils-3>
      <input [(ngModel)]="date" ng2-datetime-picker 
        date-format="DD-MM-YYYY HH:mm"
        time-only="true"
        minute-step="5" />
    </ng2-utils-3>
    <pre>{{templateStr | htmlCode:'ng2-utils-3'}}</pre>
    
    <br/><br/> 
    <h3>Test 4: gmtDate as an input</h3>
    <ng2-utils-4>
      <input 
        [(ngModel)]="gmtDate" 
        #ng2DP=ng2DatetimePicker
        ng2-datetime-picker
        date-format="MM-DD-YYYY" />
      gmtDate : "2015-01-01T00:00:00.000Z" 
      <a href="javascript:void(0)"
        (click)="gmtDate=myDatetimePicker.formatDate('2016-11-03T22:00:00Z')">Set date/time to: 2016-11-03T22:00:00Z</a>
    </ng2-utils-4>
    <pre>{{templateStr | htmlCode:'ng2-utils-4'}}</pre>
    
    <br/><br/> 
    <h3>Test 5: default-value</h3>
    <ng2-utils-5>
      <input
        [(ngModel)]="date5"
        ng2-datetime-picker
        [default-value]="date5DefaultValue" />
    </ng2-utils-5>
    <pre>{{templateStr | htmlCode:'ng2-utils-5'}}</pre>
</div>
  `;

@Component({
  selector: 'my-app',
  template: templateStr,
  styles: [`
    div { font-family: Courier; font-size: 13px}
    input { min-width: 200px; font-size: 15px; }
    input.ng-dirty { background: #ddd; }
  `]
})
export class AppComponent {
  myForm: FormGroup; // our form model
  date = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
  gmtDate = '2015-01-01T00:00:00.000Z';
  date5DefaultValue = new Date(2014, 11, 31, 21, 45, 59);
  minDate = new Date(2017, 0, 1);
  maxDate = new Date(2017, 11, 31);
  disabledDates = [new Date(2016, 11, 26), new Date(2016, 11, 27)];
  templateStr: string = templateStr;

  constructor(private fb: FormBuilder) { }

  @ViewChild('ng2DP') myDatetimePicker;

  ngOnInit() {
    this.myForm = this.fb.group({
      date: ['2016-02-15', [Validators.required]],
    });
  }

}
