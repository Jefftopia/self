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

import {
    scaleLinear
} from 'd3';

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
    private mousemoveObservable = this.mousemoveSubject.asObservable().pipe(sample(interval(250)));
    private host: ElementRef;
    private scaleX: scaleLinear;
    private scaleY: scaleLinear;

    @ViewChild('circle') circle: ElementRef;
    @ViewChild('label') label: ElementRef;
    @ViewChild('btn') btn: ElementRef;

    @HostListener('mousemove', ['$event']) onMouseOver($event) {
        this.mousemoveSubject.next($event);
    }

    @HostListener('mouseleave', ['$event']) onmouseleave($event) {
        this.mouseLeaveSubject.next($event);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.makeScales();
    }

    @Input() text: string;

    constructor(host: ElementRef) {
        this.host = host;
    }

    ngAfterViewInit() {
        this.makeScales();
        this.mousemoveObservable.subscribe(x => this.onThrottleMouseMove(x));
        this.mouseleaveObservable.subscribe(x => this.onThrottleMouseLeave(x));
    }

    public onClick() {
        const subject = encodeURIComponent('Connecting from your personal webpage');
        window.location.href=`mailto:jsmith6690@gmail.com?subject=${subject}`;
    }

    private makeScales() {
        const rect = (<HTMLElement>this.host.nativeElement).parentElement.getBoundingClientRect();

        this.scaleX = scaleLinear()
            .domain([rect.left, rect.right])
            .range([-40, 52]);

        this.scaleY = scaleLinear()
            .domain([rect.top, rect.bottom])
            .range([-35, 35]);
    }

    private onThrottleMouseLeave(e: MouseEvent) {
        this.circle.nativeElement.style = `width: 80px; transform: translate3d(0px, 0px, -20px);`;
        this.label.nativeElement.style = `clip-path: circle(40px at 5px calc(50% + 0px));`;
    }

    private onThrottleMouseMove(e: MouseEvent) {
        const { clientX, clientY } = e;

        const delta = {
            dx: this.scaleX(clientX),
            dy: this.scaleY(clientY)
        };

        const isHover = this.isHover(this.btn.nativeElement);

        this.updateCircle(delta, isHover);
        this.updateLabel(delta, isHover);
    }

    private updateLabel(delta, isHover: boolean) {
        const label = this.label.nativeElement;
        const x = isHover ? 180 : 40;

        label.style = `clip-path: circle(${x}px at ${delta.dx+9}px calc(50% + 2px));`;
    }

    private updateCircle(delta, isHover: boolean) {
        let w = isHover ? `100%` : '80px';

        this.circle.nativeElement.style = `width: ${w};
    transform: translate3d(${delta.dx*1.2}px, ${delta.dy}px, -20px);
    `;
    }

    private isHover(e) {
        return e.matches(':hover');
    }
}
