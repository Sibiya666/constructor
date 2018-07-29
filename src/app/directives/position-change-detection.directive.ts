import {
	Directive,
	HostListener,
	EventEmitter,
	Output
} from '@angular/core';
import {
 IСoordinates
} from './directive.models'
@Directive({
	selector: '[position-change-detection]'
})
export class PositionChangeDetectionDirective {
	isChange = false;

	@Output()
	positionChange = new EventEmitter<IСoordinates>();

	constructor() { }

	@HostListener('panstart', ['$event'])
	private onMouseDown(): boolean {
		this.isChange = true;
		return false;
	}

	@HostListener('document:panend', ['$event'])
	private onMouseUp(): boolean {
		this.isChange = false;
		return false;
	}

	@HostListener('document:panmove', ['$event'])
	private onPanMove(event: any): boolean {
		if (this.isChange) {
			this.positionChange.emit({
                x:event.center.x,
                y:event.center.y
            });
			return false;
		}
	}
}