# ng2-datetime-picker
AngularJS 2 DateTime Picker

<img src="http://i.imgur.com/g5qbBBz.png" width="70%" style="border:1px solid grey" />

[Example](http://plnkr.co/edit/32syXF?p=preview)

## Install

1. add `map` and `packages` to https://npmcdn.com

        map['datetime-picker'] = 'https://npmcdn.com/ng2-datetime-picker';
        packages['datetime-picker'] = { main: 'dist/index.js', defaultExtension: 'js' 
       
2. import and add directive in your component

        import {DateTimePickerDirective} from "datetime-picker";
        ...
        @Component({
          directives: [DateTimePickerDirective],
          ..
        });

3. You are ready. use it in your template

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


