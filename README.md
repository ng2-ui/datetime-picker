# ng2-datetime-picker

[![Join the chat at https://gitter.im/ng2-ui/ng2-datetime-picker](https://badges.gitter.im/ng2-ui/ng2-datetime-picker.svg)](https://gitter.im/ng2-ui/ng2-datetime-picker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
AngularJS 2 DateTime Picker

<a href="https://rawgit.com/ng2-ui/ng2-datetime-picker/master/app/index.html">
  <img src="http://i.imgur.com/g5qbBBz.png" width="50%" style="border:1px solid grey" />
</a>

[Plunker Example](https://plnkr.co/edit/su2aiL)


## How Does It Work

1. Get a Date or string from input field.
2. If input value is string, convert it to Date object and save it internally.
3. When the input field is clicked, show date time picker with date value.
4. When date time is selected, set `toString` function of selected date for formatting.
5. Set input field with the selected value.

## Install

1. install ng2-datetime-picker

        $ npm install ng2-datetime-picker --save

2. add `map` and `packages` to your `systemjs.config.js`

        map[‘ng2-datetime-picker'] = 'node_modules/ng2-datetime-picker/dist';
        packages[‘ng2-datetime-picker'] = { main: 'ng2-datetime-picker.umd.js', defaultExtension: 'js’ }

3. import Ng2DatetimePickerModule to your AppModule

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

        
       <input
          [(ngModel)]="myDate"
          ng2-datetime-picker 
          date-only="true" />

       <form [formGroup]="myForm">
         <input 
           required
           [(ngModel)]='myVar' 
           formControlName="date" 
           ng2-datetime-picker
            date-only="true"/>
       </form>
       
       <input 
          [(ngModel)]="date2" ng2-datetime-picker
          date-format="DD-MM-YYYY hh:mm"
          year="2014"
          month="12"
          day="31"
          hour="23"
          minute='59'
          close-on-select="false"  />
          
For full example, please check `test` directory to see the example of;

  - `systemjs.config.js`
  - `app.module.ts`
  -  and `app.component.ts`.

## Override default style

The default style is written in `src/datetime-picker.component.ts`. 
This can be overwritten by giving more details css seletor.
 
e.g., 

    #my-div .ng2-datetime-picker {
      background-color: blue;
    }
## Override built-in date parser and date formatter

The default date parser and formatter can only handle 'YYYY-MM-DD HH:MM' format if you are not using momentjs.
If you use momentjs, you can use momentjs dateformat by adding the following in your html.

    <script src="moment-with-locales.min.js"></script>

If you want to have your dateformat without using momentjs, 
please override `DateTime.parser` and `DateTime.formatDate` function.
For example, 

    import { Ng2DatetimePickerModule, DateTime } from 'ng2-datetime-picker';

    // Override Date object formatter
    DateTime.formatDate = (date: Date) : string => { ..... my own function .... };

    // Override Date object parser
    DateTime.parse = (str: any): Date => { .... my own function ... } ;

    @NgModule({
      imports: [BrowserModule, FormsModule, Ng2DatetimePickerModule],
      declarations: [AppComponent],
      bootstrap: [ AppComponent ]
    })
    export class AppModule { }

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
  All options are optional except value

  * **date-only**,  true or false, default is false
  * **close-on-select**, true or false. indicates to close
    datetime-picker when select a date. default: true
  * **time-only**, true or false, default is false 
  * **first-day-of-week** start day of week, 0 is sunday
  * **date-format**,  momentjs date format, e.g. YYYY-MM-DD hh:mm:ss
    You need to include `moment` js in your html to use date-format.
    
    `<script src="moment.min.js"></script>`

     
## For Developers

### To start

    $ git clone https://github.com/ng2-ui/ng2-datetime-picker.git
    $ cd ng2-datetime-picker
    $ npm install
    $ npm start
 
### List of available npm tasks

  * `npm run` : List all available tasks
  * `npm start`: Run `app` directory for development using `webpack-dev-server` with port 9001
  * `npm run clean`: Remove dist folder
  * `npm run clean:dist`: Clean up unnecessary dist folder within dist and app directory
  * `npm run lint`: Lint TypeScript code
  * `npm run build:ngc`: build ES module
  * `npm run build:umd`: Build UMD module `ng2-map.umd.js`
  * `npm run build:app`: Build `app/build/app.js` for runnable examples
  * `npm run build`: Build all(build:ngc, build:umc, build:app, and clean:dist)
