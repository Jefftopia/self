import {
    Component,
    Input,
    HostListener,
    AfterViewInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { interval, timer } from 'rxjs';
import { sample, debounce } from 'rxjs/operators';

@Component({
    selector: 'js-flow-button',
    templateUrl: './flow-button.component.html',
    styleUrls: ['./flow-button.component.scss']
})
export class JSFlowButton implements AfterViewInit {

    private mouseLeaveSubject = new Subject<MouseEvent>();
    private mouseleaveObservable = this.mouseLeaveSubject.asObservable()
        .pipe(sample(interval(350)))
        .pipe(debounce(val => timer(200)));

    private mousemoveSubject = new Subject<MouseEvent>();
    private mousemoveObservable = this.mousemoveSubject.asObservable().pipe(sample(interval(300)));

    @ViewChild('circle') circle: ElementRef;
    @ViewChild('label') label: ElementRef;
    @ViewChild('btn') btn: ElementRef;

    @HostListener('mousemove', ['$event']) onMouseOver($event) {
        this.mousemoveSubject.next($event);
    }

    @HostListener('mouseleave', ['$event']) onmouseleave($event) {
        this.mouseLeaveSubject.next($event);
    }

    @Input() text: string;

    ngAfterViewInit() {
        this.mousemoveObservable.subscribe(x => this.onThrottleMouseMove(x));
        this.mouseleaveObservable.subscribe(x => this.onThrottleMouseLeave(x));
    }

    public onClick(e) {
        const subject = encodeURIComponent('Connecting from your personal webpage');
        window.location.href=`mailto:jsmith6690@gmail.com?subject=${subject}`;
    }

    private onThrottleMouseLeave(e: MouseEvent) {
        this.circle.nativeElement.style = `width: 80px; transform: translate3d(0px, 0px, -20px);`;
        this.label.nativeElement.style = `clip-path: circle(40px at 5px calc(50% + 0px));`;
    }

    private onThrottleMouseMove(e: MouseEvent) {
        const { clientX, clientY } = e;
        const origin = this.origin;

        const delta = {
            dx: clientX - origin.x,
            dy: clientY - origin.y
        };

        const isHover = this.isHover(this.btn.nativeElement);

        this.updateCircle(delta, isHover);
        this.updateLabel(delta, isHover);
    }

    private updateLabel(delta, isHover: boolean) {
        const label = this.label.nativeElement;
        const x = isHover ? delta.dx : 235;
        const d = Math.max(275 - Math.abs(x), 40);

        label.style = `clip-path: circle(${d}px at 5px calc(50% + 0px));`;
    }

    private updateCircle(delta, isHover: boolean) {
        let w = isHover ? `100%` : '80px';
        const xSign = Math.sign(delta.dx);
        const ySign = Math.sign(delta.dy);
        const abx = xSign*delta.dx;
        const aby = xSign*delta.dy;

        if (abx >= 50) delta.dx = xSign * 45;
        if (aby >= 25) delta.dy = ySign * 25;

        this.circle.nativeElement.style = `width: ${w};
    transform: translate3d(${delta.dx / 2}px, ${delta.dy / 2}px, -20px);
    `;
    }

    private isHover(e) {
        return e.matches(':hover');
    }

    private get origin() {
        // const d = this.nativeHost;
        const d = this.btn.nativeElement;

        return {
            x: d.offsetLeft + d.offsetWidth / 2,
            y: d.offsetTop + d.offsetHeight / 2
        };
    }
}
