import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SleepTypeConst } from '../models/SleepTypeConst';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SleepService } from '../services/sleep.service';
import { SleepRecord } from '../sleep-record.modal';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public breakpoint!: number;
  public color: ThemePalette = 'primary';
  id!: number;
  record!: SleepRecord;
  editRecordForm!: FormGroup;
  submitted = false;
  sleepTypes = SleepTypeConst;
  keys: any[] = [];
  local_data: any;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private sleepService: SleepService,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  public editForm: FormGroup = new FormGroup<{}>({});

  ngOnInit(): void {
    this.keys = Object.entries(this.sleepTypes).map(([key, value]) => ({
      name: this.keys,
      value: value,
    }));

    // this.sleepService.findRecord(this.id).subscribe((data: SleepRecord) => {
    //   this.record = data;
    //   this.editRecordForm.controls['startOfSleep'].setValue(
    //     this.record.startOfSleep
    //   );
    //   this.editRecordForm.controls['endOfSleep'].setValue(
    //     this.record.endOfSleep
    //   );
    //   this.editRecordForm.controls['typeOfSleep'].setValue(
    //     this.record.typeOfSleep
    //   );
    // });

    this.editRecordForm = new FormGroup({
      startOfSleep: new FormControl(''),
      endOfSleep: new FormControl(''),
      typeOfSleep: new FormControl(''),
    });
  }

  openDialog() {
    this.dialog.closeAll();
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  onFormSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    const { startOfSleep, endOfSleep } = this.editForm.value;
    const startDate = this.datepipe.transform(
      startOfSleep,
      'yyyy-MM-ddTHH:mm:ssZ'
    )!;
    const endDate = this.datepipe.transform(
      endOfSleep,
      'yyyy-MM-ddTHH:mm:ssZ'
    )!;

    const data = {
      startOfSleep: new Date(startDate).toISOString(),
      endOfSleep: new Date(endDate).toISOString(),
      typeOfSleep: this.editForm.controls['selectedSleepType'].value,
    };

    this.sleepService.updateRecord(this.id, data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.openDialog();
        this.changeLocation();
      },
      error: (e) => console.log(e),
    });
  }

  changeLocation() {
    const currentRoute = this.router.url;

    console.log('Routing - Current URL : ' + currentRoute);

    this.router
      .navigateByUrl('sleep/index', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentRoute]);
      });
  }
}
