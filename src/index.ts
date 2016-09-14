import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule  } from '@angular/common';

import { DateTime } from './datetime';
import { DateTimePickerComponent } from './datetime-picker.component';
import { DateTimePickerDirective } from './datetime-picker.directive';

export {
  DateTime,
  DateTimePickerComponent,
  DateTimePickerDirective
};

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [DateTimePickerComponent, DateTimePickerDirective],
  exports:  [DateTimePickerComponent, DateTimePickerDirective],
  entryComponents: [DateTimePickerComponent],
  providers: [ DateTime ]
})
export class Ng2DatetimePickerModule {}
