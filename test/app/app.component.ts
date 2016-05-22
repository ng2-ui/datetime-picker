import { Component } from '@angular/core';
import {DateTime} from "./datetime";
import {DateTimePickerComponent} from "./datetime-picker.component";

@Component({
  selector: 'my-app',
  template: `
    <h1>DateTime Picker Test</h1>
    <datetime-picker></datetime-picker>
  `,
  // styleUrls: ['app/app.component.css'],
  providers: [ DateTime ],
  directives: [DateTimePickerComponent]
})
export class AppComponent {
}
