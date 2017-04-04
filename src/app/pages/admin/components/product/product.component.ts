import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {BaCateringService} from "../../../../theme/services/baCatering/baCatering.service";

@Component({
    selector: 'admin-download',
    styles: [require('./product.scss')],
    template: require('./product.component.html'),
})
export class AdminProductComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    constructor(protected _cateringService: BaCateringService, private _toastService: NotificationsService) {
    }

    products;

    createName;
    createPrice;
    createNumber;
    createInfo;

    id: string;
    editName: string;
    editPrice: number;
    editNumber: number;
    editInfo: string;

    ngOnInit() {
        this.get();
    }

    onChange() {
        for(let product of this.products){
            if(product._id == this.id){
                this.editName = product.name;
                this.editPrice = product.price;
                this.editNumber = product.number;
                this.editInfo = product.info;
                break;
            }
        }
    }

    get() {
        this._cateringService.getProducts().subscribe(
            // the first argument is a function which runs on success
            data => {
                this._cateringService.getDelivered().subscribe(
                    data2 => {
                        this.products = data.obj;
                        for(let key in this.products){
                            for(let sold of data2.obj){
                                console.log(sold);
                                if(sold.name == this.products[key].name){

                                    this.products[key].sold = sold.count;
                                    break;
                                }
                            }
                        }
                        console.log(this.products);
                    }
                )

            },
            // the second argument is a function which runs on error
            err => console.error(err)
        );
    }

    create() {
        const data = {
            name: this.createName,
            price: this.createPrice,
            number: this.createNumber,
            info: this.createInfo
        };

        this._cateringService.creatProduct(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                this._toastService.success(data.title, data.message);
                this.ngOnInit();
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done create download')
        );
    }

    update() {
        const data = {
            id: this.id,
            name: this.editName,
            price: this.editPrice,
            number: this.editNumber,
            info: this.editInfo
        };

        this._cateringService.changeProduct(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                this._toastService.success(data.title, data.message);
                this.ngOnInit();
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done change download')
        );
    }

    del() {
        const data = {
            id: this.id,
        };
        this._cateringService.deleteProduct(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                this._toastService.success(data.title, data.message);
                this.ngOnInit();
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done delete download')
        );
    }

}
