import { NgModule } from '@angular/core';
import { LandingRoutesModule } from './landing.routes';
import { SharedModule } from '../shared/shared.module';
import { EntryComponent } from './entry/entry.component';
import { SwarmComponent } from './swarm/swarm.component';

@NgModule({
    declarations: [
        EntryComponent,
        SwarmComponent
    ],
    imports: [
        LandingRoutesModule,
        SharedModule
    ]
})
export class LandingModule {}
