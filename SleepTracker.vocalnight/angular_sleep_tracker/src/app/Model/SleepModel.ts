export class SleepModel {
    public id: number;
    public timeStart: number;
    public timeEnd: number;
    public time: string;

    constructor(id: number, timeStart: number, timeEnd: number, time: string) {
        this.id = id;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.time = time;
    }
}
