import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from "angular2-notifications";
import { BaCateringService } from "../../theme/services/baCatering/baCatering.service";
import * as io from 'socket.io-client';
import construct = Reflect.construct;

@Component({
	selector: 'catering',
	styles: [require('./catering.scss')],
	template: require('./catering.component.html')
})


export class CateringComponent implements OnInit, OnDestroy {
	static room: string = 'uCat';
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
	socket;
	room = 'uCat';


	constructor(private _cateringService: BaCateringService, private _toastService: NotificationsService) {
		this.socket = io('/catering');
		this.socket.emit('joinRoom', this.room);
		if (localStorage.getItem('shoppingCard')) {
			this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'));
		}
		this.socket.on('refreshDB', (data) => {
			this.getCatering();
			this._toastService.info('Information', data);
		});
	}

	ngOnInit() {
		this.getProducts();
		this.getCatering();

	}

	ngOnDestroy(){
		this.socket.emit('leaveRoom', this.room);
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
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done ordered')
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
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done ordered')
		);
		this._cateringService.getCatering('received').subscribe(
			// the first argument is a function which runs on success
			data => {
				this.received = data.obj;
			},
			// the second argument is a function which runs on error
			err => console.error(err),
			// the third argument is a function which runs on completion
			() => console.log('done ordered')
		);
	}

	deleteOrdered() {
		if(confirm('Willst du wirklich deine Bestellung stornieren?')) {
			this._cateringService.deleteOrdered().subscribe(
				// the first argument is a function which runs on success
				data => {
					console.log(data);
					this.getCatering();
					this._toastService.success(data.title, data.message);
				},
				// the second argument is a function which runs on error
				err => console.error(err)
			);
		}
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
		console.log(this.shoppingCart);
		localStorage.setItem('shoppingCard', JSON.stringify(this.shoppingCart));

	}

	sendShoppingCart(shoppingCard) {
		console.log(shoppingCard.length);
		if (0 == shoppingCard.length) {
			return this._toastService.info('Information', 'Dein Warenkorb ist leer');
		}
		if(confirm('Willst du wirklich Bestellen?')){
			this._cateringService.sendOrdered(shoppingCard).subscribe(
				// the first argument is a function which runs on success
				data => {
					this._toastService.success(data.title, data.message);
					this.ngOnInit();
					this.socket.emit('newOrder');
				},
				// the second argument is a function which runs on error
				err => console.error(err),
				// the third argument is a function which runs on completion
				() => console.log('done products')
			);


			localStorage.removeItem('shoppingCard');
			this.shoppingCart = [];
		}

	}

	changeShoppingCount(id, event) {
		console.log(id);
		console.log(event);
		console.log(this.shoppingCart);


		for (let key in this.shoppingCart) {
			if (this.shoppingCart[key].id == id) {
				if (event == 'up') {
					this.shoppingCart[key].count += 1;

				} else if (event == 'down') {
					this.shoppingCart[key].count -= 1;
					if (this.shoppingCart[key].count == 0) {
						this.shoppingCart.splice(parseInt(key), 1);
					}
					;
				} else if (event == 'del') {
					this.shoppingCart.splice(parseInt(key), 1);
				}
				break;
			}
		}
		localStorage.setItem('shoppingCard', JSON.stringify(this.shoppingCart));
	}

}
