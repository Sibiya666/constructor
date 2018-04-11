import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  constructor(private appService: AppService){}
  cars: any;
  filteradCas: any;

  ngOnInit() {
    this.appService.loadCars().subscribe(x => this.cars = x)
  }
  
}
