export class SleepModelForm {
    public id: number;
    public timeStart: number;
    public dateStart: Date;
    public time: string;

    constructor(id: number, timeStart: number, dateStart: Date, time: string) {
        this.id = id;
        this.timeStart = timeStart;
        this.time = time;
        this.dateStart = dateStart;
    }
}
