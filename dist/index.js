"use strict";
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var common_1 = require('@angular/common');
var datetime_1 = require('./datetime');
exports.DateTime = datetime_1.DateTime;
var datetime_picker_component_1 = require('./datetime-picker.component');
exports.DateTimePickerComponent = datetime_picker_component_1.DateTimePickerComponent;
var datetime_picker_directive_1 = require('./datetime-picker.directive');
exports.DateTimePickerDirective = datetime_picker_directive_1.DateTimePickerDirective;
var Ng2DatetimePickerModule = (function () {
    function Ng2DatetimePickerModule() {
    }
    Ng2DatetimePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [datetime_picker_component_1.DateTimePickerComponent, datetime_picker_directive_1.DateTimePickerDirective],
                    exports: [datetime_picker_component_1.DateTimePickerComponent, datetime_picker_directive_1.DateTimePickerDirective],
                    entryComponents: [datetime_picker_component_1.DateTimePickerComponent],
                    providers: [datetime_1.DateTime]
                },] },
    ];
    /** @nocollapse */
    Ng2DatetimePickerModule.ctorParameters = [];
    return Ng2DatetimePickerModule;
}());
exports.Ng2DatetimePickerModule = Ng2DatetimePickerModule;
//# sourceMappingURL=index.js.map