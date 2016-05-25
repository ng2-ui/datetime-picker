import { Component } from '@angular/core';
import {DateTimePickerDirective} from "./datetime-picker.directive";

@Component({
  selector: 'my-app',
  template: `
  <div>
    <h1>Ng2 DateTime Picker Test</h1>
    <!--<datetime-picker></datetime-picker>-->
    &lt;input [(ngModel)]="date1" datetime-picker date-only="true" /&gt;<br/> 
    <input [(ngModel)]="date1" datetime-picker date-only="true" /> 
    
    &lt;input [(ngModel)]="date2" datetime-picker date-format="yMd" date-only="true" /&gt;  <br/>
    <input [(ngModel)]="date2" datetime-picker date-format="yMd" date-only="true" /> 
    
    &lt;input  [(ngModel)]="date3" datetime-picker date-format="yMd HH:mm:ss" close-on-select="false" /&gt;  <br/>
    <input [(ngModel)]="date3" datetime-picker date-format="yMd HH:mm:ss" close-on-select="false" /> 
    
    &lt;input ng-model="date4" datetime-picker hour="23" minute='59'/&gt; <br/>
    <input [(ngModel)]="date4" datetime-picker hour="23" minute='59'/>
    
    gmtDate : "2015-01-01T00:00:00.000Z" <br/>
    &lt;input [(ngModel)]="gmtDate" datetime-picker /&gt; <br/>
    <input [(ngModel)]="gmtDate" datetime-picker />
    
    <div style="position:fixed; bottom:0">
    &lt;input [(ngModel)]="date5" datetime-picker
       date-format="yMd HH:mm" year="2014" month="12" day="31" hour="23" minute="59" /&gt;<br>
    <input [(ngModel)]="date5" datetime-picker
       date-format="yMd HH:mm" 
       year="2014" month="12" day="31" hour="23" minute="59" />
  </div>
  `,
  
  directives: [
    DateTimePickerDirective
  ],
  styles: [`
    div { font-family: Courier; font-size: 13px}
    input { min-width: 200px; margin-bottom: 20px; display: block; font-size: 15px; }
  `]
})
export class AppComponent {
  public date1 = new Date("01-01-2015 00:00:00");
  public date2 = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
  public date3 = '2015-01-01T00:00:00-0400';
  public date4 = '2015-01-01';
  public gmtDate = '2015-01-01T00:00:00.000Z';
}
