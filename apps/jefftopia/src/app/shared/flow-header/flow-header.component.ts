import {
    Component,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
    ElementRef,
    HostListener
} from '@angular/core';

import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { sample } from 'rxjs/operators';

@Component({
    selector: 'js-flow-header',
    templateUrl: './flow-header.component.html',
    styleUrls: ['./flow-header.component.scss']
})
export class JSFlowHeader implements AfterViewInit, OnInit {

    private nodeList: HTMLElement[] = [];
    private mouseLeaveSubject = new Subject<MouseEvent>();

    private mouseLeaveObservable = this.mouseLeaveSubject
        .asObservable().pipe(sample(interval(300)));

    private mouseMoveSubject = new Subject<MouseEvent>();

    private mouseMoveObservable = this.mouseMoveSubject
        .asObservable().pipe(sample(interval(200)));

    @ViewChild('parent') parent: ElementRef;

    @HostListener('mouseleave', ['$event']) onmouseleave($event) {
        this.mouseLeaveSubject.next($event);
    }

    @HostListener('mousemove', ['$event']) onmousemove($event) {
        this.mouseMoveSubject.next($event);
    }

    @Input() title: string;
    public titleList: string[];

    ngOnInit() {
        this.titleList = this.title.split('');
    }

    ngAfterViewInit() {
        this.mouseMoveObservable.subscribe(x => this.onThrottleMouseMove(x));
        this.mouseLeaveObservable.subscribe(x => this.onThrottleMouseLeave(x));
    }

    private onThrottleMouseMove(e) {
        const { clientX, clientY } = e;
        const target: HTMLElement = <HTMLElement>document.elementFromPoint(clientX, clientY);

        if (target.classList.contains('letter') && target !== this.nodeList[0]) {
            this.clearNodes();

            let prev: HTMLElement = <HTMLElement>target.previousElementSibling;
            let after: HTMLElement = <HTMLElement>target.nextElementSibling;

            if (!after) {
                after = <HTMLElement>prev.previousElementSibling;
            }

            if (!prev) {
                prev = <HTMLElement>after.nextElementSibling;
            }

            this.nodeList = [
                target,
                after,
                prev
            ];

            this.scaleNodes();
        }
    }

    private onThrottleMouseLeave(e) {
        this.clearNodes();
    }

    private clearNodes() {
        if (this.nodeList.length) {
            this.nodeList.forEach(e => {
                if (e) {
                    e.setAttribute('style', `transform: scale(1)`);
                }
            });

            this.nodeList.length = 0;
        }
    }

    private scaleNodes() {
        let n = 1.3;

        this.nodeList.forEach(e => {
            if (e) {
                e.setAttribute('style', `transform: scale(${n})`);
                n -= 0.1;
            }
        });
    }
}
