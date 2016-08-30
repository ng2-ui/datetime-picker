import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div id="my-div">
    <h1>Ng2 DateTime Picker Test</h1>
    
   <br/><br/> 
    <input [(ngModel)]="myDate" ng2-datetime-picker date-only="true"/>
    myDate: {{myDate}}
<pre><code class="language-markup"
>&lt;input [(ngModel)]="myDate" ng2-datetime-picker date-only="true" /&gt;</code></pre>
    
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
    <div style="position:fixed; bottom:0">
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
  `]
})
export class AppComponent {
  public date2 = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
  public gmtDate = '2015-01-01T00:00:00.000Z';
}
