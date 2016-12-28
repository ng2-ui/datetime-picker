import { Component } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

declare var moment: any;
moment['locale']('en-ca'); //e.g. fr-ca

//noinspection TypeScriptCheckImport
import { Ng2Datetime } from 'ng2-datetime-picker';
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

@Component({
  selector: 'my-app',
  template: `
  <div id="my-div">
    <h1>Ng2 DateTime Picker Test</h1>
    
    <br/><br/> 
    <input
      id="test1"
      [(ngModel)]="myDate" 
      ng2-datetime-picker
      [min-date]="minDate"
      [max-date]="maxDate"
      [disabled-dates]="disabledDates"
      date-only="true"/>
    myDate: {{myDate}}
<pre><code class="language-markup"
>&lt;input [(ngModel)]="myDate" ng2-datetime-picker date-only="true" /&gt;</code></pre>
    
    <br/><br/> 
    <form [formGroup]="myForm">
        <input 
          id="test2"
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
    <a href="#" (click)="myForm.controls.date.patchValue('2015-06-30')">2015-06-30</a>
    <a href="#" (click)="myForm.controls.date.patchValue('2015-07-19')">2015-07-19</a>
    <a href="#" (click)="myForm.controls.date.patchValue('2015-12-31')">2015-12-31</a>
    <pre><code class="language-markup"
    >&lt;form [formGroup]="myForm" (ngSubmit)="save(myForm)">
    &lt;input required formControlName="date" ng2-datetime-picker close-on-select="false" /&gt;
&lt;/form>
    </code></pre>

   <br/><br/> 
    <input [(ngModel)]="date" ng2-datetime-picker 
      id="test3"
      date-format="DD-MM-YYYY hh:mm"
      time-only="true"
      minute-step="5"
      close-on-select="false" />
<pre><code class="language-markup"
>&lt;input [(ngModel)]="date" ng2-datetime-picker
   date-format="DD-MM-YYYY hh:mm"
   minute-step="5"
   close-on-select="false"  /&gt;</code></pre>
    
   <br/><br/> 
    <input 
      id="test4"
      [(ngModel)]="gmtDate" 
      ng2-datetime-picker
      date-format="MM-DD-YYYY" />
gmtDate : "2015-01-01T00:00:00.000Z" 
    <br/>
    <a href="#" (click)="gmtDate='2016-11-03T22:00:00Z'">Set date/time to: 2016-11-03T22:00:00Z</a>
<pre><code class="language-markup"
>&lt;input [(ngModel)]="gmtDate" ng2-datetime-picker date-format="MM-DD-YYYY" /&gt; </code></pre>
    
   <br/><br/> 
   
     <input
       id="test5"
       [(ngModel)]="date5"
       ng2-datetime-picker
       [default-value]="date5DefaultValue" /><br/>
    <pre><code class="language-markup"
  >&lt;input [(ngModel)]="date5" ng2-datetime-picker 
     [defaultValue]="date5DefaultValue" /&gt;</code></pre>

</div>
  `,
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
  minDate = new Date(2016, 0, 1);
  maxDate = new Date(2016, 11, 31);
  disabledDates = [new Date(2016, 11, 26), new Date(2016, 11, 27)];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      date: ['2016-02-15', [Validators.required]],
    });
  }

}
