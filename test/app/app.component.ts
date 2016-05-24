import { Component } from '@angular/core';
import {DateTimePickerDirective} from "./datetime-picker.directive";

@Component({
  selector: 'my-app',
  template: `
    <h1>Ng2 DateTime Picker Test</h1>
    <!--<datetime-picker></datetime-picker>-->
    &lt;input [(ngModel)]="date1" datetime-picker date-only="true" /&gt;<br/> 
    <input [(ngModel)]="date1" datetime-picker date-only="true" /> 
    
    <hr/>
    &lt;input [(ngModel)]="date2" datetime-picker date-format="yMd" date-only="true" /&gt; 
    <input [(ngModel)]="date2" datetime-picker date-format="yMd" date-only="true" /> 
    
    <hr />
    &lt;input  [(ngModel)]="date3" datetime-picker date-format="yyyy-MM-dd HH:mm:ss" close-on-select="false" /&gt; 
    <input [(ngModel)]="date3" datetime-picker date-format="yMd HH:mm:ss" close-on-select="false" /> 
    
    <hr/>
    &lt;input ng-model="date4" datetime-picker hour="23" minute='59'/&gt;
    <input [(ngModel)]="date4" datetime-picker hour="23" minute='59'/>;
  `,
  directives: [
    DateTimePickerDirective
  ],
  styles: [`
    input { min-width: 200px; }
  `]
})
export class AppComponent {
  public date1 = new Date("01-01-2015 00:00:00");
  public date2 = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
  public date3 = '2015-01-01T00:00:00-0400';
  public date4 = '2015-01-01';
}
