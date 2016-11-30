import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { DateTime } from './datetime';
import { DateTimePickerComponent } from './datetime-picker.component';
import { DateTimePickerDirective } from './datetime-picker.directive';
export { DateTime, DateTimePickerComponent, DateTimePickerDirective };
export var Ng2DatetimePickerModule = (function () {
    function Ng2DatetimePickerModule() {
    }
    Ng2DatetimePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [DateTimePickerComponent, DateTimePickerDirective],
                    exports: [DateTimePickerComponent, DateTimePickerDirective],
                    entryComponents: [DateTimePickerComponent],
                    providers: [DateTime]
                },] },
    ];
    /** @nocollapse */
    Ng2DatetimePickerModule.ctorParameters = [];
    return Ng2DatetimePickerModule;
}());
//# sourceMappingURL=index.js.map