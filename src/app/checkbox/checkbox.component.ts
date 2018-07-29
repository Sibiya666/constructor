import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor,
	NG_VALUE_ACCESSOR
 } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxComponent),
			multi: true
		}
	],

})
export class CheckboxComponent implements ControlValueAccessor {
  value = false;
  constructor() { }

  onChange = (_: any) => { };
	onTouched = (_: any) => { };

  writeValue(value: any) {
		this.value = value;
	}
	registerOnChange(fn: any) {
		this.onChange = fn;
	}
	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	toggle(value: any) {
		this.value = value;
		this.onChange(value)
	}

}
