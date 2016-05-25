"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var datetime_picker_directive_1 = require("./datetime-picker.directive");
var AppComponent = (function () {
    function AppComponent() {
        this.date1 = new Date("01-01-2015 00:00:00");
        this.date2 = new Date("Thu Jan 01 2015 00:00:00 GMT-0500 (EST)");
        this.date3 = '2015-01-01T00:00:00-0400';
        this.date4 = '2015-01-01';
        this.gmtDate = '2015-01-01T00:00:00.000Z';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <div>\n    <h1>Ng2 DateTime Picker Test</h1>\n    <!--<datetime-picker></datetime-picker>-->\n    &lt;input [(ngModel)]=\"date1\" datetime-picker date-only=\"true\" /&gt;<br/> \n    <input [(ngModel)]=\"date1\" datetime-picker date-only=\"true\" /> \n    \n    &lt;input [(ngModel)]=\"date2\" datetime-picker date-format=\"yMd\" date-only=\"true\" /&gt;  <br/>\n    <input [(ngModel)]=\"date2\" datetime-picker date-format=\"yMd\" date-only=\"true\" /> \n    \n    &lt;input  [(ngModel)]=\"date3\" datetime-picker date-format=\"yMd HH:mm:ss\" close-on-select=\"false\" /&gt;  <br/>\n    <input [(ngModel)]=\"date3\" datetime-picker date-format=\"yMd HH:mm:ss\" close-on-select=\"false\" /> \n    \n    &lt;input ng-model=\"date4\" datetime-picker hour=\"23\" minute='59'/&gt; <br/>\n    <input [(ngModel)]=\"date4\" datetime-picker hour=\"23\" minute='59'/>\n    \n    gmtDate : \"2015-01-01T00:00:00.000Z\" <br/>\n    &lt;input [(ngModel)]=\"gmtDate\" datetime-picker /&gt; <br/>\n    <input [(ngModel)]=\"gmtDate\" datetime-picker />\n    \n    <div style=\"position:fixed; bottom:0\">\n    &lt;input [(ngModel)]=\"date5\" datetime-picker\n       date-format=\"yMd HH:mm\" year=\"2014\" month=\"12\" day=\"31\" hour=\"23\" minute=\"59\" /&gt;<br>\n    <input [(ngModel)]=\"date5\" datetime-picker\n       date-format=\"yMd HH:mm\" \n       year=\"2014\" month=\"12\" day=\"31\" hour=\"23\" minute=\"59\" />\n  </div>\n  ",
            directives: [
                datetime_picker_directive_1.DateTimePickerDirective
            ],
            styles: ["\n    div { font-family: Courier; font-size: 13px}\n    input { min-width: 200px; margin-bottom: 20px; display: block; font-size: 15px; }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map