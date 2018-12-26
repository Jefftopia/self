import {
    Component,
    HostListener,
    ViewChild,
    ElementRef
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/interfaces';
import {
    selectMenuVisible,
    Hide,
    Show
} from '../../core/state/menu';

@Component({
    selector: 'js-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class JSNavbar {

    // public isMobileNavVisible: Observable<boolean>;
    private isVisible: boolean;
    private store: Store<AppState>;

    @ViewChild('menuList') menuList: ElementRef;
    @ViewChild('container') container: ElementRef;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        console.log('resize');

        requestAnimationFrame(() => {
            if (window.innerWidth > 768) {
                this.menuList.nativeElement.style.display = '';
                this.container.nativeElement.classList.remove('show-mobile-menu');
                document.body.classList.remove('no-scroll');
                this.store.dispatch(new Hide());
            }
        });
    }

    constructor(store: Store<AppState>) {
        this.store = store;

        this.store.pipe(select(selectMenuVisible))
            .subscribe(v => {
                console.log(`v sub `, v);
                this.isVisible = v;
            });
    }

    public showNav() {
        console.log('show', this.isVisible);
        if (this.isVisible) return;

        this.store.dispatch(new Show());
        this.menuList.nativeElement.style.display = "flex";

        this.container.nativeElement.classList.add('show-mobile-menu');
        document.body.classList.add('no-scroll');
    }

    public hideNav() {
        if (!this.isVisible) return;

        this.store.dispatch(new Hide());
        this.container.nativeElement.classList.remove('show-mobile-menu');

        this.menuList.nativeElement.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
}
