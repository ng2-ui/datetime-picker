"use strict";
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var common_1 = require('@angular/common');
var datetime_1 = require('./datetime');
var datetime_picker_component_1 = require('./datetime-picker.component');
var datetime_picker_directive_1 = require('./datetime-picker.directive');
var NguiDatetimePickerModule = (function () {
    function NguiDatetimePickerModule() {
    }
    NguiDatetimePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [datetime_picker_component_1.NguiDatetimePickerComponent, datetime_picker_directive_1.NguiDatetimePickerDirective],
                    exports: [datetime_picker_component_1.NguiDatetimePickerComponent, datetime_picker_directive_1.NguiDatetimePickerDirective],
                    entryComponents: [datetime_picker_component_1.NguiDatetimePickerComponent],
                    providers: [datetime_1.NguiDatetime]
                },] },
    ];
    /** @nocollapse */
    NguiDatetimePickerModule.ctorParameters = [];
    return NguiDatetimePickerModule;
}());
exports.NguiDatetimePickerModule = NguiDatetimePickerModule;
//# sourceMappingURL=datetime-picker.module.js.map