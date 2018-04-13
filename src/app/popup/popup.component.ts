
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
        '(document:keydown)': 'onKeydownHandler($event)'
    }
})
export class PopupComponent implements OnInit {
    constructor() {}
 
    close: (_?) => {_};

    ngOnInit() { }

    onClosehandler(): void {
       this.close()
    }

    onKeydownHandler(event: KeyboardEvent): void {
        if(event.keyCode == KeyCode) {
           this.onClosehandler()
        }
    }

    addCar(data):void {
       this.close(data)
    }
}
