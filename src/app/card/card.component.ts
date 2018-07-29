import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { PopupService } from '../popup';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  host: {
    class: 'b-card-wrapper'
  },
})

export class CardComponent implements OnInit {
  carData: any = null;
  isData = false;
  visibleOptions = true;
  brightness: number;
  isEditPositionImg: boolean = true;

  @Input()
  cars: any;

  constructor(
    private popupService: PopupService
  ) { }


  ngOnInit() {
    this.carData = this.cars[0];
  }

  getData: (_?) => { _ };

  toogleVisibleOptions() {
    this.visibleOptions = !this.visibleOptions;
  }

  changeBrightness(event) {
    this.brightness = event;
  }

  async openPopup() {
    this.carData = await this.popupService.openPopup(this.cars);
  }

  onEditPositionImg(value: boolean) {
    this.isEditPositionImg = value;
  }

}
