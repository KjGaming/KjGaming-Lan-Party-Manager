import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "angular2-notifications";
import { BaCateringService } from "../../../../theme/services/baCatering/baCatering.service";
import * as io from 'socket.io-client';

@Component({
	selector: 'admin-catering',
	styles: [require('./catering.scss')],
	template: require('./catering.component.html'),
})
export class AdminCateringComponent implements OnInit {
	ordersId = [];
	receivedId = [];

	ordered = [];
	delivered = [];
	received = [];
	allReceivedProducts = [];

	room = 'aCat';
	socket;

	public options = {
		position: ["top", "center"],
		timeOut: 5000
	};

	constructor(protected _cateringService: BaCateringService, private _toastService: NotificationsService) {
	}

	ngOnInit() {
		this.getCatering();
		this.socket = io('/catering');
		this.socket.emit('joinRoom', this.room);
		this.socket.on('pushAdminOrder', function () {
			this.ordered = [];
			this.getCatering();
		}.bind(this));
	}

	onChange() {

	}

	getCatering() {
		this._cateringService.getAdminCat().subscribe(
			// the first argument is a function which runs on success
			data => {
				this.ordersId = [];
				this.receivedId = [];

				let user = {ordered: [], delivered: [], received: []};
				for (let cat of data.obj) {
					if (cat.status == 'ordered') {
						this.ordersId.push(cat._id);
						this.assignToStatus(user.ordered, cat, this.ordered);
					} else if (cat.status == 'delivered') {
						this.assignToStatus(user.delivered, cat, this.delivered);
					} else if (cat.status == 'received') {
						this.receivedId.push(cat._id);
						this.assignToStatus(user.received, cat, this.received);
					}

				}
				this.allReceivedProducts = this.sumProducts(this.received);
				console.log(this.allReceivedProducts);

			},
			// the second argument is a function which runs on error
			err => console.error(err)
		);
	}

	assignToStatus(user, cat, saveObject) {

		if (user.indexOf(cat.user._id) < 0) {
			user.push(cat.user._id);
			saveObject.push({
				'id': cat.user._id,
				'name': cat.user.firstName + ' | ' + cat.user.nickName,
				'seat': cat.user.seat,
				'products': this.sumOrderProdukt(cat.products, null)
			});
		} else {
			for (let key in saveObject) {
				if (saveObject[key].id == cat.user._id) {
					return saveObject[key].products = this.sumOrderProdukt(cat.products, saveObject[key].products);
				}
			}

		}
	}

	sumOrderProdukt(product, oldProduct) {
		let newProduct = [];
		let addCount;
		if (oldProduct != null) {
			newProduct = oldProduct;
			for (let p of product) {
				addCount = false;
				for (let key in newProduct) {
					if (newProduct[key].name == (p.id.name)) {
						newProduct[key].count += p.count;
						addCount = true;
						break;
					}
				}
				if (!addCount) {
					newProduct.push({
						'name': p.id.name,
						'count': p.count
					});
				}
			}
			return newProduct;
		} else {
			for (let p of product) {
				newProduct.push({
					'name': p.id.name,
					'count': p.count
				});
			}
			return newProduct;
		}
	}

	sumProducts(objects) {
		let inArray = false;
		let count = [];
		for (let obj of objects) {
			for (let product of obj.products) {
				if (count.length <= 0) {
					count.push({
						name: product.name,
						count: product.count,
					})
				} else {
					for (let k in count) {
						if (count[k].name == product.name) {
							count[k].count += product.count;
							inArray = true;
							break;
						}
					}
					if (!inArray) {
						count.push({
							name: product.name,
							count: product.count,
						})
					}
				}

			}
		}
		return count;
	}

	orderRecord() {
		let obj = {
			ids: this.ordersId,
			status: 'received'
		};

		this._cateringService.changeStatus(obj).subscribe(
			data => {
				this._toastService.success(data.title, data.message);
				this.ordered = [];
				this.received = [];
				this.getCatering();
			},
			err => {
				this._toastService.success(err.title, err.error.message);
			}
		);
	}

	orderDelivered() {
		let obj = {
			ids: this.receivedId,
			status: 'delivered'
		};

		this._cateringService.changeStatus(obj).subscribe(
			data => {
				this._toastService.success(data.title, data.message);
				this.ordered = [];
				this.received = [];
				this.getCatering();
			},
			err => {
				this._toastService.success(err.title, err.error.message);
			}
		);

	}


}