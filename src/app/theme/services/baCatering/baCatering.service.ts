import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BaCateringService {

	constructor(private http: Http) {
	}


	getProducts(): Observable<any> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.get('/api/reg/catering/products', {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});

	}

	getCatering(status): Observable<any> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		const token = '?status=' + status;
		return this.http.get('/api/reg/catering/' + token, {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});

	}

	deleteOrdered(): Observable<any> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.delete('/api/reg/catering/ordered', {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
	}

	sendOrdered(product, reOrderData): Observable<any> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		const time = Date.now();
		let bodyObj;
		if(reOrderData){
			bodyObj = {
				ordered: time,
				reOrder: reOrderData.reOrder,
				nickName: reOrderData.nickName,
				pin: reOrderData.pin,
				products: []
			};
		}else{
			bodyObj = {
				ordered: time,
				products: []
			};
		}


		for (let key in product) {
			bodyObj.products.push({
				id: product[key].id,
				count: product[key].count
			});
		}
		console.log('==>>>');
		console.log(bodyObj);
		let body = JSON.stringify(bodyObj);
		console.log(body);

		return this.http.post('/api/reg/catering/ordered', body, {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});

	}

	creatProduct(data) {
		const body = JSON.stringify(data);
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.put('/api/admin/product', body, {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
	}

	changeProduct(data) {
		const body = JSON.stringify(data);
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.post('/api/admin/product', body, {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
	}

	deleteProduct(data) {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.delete('/api/admin/product/' + data.id, {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
	}

	getAdminCat() {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.get('/api/admin/catering/', {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
	}

	changeStatus(data): Observable<any> {
		const body = JSON.stringify(data);
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.patch('/api/admin/catering/changeStatus', body, {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
	}

	reorderFood(data): Observable<any> {
		const body = JSON.stringify(data);
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.post('/api/reg/catering/addFood', body, {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});
	}

	getDelivered(): Observable<any> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.get('/api/admin/catering/delivered', {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});

	}

	calcLan(): Observable<any> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('id_token')
		});
		return this.http.get('/api/admin/catering/calc', {headers: headers})
			.map((res: Response) => res.json())
			.catch((err: Response) => {
				return Observable.throw(err.json());
			});

	}


}

