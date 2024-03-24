import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSleepComponent } from './add-sleep/add-sleep.component';import { AppComponent } from './app.component';
import { SleepOverviewComponent } from './sleep-overview/sleep-overview.component';
import { SleepHomeComponent } from './sleep-home/sleep-home.component';

const routes: Routes = [
  {path: 'sleep-home', component: SleepHomeComponent},
  {path: '', redirectTo: 'sleep-home', pathMatch: 'full'},
  {path: 'add-sleep', component: AddSleepComponent },
  {path: 'sleep-overview', component: SleepOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
