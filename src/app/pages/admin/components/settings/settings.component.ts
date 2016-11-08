import {Component, ElementRef} from '@angular/core';
import { SettingsLoader} from './settings.loader';

@Component({
  selector: 'google-maps',
  styles: [require('./settings.scss')],
  template: require('./settings.component.html'),
})
export class SettingsComponent {

  constructor(private _elementRef:ElementRef) {
  }

  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.google-maps');

    // TODO: do not load this each time as we already have the library after first attempt
    SettingsLoader.load((google) => {
      new google.maps.Map(el, {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    });
  }
}
