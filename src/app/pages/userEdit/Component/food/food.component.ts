import { Component, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { NotificationsService } from "angular2-notifications/src/notifications.service";
import { BaUserService } from "../../../../theme/services/baUser/baUser.service";
import { BaCateringService } from "app/theme/services/baCatering";


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
			'img': '/assets/img/food/schinken.jpg'

		},
		{
			'day': 'Freitag',
			'eat': 'Frühstück',
			'price': 2,
			'img': '/assets/img/food/frueh.jpg'
		},
		{
			'day': 'Freitag',
			'eat': 'Mittagessen',
			'price': 3,
			'img': '/assets/img/food/chilli.jpg'
		},
		{
			'day': 'Freitag',
			'eat': 'Abendessen',
			'price': 4,
			'img': '/assets/img/food/pizza.jpg'
		},
		{
			'day': 'Samstag',
			'eat': 'Frühstück',
			'price': 2,
			'img': '/assets/img/food/frueh.jpg'
		},
		{
			'day': 'Samstag',
			'eat': 'Mittagessen',
			'price': 3,
			'img': '/assets/img/food/reis.jpg'
		},
		{
			'day': 'Samstag',
			'eat': 'Abendessen',
			'price': 4,
			'img': '/assets/img/food/grillen.jpg'
		},
		{
			'day': 'Sonntag',
			'eat': 'Frühstück',
			'price': 2,
			'img': '/assets/img/food/frueh.jpg'
		},


	];

	constructor(private _toastService: NotificationsService,
				private _userService: BaUserService,
				private _cateringService: BaCateringService) {

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

	addFood(index, food) {
		let data;
		let foodString = this.foodArray.join("");
		if (food.bought == 1) {
			return this._toastService.info('Info!', 'Dieses Essen wurde schon bestellt!')
		}
		if (food.bought == 'vegi') {
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


		} else if (confirm('Willst du wirklich das Essen für ' + food.price + '€ nachbestellen?')) {
			this.foodArray[index] = '1';

			data = {
				'type': 'cFood',
				'food': this.foodArray.join(""),
				'vegi': this.vegi,
			};

			const time = Date.now();
			let orderDate = {
				ordered: time,
				delivered: time,
				foodName: food.day + ' ' + food.eat,
				price: food.price
			};

			this._cateringService.reorderFood(orderDate).subscribe(
				result => {
					this._userService.setUserInformation(data).subscribe(
						result2 => {
							this._toastService.success(result2.title, result2.message);
							this.refresh.emit();
						},
						error => {
							console.error(error);
						}
					)
				},
				error => {
					console.error(error)
				}
			);


		}

	}

}
