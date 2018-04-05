import { Component, OnInit } from '@angular/core';
import { PopupService } from '../popup';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  data = 1;
  constructor(
    private popupService: PopupService
  ) { }

  ngOnInit() {
  }

  openPopup() {
    this.popupService.openPopup();
  }


}
