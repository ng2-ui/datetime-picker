import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from "@angular/forms";

import { AppComponent }   from './app.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

@NgModule({
  imports: [BrowserModule, FormsModule, Ng2DatetimePickerModule],
  declarations: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
