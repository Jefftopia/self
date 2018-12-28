import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';

import {
    Selection,
    BaseType,
    Timer,
    ScaleLinear,
    range,
    ContainerElement,
    scaleLinear,
    select,
    interval,
    transition,
    // attrTween,
    interpolateString,
    easeLinear,
    duration
} from 'd3';

interface IScatterPoint {
    x: number,
    y: number,
    xvel: number,
    yvel: number
};

@Component({
    selector: 'js-swarm',
    templateUrl: './swarm.component.html',
    styleUrls: ['./swarm.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwarmComponent implements OnDestroy, AfterViewInit {

    @ViewChild('svgWapper') el: ElementRef;

    private circle: Selection<BaseType, IScatterPoint, SVGAElement, {}>;
    private data: IScatterPoint[];
    private height: number;
    private svg: Selection<ContainerElement, {}, HTMLElement, any>;
    private width: number;
    private x: ScaleLinear<number, number>;
    private y: ScaleLinear<number, number>;
    private timer: Timer;
    private resizeHandle: EventListenerOrEventListenerObject;
    private scopedRepaint: any;
    private stopped: boolean;

    ngAfterViewInit() {
        let nativeElement = this.el.nativeElement;
        this.data = this.seedData();

        this.svg = select<HTMLElement, {}>(nativeElement)
            .append<ContainerElement>('svg:svg')
            .attr('class', 'svg-overlay');

        let size = this.dim;
        this.width = size.width;
        this.height = size.height;
        this.x = scaleLinear().domain([-5, 5]);
        this.y = scaleLinear().domain([-5, 5]);

        this.resizeHandle = this.refresh.bind(this);
        this.scopedRepaint = this.repaintCircles.bind(this);
        this.refresh();
        this.timer = interval(this.scopedRepaint, 50);

        window.addEventListener('resize', this.resizeHandle);
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.resizeHandle);
    }

    public pause() {
        this.timer.stop();
        this.stopped = true;
    }

    public resume() {
        this.timer.restart(this.scopedRepaint);
        this.stopped = false;
    }

    private refresh(): void {
        let size = this.dim;
        this.width = size.width;
        this.height = size.height;

        this.x.range([0, this.width]);
        this.y.range([0, this.height]);

        this.circle = this.svg.selectAll('circle');

        this.circle
            .data(this.data)
            .enter()
            .append('circle')
            .attr('cx', 10)
            .attr('cy', 10)
            .attr('r', 1);

        if (this.timer && !this.stopped) {
            this.timer.restart(this.scopedRepaint);
        }
        else {
            this.repaintCircles();
        }
    }

    private repaintCircles(num: number = 0) {
        this.data.forEach((d) => {
            d.x += d.xvel;
            d.y += d.yvel;
            d.xvel += 0.04 * (Math.random() - .5) - 0.05 * d.xvel - 0.0005 * d.x;
            d.yvel += 0.04 * (Math.random() - .5) - 0.05 * d.yvel - 0.0005 * d.y;
        });

        const t = transition()
            .duration(50)
            .ease(easeLinear);

        this.svg.selectAll('circle')
            .data(this.data);

        this.svg.selectAll('circle')
            .transition(t)
            .attr('transform', (d) => { return `translate(${this.x(d.x)},${this.y(d.y)})`; })
            .attr('r', (d) => { return Math.min(1.5 + 1000 * Math.abs(d.xvel * d.yvel), 12); })
            .attr('fill', (_d) => {
                return `hsl(${Math.random() * 360},60%,55%)`;
            });
    }

    private get dim() {
        return this.svg.node().getBoundingClientRect();
    }

    private seedData() {
        return range(40).map(() => {
            return { x: 0, y: 0, xvel: 0, yvel: 0 };
        });
    }
}
