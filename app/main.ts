// polyfills, comment the following out for debugging purpose
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'hammerjs';

// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from "@angular/forms";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { MaterialModule } from '@angular/material';

import { AppComponent }   from './app.component';

//noinspection TypeScriptCheckImport
import { Ng2DatetimePickerModule, Ng2Datetime } from 'ng2-datetime-picker';
import { Ng2UtilsModule } from 'ng2-utils';

import { APP_ROUTER_PROVIDERS, APP_ROUTER_COMPONENTS } from './app.route';

@NgModule({
  imports: [
    BrowserModule, 
    APP_ROUTER_PROVIDERS,
    FormsModule,
    ReactiveFormsModule,
    Ng2UtilsModule, 
    Ng2DatetimePickerModule,
    MaterialModule
  ],
  declarations: [AppComponent, APP_ROUTER_COMPONENTS],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);

