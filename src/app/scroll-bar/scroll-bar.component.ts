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
    templateUrl: './scroll-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScrollBarComponent implements OnInit, AfterViewInit {
    dotOffsetX: number;
    isSlide = false;
    scale: number;
    dotCenter: number;

    @ViewChild('container')
    container: ElementRef;
    
    @ViewChild('dot')
    dot: ElementRef;

    @Output()
    onChangebrightness = new EventEmitter<number>();

    @HostListener('click', ['$event'])
    down(event) {
        this.dotOffsetX = event.offsetX - this.dotCenter;        
        this.onChangebrightness.emit(this.dotOffsetX);
    }

    @HostListener('mousedown', ['$event'])
    slideStart(event) {
        this.isSlide = true;
    }

    @HostListener('mouseup', ['$event'])
    slideEnd(event) {
        this.isSlide = false;
    }

    @HostListener('mousemove', ['$event'])
    slideContinium(event) {
        if (this.isSlide && event.offsetX - this.dotCenter > 0)  {
            this.dotOffsetX = ((event.offsetX - this.dotCenter));
            // this.onChangebrightness.emit(this.dotOffsetX / this.scale);
        }
    }

    constructor(    ) {   }

    ngOnInit(): void { 
  
    }

    ngAfterViewInit(): void {
        this.scale = this.container.nativeElement.getBoundingClientRect().width / 100;
        this.dotCenter = this.dot.nativeElement.getBoundingClientRect().width / 2;
    }
}
