import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    HostListener,
    ElementRef,
    ViewChild,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';

@Component({
    selector: 'app-scroll-bar',
    templateUrl: './scroll-bar.component.html'
})

export class ScrollBarComponent implements OnInit, AfterViewInit {
    dotOffsetX: number;
    scale: number;
    dotCenter: number;
    get startPosition() {
        return this.container.nativeElement.getBoundingClientRect().left
    }

    @ViewChild('container')
    container: ElementRef;

    @ViewChild('dot')
    dot: ElementRef;

    @Output()
    onChangeValue = new EventEmitter<number>();

    @HostListener('click', ['$event'])
    down(event) {
        this.dotOffsetX = event.offsetX - this.dotCenter;
        this.onChangeValue.emit(this.dotOffsetX / this.scale);
    }

    constructor() { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.scale = this.container.nativeElement.getBoundingClientRect().width / 300;
        this.dotCenter = this.dot.nativeElement.getBoundingClientRect().width / 2;

    }

    onDotOffsetXChange(event: any) {
        let currentPosition = event - this.startPosition;

        if (currentPosition > -this.dotCenter && this.container.nativeElement.getBoundingClientRect().width - this.dotCenter> currentPosition) {
            this.dot.nativeElement.style.left = currentPosition + 'px';
            this.onChangeValue.emit(currentPosition / this.scale);
        }

    }
}
