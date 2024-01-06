import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SleepTableComponent } from './sleep-table/sleep-table.component';

export const routes: Routes = [
    {path:'', component:IndexComponent},
    {path: 'logs', component:SleepTableComponent}
];
