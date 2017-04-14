import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationsService } from "angular2-notifications";
import { BaCateringService } from "../../../../theme/services/baCatering/baCatering.service";
import { CompleterService, CompleterData } from 'ng2-completer';
import { BaUserService } from "app/theme/services/baUser";
import 'rxjs/Rx';


@Component({
	selector: 'admin-reOrder',
	encapsulation: ViewEncapsulation.None,
	styles: [require('./reOrder.scss')],
	template: require('./reOrder.component.html'),
})
export class AdminReOrderComponent implements OnInit {
	public products;
	public ordered;
	public delivered;
	sumDelivered;
	public received;
	public shoppingCart = [];
	public options = {
		position: ["top", "center"],
		timeOut: 5000
	};

	pin;

	searchStr: string;
	searchUser: CompleterData;


	constructor(private _cateringService: BaCateringService,
				private _toastService: NotificationsService,
				private _completerService: CompleterService) {
		this.searchUser = _completerService.local(JSON.parse(localStorage.getItem('users')), 'nickName', 'nickName');
	}

	ngOnInit() {
		this.getProducts();
		this.getCatering();
	}

	getProducts() {
		this._cateringService.getProducts().subscribe(
			// the first argument is a function which runs on success
			data => {
				this.products = data.obj;
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done products')
		);
	}

	getCatering() {
		this.sumDelivered = 0;
		this._cateringService.getCatering('ordered').subscribe(
			// the first argument is a function which runs on success
			data => {
				this.ordered = data.obj;
			},
			// the second argument is a function which runs on error
			err => console.error(err)
		);
		this._cateringService.getCatering('delivered').subscribe(
			// the first argument is a function which runs on success
			data => {
				this.delivered = data.obj;
				for (let dev of data.obj) {
					this.sumDelivered += dev.count * dev.price;
				}
				console.log(this.delivered);
			},
			// the second argument is a function which runs on error
			err => console.error(err)
		);
		this._cateringService.getCatering('received').subscribe(
			// the first argument is a function which runs on success
			data => {
				this.received = data.obj;
			},
			// the second argument is a function which runs on error
			err => console.error(err)
		);
	}

	addToShoppingCart(product) {
		var isInArray = false;
		if (!this.shoppingCart) {
			this.shoppingCart.push({
				id: product._id,
				name: product.name,
				price: product.price,
				count: 1
			});
		} else {
			for (let key in this.shoppingCart) {
				if (this.shoppingCart[key].id == product._id) {
					this.shoppingCart[key].count += 1;
					isInArray = true;
					break;

				}
			}
			if (!isInArray) {
				this.shoppingCart.push({
					id: product._id,
					name: product.name,
					price: product.price,
					count: 1
				});
			}
		}

	}

	sendShoppingCart(shoppingCard) {

		let data = {
			nickName: this.searchStr,
			pin: this.pin,
			reOrder: true
		};
		if (0 == shoppingCard.length) {
			return this._toastService.info('Information', 'Der Warenkorb ist leer');
		}
		if (confirm('Willst du wirklich Bestellen?')) {
			this._cateringService.sendOrdered(shoppingCard, data).subscribe(
				// the first argument is a function which runs on success
				data => {
					this._toastService.success(data.title, data.message);
					this.shoppingCart = [];
					this.ngOnInit();
				},
				// the second argument is a function which runs on error
				err => {
					console.error(err);
					this._toastService.error(err.title, err.message);
				}
			);

		}

	}

	changeShoppingCount(id, event) {

		for (let key in this.shoppingCart) {
			if (this.shoppingCart[key].id == id) {
				if (event == 'up') {
					this.shoppingCart[key].count += 1;

				} else if (event == 'down') {
					this.shoppingCart[key].count -= 1;
					if (this.shoppingCart[key].count == 0) {
						this.shoppingCart.splice(parseInt(key), 1);
					}

				} else if (event == 'del') {
					this.shoppingCart.splice(parseInt(key), 1);
				}
				break;
			}
		}
	}


}
