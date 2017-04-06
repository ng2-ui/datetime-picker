import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule  } from '@angular/common';

import { NguiDatetime } from './datetime';
import { NguiDatetimePickerComponent } from './datetime-picker.component';
import { NguiDatetimePickerDirective } from './datetime-picker.directive';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [NguiDatetimePickerComponent, NguiDatetimePickerDirective],
  exports:  [NguiDatetimePickerComponent, NguiDatetimePickerDirective],
  entryComponents: [NguiDatetimePickerComponent],
  providers: [ NguiDatetime ]
})
export class NguiDatetimePickerModule {}
