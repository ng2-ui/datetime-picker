export declare class DateTime {
    months: any[];
    days: number[];
    firstDayOfWeek: number;
    daysOfWeek: any[];
    localizedDaysOfWeek: any[];
    static customFirstDayOfWeek: number;
    constructor();
    initialize(): void;
    getMonthData(year: number, month: number): any;
    static momentFormatDate(d: Date, dateFormat: string): string;
    static momentParse(dateStr: string, dateFormat: string): Date;
    static formatDate(d: Date, dateOnly: boolean): string;
    static parse(dateStr: string): Date;
    static removeTimezone(dateStr: any): string;
    static addDSTOffset(dateStr: any): string;
    static getDateFromString(dateStr: any): Date;
    static setFirstDayOfWeek(firstDayOfWeek: number): void;
}
