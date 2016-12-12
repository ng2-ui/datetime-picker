import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule  } from '@angular/common';

import { Ng2Datetime } from './ng2-datetime';
import { Ng2DatetimePickerComponent } from './ng2-datetime-picker.component';
import { Ng2DatetimePickerDirective } from './ng2-datetime-picker.directive';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [Ng2DatetimePickerComponent, Ng2DatetimePickerDirective],
  exports:  [Ng2DatetimePickerComponent, Ng2DatetimePickerDirective],
  entryComponents: [Ng2DatetimePickerComponent],
  providers: [ Ng2Datetime ]
})
export class Ng2DatetimePickerModule {}
