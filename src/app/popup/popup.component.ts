
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ElementRef,
    ViewContainerRef
} from '@angular/core';


const KeyCode = 27;

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    host:{
        '(document:keydown)': 'onKeydownHandler($event)',
        // '(document:click)': 'outsideClickHandler($event)'
    }
})
export class PopupComponent implements OnInit {
    constructor() {}
 

    @Output()
    close = new EventEmitter<any>()

    ngOnInit() {

    }

    onClosehandler() {
        this.close.next(null);
    }

    onKeydownHandler(event: KeyboardEvent) {
        if(event.keyCode == KeyCode) {
           this.onClosehandler()
        }
    }
 
    outsideClickHandler(event: MouseEvent) {
        console.log(event.target)
        // if()
    }
}
