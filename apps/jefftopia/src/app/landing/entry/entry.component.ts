import { Component, ViewChild } from '@angular/core';
import { SwarmComponent } from '../swarm/swarm.component';

@Component({
    selector: 'js-entry-landing',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.scss']
})
export class EntryComponent {

    @ViewChild(SwarmComponent) swarm: SwarmComponent;

    public resume() {
        this.swarm.resume();
        this.stopped = false;
    }

    public pause() {
        this.swarm.pause();
        this.stopped = true;
    }

    public title = 'Landing';
    public stopped: boolean = false;
}
