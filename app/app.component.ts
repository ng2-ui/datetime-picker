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
   <form [formGroup]="myForm1">
     <input 
       required
       [(ngModel)]='myVar' 
       formControlName="date1" 
       ng2-datetime-picker
        date-only="true"/>
   </form>
   myForm1.controls.date1: {{myForm1.controls.date1.value}}
   <br/>
   <a href="#" (click)="myVar='2015-06-30'">2015-06-30</a>
   <a href="#" (click)="myVar='2015-07-19'">2015-07-19</a>
   <a href="#" (click)="myVar='2015-12-31'">2015-12-31</a>
<pre><code class="language-markup"
>&lt;form [formGroup]="myForm1" novalidate (ngSubmit)="save(myForm1)">
  &lt;input required [(ngModel)]="myVar" formControlName="date1" ng2-datetime-picker date-only="true" /&gt;
&lt;/form>
</code></pre>

    <br/><br/> 
    <form [formGroup]="myForm2">
        <input 
        required
        formControlName="date2" 
        ng2-datetime-picker
            date-only="true"/>
    </form>
    myForm2.controls.date2: {{myForm2.controls.date2.value}}
    <br/>
    <a href="#" (click)="myForm2.controls.date2.patchValue('2015-06-30')">2015-06-30</a>
    <a href="#" (click)="myForm2.controls.date2.patchValue('2015-07-19')">2015-07-19</a>
    <a href="#" (click)="myForm2.controls.date2.patchValue('2015-12-31')">2015-12-31</a>
    <pre><code class="language-markup"
    >&lt;form [formGroup]="myForm2" novalidate (ngSubmit)="save(myForm2)">
    &lt;input required formControlName="date2" ng2-datetime-picker date-only="true" /&gt;
    &lt;/form>
    </code></pre>

   <br/><br/> 
    <input [(ngModel)]="date2" ng2-datetime-picker 
      date-format="DD-MM-YYYY hh:mm"
      hour="23"
      minute='59'
      close-on-select="false" />
<pre><code class="language-markup"
>&lt;input [(ngModel)]="date2" ng2-datetime-picker
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
  date2 = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
  gmtDate = '2015-01-01T00:00:00.000Z';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm1 = this.fb.group({
      date1: [null, [Validators.required]],
    });
     this.myForm2 = this.fb.group({
      date2: [null, [Validators.required]],
    });
  }

}
