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
  animations: [
    trigger('optionsState', [
      state('true', style({
        right: '-300px'
      })),
      transition('void <=> *', [
        animate(200)
      ])
    ])
  ]
})
export class CardComponent implements OnInit {

  carData: any = null;
  isData = false;
  visibleOptions = true;
  brightness: number;
  @Input()
  cars: any;
  constructor(
    private popupService: PopupService
  ) { }


  ngOnInit() {
    this.carData = this.cars[0];
   }

  getData: (_?) => {_};

  toogleVisibleOptions() {
    this.visibleOptions = !this.visibleOptions;
  }

  changeBrightness(event) {
    this.brightness = event;
  }

  async openPopup() {
    this.carData = await this.popupService.openPopup(this.cars);
  }
}
