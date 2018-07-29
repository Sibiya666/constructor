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
import { IСoordinates } from '../directives/directive.models';
import { IStartPosition } from './scroll-bar.models';

@Component({
    selector: 'app-scroll-bar',
    templateUrl: './scroll-bar.component.html'
})

export class ScrollBarComponent implements OnInit, AfterViewInit {
    positionX: number;
    scale: number;
    dotCenter: number;
    containerRect: IStartPosition;
    startPosition: number;
    
    @Input()
    defaultValue = 0;
    
    @Input()
    minValue = 0;

    @Input()
    maxValue = 1;
    
    @Input()
    isPercent: boolean;

    @ViewChild('container')
    container: ElementRef;

    @ViewChild('dot')
    dot: ElementRef;

    @Output()
    onChangeValue = new EventEmitter<number>();

    @HostListener('click', ['$event'])
    down(event) {
        this.positionX = event.offsetX - this.dotCenter;
        this.positionX = this.positionX < this.minValue ? this.minValue : this.positionX;
        this.setPositionLeft(this.positionX);
        this.onChangeValue.emit(this.positionX / this.scale);
    }

    constructor() { }

    ngOnInit(): void {  }

    ngAfterViewInit(): void {
        this.containerRect = this.container.nativeElement.getBoundingClientRect();
        this.scale = this.containerRect.width / this.maxValue;
        this.dotCenter = this.dot.nativeElement.getBoundingClientRect().width / 2;
        this.startPosition = this.containerRect.right;
        this.isPercent ? this.setPositionLeft(this.containerRect.width / 100 * this.defaultValue - this.dotCenter) : this.setPositionLeft(this.scale * this.defaultValue - this.dotCenter);  
    }

    private onChangePositionX(event: IСoordinates) {
        this.positionX = event.x - this.startPosition;
        this.positionX = this.positionX < this.minValue ? this.minValue : this.positionX;

        if (this.container.nativeElement.getBoundingClientRect().width - this.dotCenter> this.positionX) {
            this.setPositionLeft(this.positionX);
            this.onChangeValue.emit(this.positionX / this.scale);
        }
    }

    private setPositionLeft(value: number) {
        this.dot.nativeElement.style.left = value + 'px'
    }
}
