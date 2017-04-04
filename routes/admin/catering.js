let express = require('express');
let router = express.Router();
let Catering = require('../../models/catering');
let User = require('../../models/user');

router.get('/', function ( req, res ) {
	Catering.find()
	.populate('products.id', 'name price info')
	.populate('user', 'nickName firstName seat')
	.exec(function ( err, cat ) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		res.status(200).json({
			title: 'Erfolgreich',
			message: '',
			obj: cat

		});
	});
});

router.patch('/changeStatus', function ( req, res ) {
	Catering.update(
		{
			_id: {$in: req.body.ids}
		},
		{
			$set: {status: req.body.status}
		}, {multi: true}
	).exec(function ( err, result ) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(200).json({
			title: 'Erfolgreich',
			message: 'Die Bestellung wurde aufgenommen',
			obj: result

		});
	})
});

router.get('/delivered', function ( req, res ) {
	Catering.find()
		.populate('products.id', 'name price')
		.exec(function ( err, cat ) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}

			let obj = [];
			let inArray;

			for(let c of cat){
				for(let product of c.products){
					inArray = false;
					if(obj.length < 0){
						obj.push({
							name: product.id.name,
							count : product.count
						})
					}else{
						for(let key in obj){
							if(obj[key].name === product.id.name){
								obj[key].count +=  product.count;
								inArray = true;
								break;
							}
						}
						if(!inArray){
							obj.push({
								name: product.id.name,
								count : product.count
							})
						}
					}
				}
			}

			res.status(200).json({
				title: 'Erfolgreich',
				message: '',
				obj: obj

			});
		});
});

router.get('/calc', function ( req, res ) {
	User.find().exec(function ( err, users ) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}

		for(let user of users){
			Catering.find()
				.populate('products.id', 'name price info')
				.populate('user', 'nickName firstName seat')
				.exec(function ( err, catering ) {
					if (err) {
						return res.status(500).json({
							title: 'An error occurred',
							error: err
						});
					}
					let sum = 0;

					for(let cat of catering){
						if(cat.user._id + '' === user._id + ''){
							if(cat.food){
								sum += cat.foodPrice;
							}else{
								for(let prod of cat.products){
									sum += (prod.count * prod.id.price);
								}
							}
						}
					}
					User.findByIdAndUpdate(user._id, {$set:{'lan.sum': sum}}, function ( err, user ) {
						if (err) {
							return res.status(500).json({
								title: 'An error occurred',
								error: err
							});
						}
					});
				});
		}

		res.status(200).json({
			title: 'Erfolgreich'
		});
	})
});

module.exports = router;
