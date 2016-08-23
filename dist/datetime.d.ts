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
    fromString(dateStr: string): Date;
    formatDate(d: Date, dateOnly: boolean): string;
    private removeTimezone(dateStr);
    private addDSTOffset(dateStr);
    private getDate(dateStr);
}
