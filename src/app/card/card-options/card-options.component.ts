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

    @Output()
    brightness = new EventEmitter<number>();

    @Input()
    isVisible = false;

    constructor() { }

    ngOnInit(): void {

    }

    onChangeBrightness($event) {
        this.brightness.emit($event);
    }
}
