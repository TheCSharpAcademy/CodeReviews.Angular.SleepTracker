import { Component, Inject, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ISleep } from '../models/ISleep.model';
import { ThemePalette } from '@angular/material/core';
import { SleepRecord } from '../sleep-record.modal';
import { SleepTypeConst } from '../models/SleepTypeConst';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  action: string;
  local_data: any;
  public breakpoint!: number;
  public color: ThemePalette = 'primary';
  startOfSleep: any;
  sleepTypes = SleepTypeConst;

  sleepRecord: SleepRecord = {
    startOfSleep: new Date(Date.now()),
    endOfSleep: new Date(Date.now()),
    typeOfSleep: SleepTypeConst.Sleep,
  };

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ISleep
  ) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

// typeOfSleep = 0;
// submitted = false;
// myDate = new Date();
// keys: any[] = [];
// sleepTypes = SleepTypeConst;
// selectedSleepType = SleepTypeConst.Sleep;

// constructor(
//   private fb: FormBuilder,
//   public dialog: MatDialog,
//   private sleepService: SleepService,
//   private router: Router,
//   public datepipe: DatePipe
// ) {}

// public createForm: FormGroup = new FormGroup<{
//   startOfSleep: FormControl<string | null>;
//   endOfSleep: FormControl<string | null>;
//   typeOfSleep: FormControl<Number | null>;
// }>({
//   startOfSleep: new FormControl(''),
//   endOfSleep: new FormControl(''),
//   typeOfSleep: new FormControl(null),
// });

// ngOnInit(): void {
//   this.keys = Object.entries(this.sleepTypes).map(([key, value]) => ({
//     name: key,
//     value: value,
//   }));
//   this.breakpoint = window.innerWidth <= 600 ? 1 : 2;

//   this.createForm = this.fb.group({
//     IdProof: null,
//     startOfSleep: [new Date().toISOString()],
//     endOfSleep: [new Date().toISOString()],
//     selectedSleepType: [''],
//   });
// }

// openDialog() {
//   // if (this.createForm.dirty) {
//   //   const.dialogRef = this.dialog.open(DeleteComponent, {
//   //     width: '340px'
//   //   });
//   this.dialog.closeAll();
//   // }
// }

// onResize(event: any) {
//   this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
// }

// onFormSubmit(): void {
//   if (this.createForm.invalid) {
//     return;
//   }

//   const { startOfSleep, endOfSleep } = this.createForm.value;
//   const startDate = this.datepipe.transform(
//     startOfSleep,
//     'yyyy-MM-ddTHH:mm:ssZ'
//   )!;
//   const endDate = this.datepipe.transform(
//     endOfSleep,
//     'yyyy-MM-ddTHH:mm:ssZ'
//   )!;

//   const data = {
//     startOfSleep: new Date(startDate).toISOString(),
//     endOfSleep: new Date(endDate).toISOString(),
//     typeOfSleep: this.createForm.controls['selectedSleepType'].value,
//   };

//   this.sleepService.addRecord(data).subscribe({
//     next: (res) => {
//       this.submitted = true;
//       this.openDialog();
//       this.changeLocation();
//     },
//     error: (e) => console.log(e),
//   });
// }

// changeLocation() {
//   const currentRoute = this.router.url;

//   console.log('Routing - Current URL : ' + currentRoute);

//   this.router
//     .navigateByUrl('sleep/index', { skipLocationChange: true })
//     .then(() => {
//       this.router.navigate([currentRoute]);
//     });
// }
