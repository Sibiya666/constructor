import {
	Directive,
	HostListener,
	ElementRef,
	EventEmitter,
	Output
} from '@angular/core';

@Directive({
	selector: '[scroll-slide]'
})
export class ScrollSlideDirective {
	isSlide = false;

	@Output()
	dotOffsetXChange: EventEmitter<number> = new EventEmitter();

	constructor() { }

	@HostListener('panstart', ['$event'])
	private onMouseDown(): boolean {
		this.isSlide = true;
		return false;
	}

	@HostListener('document:panend', ['$event'])
	private onMouseUp(): boolean {
		this.isSlide = false;
		return false;
	}

	@HostListener('document:panmove', ['$event'])
	private onPanMove(event: any): boolean {
		if (this.isSlide) {
			this.dotOffsetXChange.emit(event.center.x);
			return false;
		}
	}
}