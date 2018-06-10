import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    HostListener,
    ElementRef,
    ViewChild,
    AfterViewInit,
    Input
} from '@angular/core';

@Component({
    selector: 'app-scroll-bar',
    templateUrl: './scroll-bar.component.html'
})

export class ScrollBarComponent implements OnInit, AfterViewInit {
    positionX: number;
    scale: number;
    dotCenter: number;
    startPosition : number;
    clientRect: any;

    @Input()
    minValue = 0;

    @Input()
    maxValue = 1;
    
    @ViewChild('container')
    container: ElementRef;

    @ViewChild('dot')
    dot: ElementRef;

    @Output()
    onChangeValue = new EventEmitter<number>();

    @HostListener('click', ['$event'])
    down(event) {
        this.positionX = event.offsetX - this.dotCenter;
        this.positionX = this.positionX < 0 ? 0: this.positionX;
        this.setPositionLeft(this.positionX);
        this.onChangeValue.emit(this.positionX / this.scale);
    }

    constructor() { }

    ngOnInit(): void {  }

    ngAfterViewInit(): void {
        this.clientRect = this.container.nativeElement.getBoundingClientRect();
        this.scale = this.clientRect.width / this.maxValue;
        this.dotCenter = this.dot.nativeElement.getBoundingClientRect().width / 2;
        this.startPosition = this.clientRect.right;
    }

    private onChangePositionX(event: number) {
        this.positionX = event - this.startPosition;
        this.positionX = this.positionX < 0 ? 0 : this.positionX;

        if (this.container.nativeElement.getBoundingClientRect().width - this.dotCenter> this.positionX) {
            this.setPositionLeft(this.positionX);
            this.onChangeValue.emit(this.positionX / this.scale);
        }
    }

    private setPositionLeft(value: number) {
        this.dot.nativeElement.style.left = value + 'px'
    }
}
