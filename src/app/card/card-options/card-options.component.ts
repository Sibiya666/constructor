import {
    Component,
    Output,
    EventEmitter,
    OnInit,
    Input,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import { FormControl } from '../../../../node_modules/@angular/forms';

@Component({
    selector: 'app-card-options',
    templateUrl: './card-options.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('optionsState', [
            state('true', style({
                right: '-320px',
                opacity: '1'
            })),
            transition('void <=> *', [
                animate(200)
            ])
        ])
    ]
})

export class CardOptionsComponent implements OnInit {
    widthContainer = 0;
    brightness = '0.5';

    @Output()
    onBrightness = new EventEmitter<number>();

    @Output()
    isEditPositionImg = new EventEmitter<boolean>();

    @Input()
    isVisible = false;
    

    editPositionImg = new FormControl('true');

    constructor() { }

    ngOnInit(): void {
        this.editPositionImg.valueChanges.subscribe(value =>
            this.isEditPositionImg.emit(value)
        )
    }

    onChangeBrightness(event: number) {
        this.brightness = event.toFixed(2);
        this.onBrightness.emit(event);
    }




}
