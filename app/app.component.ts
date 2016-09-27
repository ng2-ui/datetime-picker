import { Component } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'my-app',
  template: `
  <div id="my-div">
    <h1>Ng2 DateTime Picker Test</h1>
    
    <br/><br/> 
    <input [(ngModel)]="myDate" 
      required
      ng2-datetime-picker
      date-only="true"/>
    myDate: {{myDate}}
<pre><code class="language-markup"
>&lt;input [(ngModel)]="myDate" ng2-datetime-picker date-only="true" /&gt;</code></pre>
    
    <br/><br/> 
    <form [formGroup]="myForm">
        <input 
        required
        formControlName="date" 
        ng2-datetime-picker
            date-only="true"/>
    </form>
    myForm.controls.date: {{myForm.controls.date.value}}
    <br/>
    <a href="#" (click)="myForm.controls.date.patchValue('2015-06-30')">2015-06-30</a>
    <a href="#" (click)="myForm.controls.date.patchValue('2015-07-19')">2015-07-19</a>
    <a href="#" (click)="myForm.controls.date.patchValue('2015-12-31')">2015-12-31</a>
    <pre><code class="language-markup"
    >&lt;form [formGroup]="myForm" (ngSubmit)="save(myForm)">
    &lt;input required formControlName="date" ng2-datetime-picker date-only="true" /&gt;
&lt;/form>
    </code></pre>

   <br/><br/> 
    <input [(ngModel)]="date" ng2-datetime-picker 
      date-format="DD-MM-YYYY hh:mm"
      hour="23"
      minute='59'
      close-on-select="false" />
<pre><code class="language-markup"
>&lt;input [(ngModel)]="date" ng2-datetime-picker
   date-format="DD-MM-YYYY hh:mm"
   hour="23"
   minute='59'
   close-on-select="false"  /&gt;</code></pre>
    
   <br/><br/> 
    <input [(ngModel)]="gmtDate" ng2-datetime-picker date-format="MM-DD-YYYY" />
gmtDate : "2015-01-01T00:00:00.000Z" 
<pre><code class="language-markup"
>&lt;input [(ngModel)]="gmtDate" ng2-datetime-picker date-format="MM-DD-YYYY" /&gt; </code></pre>
    
   <br/><br/> 
   
     <input [(ngModel)]="date5" ng2-datetime-picker
        year="2014" month="12" day="31" hour="23" minute="59" /><br/>
    <pre><code class="language-markup"
  >&lt;input [(ngModel)]="date5" ng2-datetime-picker
     year="2014" month="12" day="31" hour="23" minute="59" /&gt;</code></pre>

</div>
  `,
  styles: [`
    div { font-family: Courier; font-size: 13px}
    input { min-width: 200px; font-size: 15px; }
    .ng-dirty { background: #ddd; }
  `]
})
export class AppComponent {
  myForm: FormGroup; // our form model
  date = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
  gmtDate = '2015-01-01T00:00:00.000Z';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      date: ['2016-02-15', [Validators.required]],
    });
  }

}
