export declare class DateTime {
    months: {
        fullName: string;
        shortName: string;
    }[];
    days: number[];
    /**
     * According to International Standard ISO 8601, Monday is the first day of the week
     * followed by Tuesday, Wednesday, Thursday, Friday, Saturday,
     * and with Sunday as the seventh and final day.
     * However, in Javascript Sunday is 0, Monday is 1.. and so on
     */
    daysOfWeek: ({
        fullName: string;
        shortName: string;
        weekend: boolean;
    } | {
        fullName: string;
        shortName: string;
    })[];
    firstDayOfWeek: number;
    localizedDaysOfWeek: ({
        fullName: string;
        shortName: string;
        weekend: boolean;
    } | {
        fullName: string;
        shortName: string;
    })[];
    getMonthData(year: number, month: number): any;
    static momentFormatDate(d: Date, dateFormat: string): string;
    static momentParse(dateStr: string): Date;
    static formatDate(d: Date, dateOnly: boolean): string;
    static parse(dateStr: string): Date;
    static removeTimezone(dateStr: any): string;
    static addDSTOffset(dateStr: any): string;
    static getDateFromString(dateStr: any): Date;
}
