import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { PopupService } from '../popup';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  carData: any = null;
  isData: boolean = false;

  @Input()
  cars: any;

  constructor(
    private popupService: PopupService
  ) { }


  ngOnInit() {  }

  getData: (_?) => { _};

  async openPopup() {
    this.carData = await this.popupService.openPopup(this.cars);
  }
}
