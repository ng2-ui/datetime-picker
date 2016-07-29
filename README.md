# ng2-datetime-picker
AngularJS 2 DateTime Picker

<a href="https://embed.plnkr.co/lbNRAh/">
  <img src="http://i.imgur.com/g5qbBBz.png" width="50%" style="border:1px solid grey" />
</a>

## Install

1. install ng2-datetime-picker

        $ npm install ng2-datetime-picker --save

2. add `map` and `packages` to your `systemjs.config.js`

        map['datetime-picker'] = 'node_modules/ng2-datetime-picker';
        // map['datetime-picker'] = 'https://npmcdn.com/ng2-datetime-picker'; // or without npm installation
        packages['datetime-picker'] = { main: 'dist/index.js', defaultExtension: 'js' 

## Usage it in your code

1. import and add directive in your component

        import {DateTimePickerDirective} from "datetime-picker";
        ...
        @Component({
          directives: [DateTimePickerDirective],
          ..
        });

2. You are ready. use it in your template

        <input [(ngModel)]="date1" datetime-picker date-only="true" />


## attributes
  All options are optional except ngModel

  * ngModel, date variable
  * year, e.g., 2016, default: current year
  * month, e.g.,  6, default: current month
  * day, e.g., 13, default: current day
  * hour, e.g. 23, default: current hour
  * minute e.g. 59, default: current minute
  * date-format, [Angular2 DatePipe date format](https://angular.io/docs/ts/latest/api/common/index/DatePipe-class.html) default: 'yMd'
  * date-only,  true or false, default is false
  * close-on-select, true or false. indicates to close
    datetime-picker when select a date. default: true


## For Developers

### To start

    $ git clone https://github.com/ng2-ui/ng2-map.git
    $ cd ng2-popup
    $ npm install
    $ npm start


