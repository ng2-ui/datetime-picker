# ng2-datetime-picker
AngularJS 2 DateTime Picker

<a href="https://ng2-ui.github.io/#/datetime-picker">
  <img src="http://i.imgur.com/g5qbBBz.png" width="50%" style="border:1px solid grey" />
</a>

Plunker Example: https://plnkr.co/edit/A5ITtI

## Install

1. install ng2-datetime-picker

        $ npm install ng2-datetime-picker --save

2. add `map` and `packages` to your `systemjs.config.js`

        map[‘ng2-datetime-picker'] = 'node_modules/ng2-datetime-picker/dist';
        packages[‘ng2-datetime-picker'] = { main: 'index.js', defaultExtension: 'js’ }

3. import Ng2AutoCompleteModule to your AppModule

        import { NgModule } from '@angular/core';
        import { FormsModule } from "@angular/forms";
        import { BrowserModule  } from '@angular/platform-browser';
        import { AppComponent } from './app.component';
        import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
        
        @NgModule({
          imports: [BrowserModule, FormsModule, Ng2DatetimePickerModule],
          declarations: [AppComponent],
          bootstrap: [ AppComponent ]
        })
        export class AppModule { }

## Usage it in your code

        <input [(ngModel)]="date1" datetime-picker date-only="true" />

For full example, please check `test` directory to see the example of;

  - `systemjs.config.js`
  - `app.module.ts`
  -  and `app.component.ts`.

## **ng2-ui** welcomes new members and contributors

This module is only improved and maintained by contributors like you;

As a contributor, it's NOT required to be skilled in Javascript nor Angular2. 
It’s required to be open-minded and interested in helping others.
You can contribute to the following;

  * Updating README.md
  * Making more and clearer comments
  * Answering issues and building FAQ
  * Documentation
  * Translation

In result of your active contribution, you will be listed as a core contributor
on https://ng2-ui.github.io, and a member of ng2-ui too.

If you are interested in becoming a contributor and/or a member of ng-ui,
please send me email to `allenhwkim AT gmail.com` with your github id. 

## attributes
  All options are optional except ngModel

  * ngModel, date variable
  * year, e.g., 2016, default: current year
  * month, e.g.,  6, default: current month
  * day, e.g., 13, default: current day
  * hour, e.g. 23, default: current hour
  * minute e.g. 59, default: current minute
  * date-only,  true or false, default is false
  * close-on-select, true or false. indicates to close
    datetime-picker when select a date. default: true


## For Developers

### To start

    $ git clone https://github.com/ng2-ui/ng2-datetime-picker.git
    $ cd ng2-datetime-picker
    $ npm install
    $ npm start
