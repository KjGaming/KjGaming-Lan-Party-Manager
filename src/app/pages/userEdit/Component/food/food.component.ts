import { Component, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { NotificationsService } from "angular2-notifications/src/notifications.service";
import { BaUserService } from "../../../../theme/services/baUser/baUser.service";


@Component({
  selector: 'userEditFood',
  styles: [require('./food.scss')],
  template: require('./food.component.html')
})


export class FoodUserEditComponent implements OnChanges {
  @Input() food;
  @Output() refresh: EventEmitter<string> = new EventEmitter();
  foodString: String = '00000000';
  foodArray: String[];
  vegi;
  foods = [
    {
      'day': 'Donnerstag',
      'eat': 'Abendessen',
      'price': 4,
      'img': 'http://www.europapark.de/sites/default/files/styles/gallery/public/Veranstaltungen/Event-Motive/Grillevent_weber.jpg?itok=S7q6fKPC'

    },
    {
      'day': 'Freitag',
      'eat': 'Frühstück',
      'price': 2,
      'img': 'http://www.austria-soelden.at/uploads/pics/austria_soelden_fruehstueck_05.jpg'
    },
    {
      'day': 'Freitag',
      'eat': 'Mittagessen',
      'price': 3,
      'img': 'http://www.knorr.de/Images/1022/1022-752548-Spaghetti_Bolognese_der_Klassiker.jpg'
    },
    {
      'day': 'Freitag',
      'eat': 'Abendessen',
      'price': 4,
      'img': 'http://www.europapark.de/sites/default/files/styles/gallery/public/Veranstaltungen/Event-Motive/Grillevent_weber.jpg?itok=S7q6fKPC'
    },
    {
      'day': 'Samstag',
      'eat': 'Frühstück',
      'price': 2,
      'img': 'http://www.austria-soelden.at/uploads/pics/austria_soelden_fruehstueck_05.jpg'
    },
    {
      'day': 'Samstag',
      'eat': 'Mittagessen',
      'price': 3,
      'img': 'http://www.knorr.de/Images/1022/1022-752548-Spaghetti_Bolognese_der_Klassiker.jpg'
    },
    {
      'day': 'Samstag',
      'eat': 'Abendessen',
      'price': 4,
      'img': 'http://www.europapark.de/sites/default/files/styles/gallery/public/Veranstaltungen/Event-Motive/Grillevent_weber.jpg?itok=S7q6fKPC'
    },
    {
      'day': 'Sonntag',
      'eat': 'Frühstück',
      'price': 2,
      'img': 'http://www.austria-soelden.at/uploads/pics/austria_soelden_fruehstueck_05.jpg'
    },


  ];

  constructor(private _toastService: NotificationsService,
              private _userService: BaUserService) {

  }

  ngOnChanges() {
    if (this.food.length != 0) {
      this.foodString = this.food.food;
      this.vegi = this.food.vegi;
    }
    this.foodArray = this.foodString.split("");

    for (let i in this.foods) {
      this.foods[i]['bought'] = this.foodArray[i];
    }
  }

  addFood(index, bought, price) {
    let data;
    let foodString = this.foodArray.join("");
    if (bought == 1) {
      return this._toastService.info('Info!', 'Dieses Essen wurde schon bestellt!')
    }
    if (bought == 'vegi') {
      this.vegi = index;
      data = {
        'type': 'cFood',
        'food': this.foodArray.join(""),
        'vegi': this.vegi,
      };

      this._userService.setUserInformation(data).subscribe(
        data => {
          this._toastService.success(data.title, data.message);
          this.refresh.emit();
        },
        error => {
          console.error(error);
        }
      )


    } else if (confirm('Willst du wirklich das Essen für ' + price + '€ nachbestellen?')) {
      this.foodArray[index] = '1';

      data = {
        'type': 'cFood',
        'food': this.foodArray.join(""),
        'vegi': this.vegi,
      };

      this._userService.setUserInformation(data).subscribe(
        data => {
          this._toastService.success(data.title, data.message);
          this.refresh.emit();
        },
        error => {
          console.error(error);
        }
      )


    }

  }

}
