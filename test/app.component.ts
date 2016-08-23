import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div>
    <h1>Ng2 DateTime Picker Test</h1>
    
   <br/><br/> 
    <input [(ngModel)]="myDate" ng2-datetime-picker />
    myDate: {{myDate}}
<pre><code class="language-markup"
>&lt;input [(ngModel)]="myDate" ng2-datetime-picker /&gt;</code></pre>
    
   <br/><br/> 
    <input [(ngModel)]="date1" ng2-datetime-picker date-only="true" />
<pre><code class="language-markup"
>&lt;input [(ngModel)]="date1" ng2-datetime-picker date-only="true" /&gt;</code></pre>
    
   <br/><br/> 
    <input [(ngModel)]="date2" ng2-datetime-picker date-only="true" />
<pre><code class="language-markup"
>&lt;input [(ngModel)]="date2" ng2-datetime-picker date-only="true" /&gt;</code></pre>
    
   <br/><br/> 
    <input [(ngModel)]="date3" ng2-datetime-picker close-on-select="false" />
<pre><code class="language-markup"
> &lt;input  [(ngModel)]="date3" ng2-datetime-picker close-on-select="false" /&gt;</code></pre>
    
   <br/><br/> 
    <input [(ngModel)]="date4" ng2-datetime-picker hour="23" minute='59'/>
<pre><code class="language-markup"
>&lt;input ng-model="date4" ng2-datetime-picker hour="23" minute='59'/&gt;
</code></pre>
    
   <br/><br/> 
    <input [(ngModel)]="gmtDate" ng2-datetime-picker />
gmtDate : "2015-01-01T00:00:00.000Z" 
<pre><code class="language-markup"
>&lt;input [(ngModel)]="gmtDate" ng2-datetime-picker /&gt; </code></pre>
    
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
  public date1 = "01-01-2015 00:00:00";
  public date2 = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
  public date3 = '2015-01-01T00:00:00-0400';
  public date4 = '2015-01-01';
  public gmtDate = '2015-01-01T00:00:00.000Z';
}
