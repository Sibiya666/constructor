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
        // console.log(this.dotOffsetX)
        
        this.onChangebrightness.emit(this.dotOffsetX);
    }

    @HostListener('mousedown', ['$event'])
    slideStart(event) {
        this.isSlide = true;
        console.log(1)
    }

    @HostListener('mouseup', ['$event'])
    slideEnd(event) {
        this.isSlide = false;
        console.log(2)

    }

    @HostListener('mousemove', ['$event'])
    slideContinium(event) {
        if (this.isSlide && event.offsetX - this.dotCenter > 0)  {
            this.dotOffsetX = ((event.offsetX - this.dotCenter));
            // console.log(event.offsetX)
            this.onChangebrightness.emit(this.dotOffsetX / this.scale);

        }
    }

    constructor( 
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void { 
         console.log(this.dotOffsetX)
    }

    ngAfterViewInit(): void {
        this.scale = this.container.nativeElement.getBoundingClientRect().width / 100;
        this.dotCenter = this.dot.nativeElement.getBoundingClientRect().width / 2;
    }
}
