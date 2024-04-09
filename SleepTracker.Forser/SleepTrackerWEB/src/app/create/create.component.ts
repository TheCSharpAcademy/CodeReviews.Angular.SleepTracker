import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { Sleep } from '../models/Sleep.model';
import { SleepService } from '../services/sleep.service';
import { SleepTypeConst } from '../models/SleepTypeConst';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public breakpoint!: number;
  public color: ThemePalette = 'primary';

  typeOfSleep = 0;
  submitted = false;
  myDate = new Date();
  keys: any[] = [];
  sleepTypes = SleepTypeConst;
  selectedSleepType = SleepTypeConst.Sleep;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private sleepService: SleepService,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  public createForm: FormGroup = new FormGroup<{
    startOfSleep: FormControl<string | null>;
    endOfSleep: FormControl<string | null>;
    typeOfSleep: FormControl<Number | null>;
  }>({
    startOfSleep: new FormControl(''),
    endOfSleep: new FormControl(''),
    typeOfSleep: new FormControl(null),
  });

  ngOnInit(): void {
    this.keys = Object.entries(this.sleepTypes).map(([key, value]) => ({
      name: key,
      value: value,
    }));
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;

    this.createForm = this.fb.group({
      IdProof: null,
      startOfSleep: [new Date().toISOString()],
      endOfSleep: [new Date().toISOString()],
      selectedSleepType: [''],
    });
  }

  openDialog() {
    // if (this.createForm.dirty) {
    //   const.dialogRef = this.dialog.open(DeleteComponent, {
    //     width: '340px'
    //   });
    this.dialog.closeAll();
    // }
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  onFormSubmit(): void {
    if (this.createForm.invalid) {
      return;
    }

    const { startOfSleep, endOfSleep } = this.createForm.value;
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
      typeOfSleep: this.createForm.controls['selectedSleepType'].value,
    };

    this.sleepService.addRecord(data).subscribe({
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
