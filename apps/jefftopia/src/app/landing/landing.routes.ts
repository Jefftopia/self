import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { NgModule } from '@angular/core';

const LANDING_ROUTES: Routes = [
    {
        path: '',
        component: EntryComponent
    }
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forChild(LANDING_ROUTES) ]
})
export class LandingRoutesModule {}
