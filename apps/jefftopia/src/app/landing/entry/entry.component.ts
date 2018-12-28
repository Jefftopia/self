import { Component, ViewChild, ElementRef } from '@angular/core';
import { SwarmComponent } from '../swarm/swarm.component';

@Component({
    selector: 'js-entry-landing',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.scss']
})
export class EntryComponent {

    @ViewChild(SwarmComponent) swarm: SwarmComponent;
    @ViewChild('matrix') matrix: ElementRef;

    // ngOnInit() {
    //     this.matrix.nativeElement.style = `transform: matrix(1, 0.1, 0.1, 1, 0, 0)`;
    // }

    public resume() {
        this.swarm.resume();
        this.stopped = false;
    }

    public pause() {
        this.swarm.pause();
        this.stopped = true;
    }

    public stopped: boolean = false;
}
