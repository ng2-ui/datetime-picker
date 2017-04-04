import { Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

declare var moment: any;
moment['locale']('en-ca'); //e.g. fr-ca

//noinspection TypeScriptCheckImport
import { NguiDatetime } from '@ngui/datetime-picker';

var templateStr = `
    <fieldset><legend><h2>Attributes and Events</h2></legend>
      <ngui-utils-1>
        <ngui-datetime-picker
          *ngIf="show !== false"
          date-format="DD-MM-YYYY hh:mm"
          [date-only]="false"
          [time-only]="false"
          [minuteStep]="5"
          [default-value]="defaultValue"
          [min-date]="minDate"
          [max-date]="maxDate"
          [min-hour]="9"
          [max-hour]="17"
          [show-am-pm]="true"
          [show-close-button]="true"
          [disabled-dates]="disabledDates"
          (closing$)="show = false"
          (selected$)="selectedDate = $event">
        </ngui-datetime-picker>
        <br/> selected DateTime : {{ selectedDate || defaultValue }}
      </ngui-utils-1>
      <pre>{{templateStr | htmlCode:'ngui-utils-1'}}</pre>
    </fieldset>
`;

@Component({
  selector: 'my-app',
  template: templateStr,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    fieldset {display: inline-block; vertical-align: top; margin: 10px; padding: 20px }
  `]
})
export class ComponentTestComponent {
  templateStr: string = templateStr;
  selectedDate: Date;

  defaultValue = new Date(2017, 0, 31, 21, 45);
  minDate = new Date(2017, 0, 1);
  maxDate = new Date(2017, 11, 31);
  disabledDates = [new Date(2016, 11, 26), new Date(2016, 11, 27)];

}
