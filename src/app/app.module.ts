import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {
  CardComponent,
  CardOptionsComponent,
  CardImgComponent
} from './card';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ScrollBarComponent } from './scroll-bar';
import { PositionChangeDetectionDirective } from './directives';

import {
  PopupComponent,
  PopupService
} from './popup';

import { AppService } from './app.service';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardOptionsComponent,
    CardImgComponent,
    HeaderComponent,
    FooterComponent,
    PopupComponent,
    ScrollBarComponent,
    PositionChangeDetectionDirective,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PopupService,
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupComponent
  ]
})
export class AppModule { }
