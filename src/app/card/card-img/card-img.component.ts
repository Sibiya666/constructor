import {
    Component,
    OnInit,
    Input,
    ElementRef,
    ViewChild
} from '@angular/core';
import { IСoordinates } from '../../directives/directive.models';
@Component({
    selector: 'app-card-img',
    templateUrl: './card-img.component.html'
})
export class CardImgComponent implements OnInit {
    @Input()
    img: string;

    @Input()
    isEditPositionImg: boolean;

    @Input()
    brightness: number;

    @ViewChild('imgContainer')
    imgContainer: ElementRef

    imgPositionY: number = this.initialPosition.y;
    imgPositionX
    get initialPosition() {
        return this.element.nativeElement.getBoundingClientRect()
    }
    constructor(private element: ElementRef) { }

    ngOnInit(): void { }

    previusY: number;
    nextY: number;
    onPositionChange(coordinates: IСoordinates) {
        if (!this.previusY) {
            this.previusY = coordinates.y
            return
        }

        this.imgPositionY = this.previusY && this.previusY < coordinates.y ?
            this.imgPositionY + 5 : this.imgPositionY - 5;
        this.previusY = coordinates.y;


    }
}
