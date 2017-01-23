import { Component } from '@angular/core';

//noinspection TypeScriptCheckImport
import { Ng2Datetime } from 'ng2-datetime-picker';
Ng2Datetime.firstDayOfWeek = 0; //e.g. 1, or 6

@Component({
  selector: 'my-app',
  template: `
    <a href="" routerLink="/directive-test">Directive</a>
    <a href="" routerLink="/component-test">Component</a>
    <router-outlet></router-outlet>`
})
export class AppComponent {
}
