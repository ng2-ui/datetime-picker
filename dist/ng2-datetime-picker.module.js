"use strict";
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var common_1 = require('@angular/common');
var ng2_datetime_1 = require('./ng2-datetime');
var ng2_datetime_picker_component_1 = require('./ng2-datetime-picker.component');
var ng2_datetime_picker_directive_1 = require('./ng2-datetime-picker.directive');
var Ng2DatetimePickerModule = (function () {
    function Ng2DatetimePickerModule() {
    }
    Ng2DatetimePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [ng2_datetime_picker_component_1.Ng2DatetimePickerComponent, ng2_datetime_picker_directive_1.Ng2DatetimePickerDirective],
                    exports: [ng2_datetime_picker_component_1.Ng2DatetimePickerComponent, ng2_datetime_picker_directive_1.Ng2DatetimePickerDirective],
                    entryComponents: [ng2_datetime_picker_component_1.Ng2DatetimePickerComponent],
                    providers: [ng2_datetime_1.Ng2Datetime]
                },] },
    ];
    /** @nocollapse */
    Ng2DatetimePickerModule.ctorParameters = [];
    return Ng2DatetimePickerModule;
}());
exports.Ng2DatetimePickerModule = Ng2DatetimePickerModule;
//# sourceMappingURL=ng2-datetime-picker.module.js.map