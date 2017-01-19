"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
moment['locale']('en-ca'); //e.g. fr-ca
// Ng2Datetime.firstDayOfWeek = 6; //e.g. 1, or 6
var templateStr = "\n  <div id=\"my-div\">\n    <h1>Ng2 DateTime Picker Test</h1>\n    \n    <ng2-utils-1>\n      <input [(ngModel)]=\"myDate0\" />\n      <i class=\"fa fa-calendar\"\n         ng2-datetime-picker\n         [default-value]=\"defaultValue\"\n         (valueChanged)=\"myDate0=$event\"></i>\n    </ng2-utils-1>\n    <pre>{{templateStr | htmlCode:'ng2-utils-1'}}</pre>\n    \n    <hr/>\n    <ng2-utils-2>\n      <input\n        id=\"test1\"\n        [(ngModel)]=\"myDate\" \n        ng2-datetime-picker\n        [disabled-dates]=\"disabledDates\"\n        [min-date]=\"minDate\"\n        [max-date]=\"maxDate\"\n        date-only=\"true\"/>\n      myDate: {{myDate}}\n    </ng2-utils-2>\n    <pre>{{templateStr | htmlCode:'ng2-utils-2'}}</pre>\n   \n    <hr/>\n    <ng2-utils-3>\n      <form [formGroup]=\"myForm\">\n          <input \n            id=\"test2\"\n            required\n            formControlName=\"date\" \n            ng2-datetime-picker\n            close-on-select=\"false\"/>\n      </form>\n      myForm.controls.date.value: {{myForm.controls.date.value}}\n      <br/>\n      myForm.value: {{myForm.value | json}}\n      <br/>\n      myForm.dirty: {{myForm.dirty}}\n      <br/>\n      myForm.controls.date.dirty: {{myForm.controls.date.dirty}}\n      <br/>\n      <a href=\"#\" (click)=\"myForm.controls.date.patchValue('2015-06-30')\">2015-06-30</a>\n      <a href=\"#\" (click)=\"myForm.controls.date.patchValue('2015-07-19')\">2015-07-19</a>\n      <a href=\"#\" (click)=\"myForm.controls.date.patchValue('2015-12-31')\">2015-12-31</a>\n    </ng2-utils-3>\n    <pre>{{templateStr | htmlCode:'ng2-utils-3'}}</pre>\n    \n    <hr/>\n    <ng2-utils-4>\n      <input [(ngModel)]=\"date\" ng2-datetime-picker \n        id=\"test3\"\n        date-format=\"DD-MM-YYYY hh:mm\"\n        time-only=\"true\"\n        minute-step=\"5\"\n        close-on-select=\"false\" />\n    </ng2-utils-4>\n    <pre>{{templateStr | htmlCode:'ng2-utils-4'}}</pre>\n   \n    <hr/>\n    <ng2-utils-5>\n      <input \n        id=\"test4\"\n        [(ngModel)]=\"gmtDate\" \n        ng2-datetime-picker\n        date-format=\"MM-DD-YYYY\" />\n      gmtDate : \"2015-01-01T00:00:00.000Z\" \n      <br/>\n      <a href=\"#\" (click)=\"gmtDate='2016-11-03T22:00:00Z'\">Set date/time to: 2016-11-03T22:00:00Z</a>\n    </ng2-utils-5>\n    <pre>{{templateStr | htmlCode:'ng2-utils-5'}}</pre>\n    \n    <hr/>\n    <ng2-utils-6>\n      <input \n        id=\"test6\"\n        [(ngModel)]=\"dateWithTimezoneInfo\" \n        ng2-datetime-picker\n        date-format=\"YYYY-MM-DD HH:mm Z\" />\n        dateWithTimezoneInfo: {{dateWithTimezoneInfo}}\n      <br/>\n    </ng2-utils-6>\n    <pre>{{templateStr | htmlCode:'ng2-utils-6'}}</pre>\n   \n  </div>\n";
var AppComponent = (function () {
    function AppComponent(fb) {
        this.fb = fb;
        this.templateStr = templateStr;
        this.date = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
        this.gmtDate = '2015-01-01T00:00:00.000Z';
        this.dateWithTimezoneInfo = '2017-01-15T14:22:00-06:00';
        this.defaultValue = new Date(2014, 11, 31, 21, 45, 59);
        this.minDate = new Date(2017, 0, 1);
        this.maxDate = new Date(2017, 11, 31);
        this.disabledDates = [new Date(2016, 11, 26), new Date(2016, 11, 27)];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.myForm = this.fb.group({
            date: ['2016-02-15', [forms_1.Validators.required]],
        });
        moment.tz.setDefault('US/Central'); // Set the default timezone that moment will use
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: templateStr,
            encapsulation: core_1.ViewEncapsulation.None,
            styles: ["\n    ng2-utils-1 .ng2-datetime-picker-wrapper { display: inline-block }\n    div { font-family: Courier; font-size: 13px}\n    input { min-width: 200px; font-size: 15px; }\n    input.ng-dirty { background: #ddd; }\n  "]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
