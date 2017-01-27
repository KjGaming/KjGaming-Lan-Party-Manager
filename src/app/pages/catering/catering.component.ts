import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "angular2-notifications";
import {BaCateringService} from "../../theme/services/baCatering/baCatering.service";


@Component({
    selector: 'catering',
    styles: [require('./catering.scss')],
    template: require('./catering.component.html')
})


export class CateringComponent implements OnInit {
    public products;
    public ordered;
    public delivered;
    public received;
    public shoppingCart = [];
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };


    constructor(private _cateringService: BaCateringService, private _toastService: NotificationsService) {
    }

    ngOnInit() {
        this.getProducts();
        this.getCatering();
        if(localStorage.getItem('shoppingCard')){
            this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'));
        }
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
        localStorage.setItem('shoppingCard', JSON.stringify(this.shoppingCart));

    }

    sendShoppingCart(shoppingCard){
        this._cateringService.sendOrdered(shoppingCard).subscribe(
            // the first argument is a function which runs on success
            data => {
                this._toastService.success(data.title, data.message);
                this.ngOnInit();
                console.log(this.products);
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
