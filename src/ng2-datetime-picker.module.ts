import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule  } from '@angular/platform-browser';

import { DateTime } from './datetime';
import { DateTimePickerComponent } from './datetime-picker.component';
import { DateTimePickerDirective } from './datetime-picker.directive';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [DateTimePickerComponent, DateTimePickerDirective],
  exports:  [DateTimePickerComponent, DateTimePickerDirective],
  providers: [ DateTime ]
})
export class Ng2DatetimePickerModule {}
