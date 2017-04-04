let express = require('express');
let router = express.Router();
let Catering = require('../../models/catering');
let Products = require('../../models/product');
let jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
    let decoded = jwt.decode(req.get('Authorization'));
    let status = req.query.status;
    let productArray = [];
    Catering.find({user: decoded.user._id, status: status})
        .populate('products.id', 'name price info')
        .exec(function (err, catering) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            for (let k = 0; catering.length > k; k++) {
            	if(catering[k].food !== undefined){
					productArray.push({
						name: catering[k].food,
						price: catering[k].foodPrice,
						count: 1
					});
				}else {
					for (let i = 0; catering[k].products.length > i; i++) {
						let isInArray = false;
						let product = catering[k].products[i].id;

						if (!productArray) {
							productArray.push({
								id: product._id,
								name: product.name,
								price: product.price,
								count: catering[k].products[i].count
							});
						}
						for (let j = 0; productArray.length > j; j++) {
							if (productArray[j].id == product._id) {
								isInArray = true;
								productArray[j].count = productArray[j].count + catering[k].products[i].count;
								break;
							}
						}

						if (!isInArray) {
							productArray.push({
								id: product._id,
								name: product.name,
								price: product.price,
								count: catering[k].products[i].count
							});
						}
					}
				}
            }


            res.status(200).json({
                message: 'Success',
                obj: productArray

            });

        });
});

router.get('/products', function (req, res, next) {
    Products.find().exec(function (err, products) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: products
        });
    });
});

router.post('/ordered', function (req, res, next) {
    let decoded = jwt.decode(req.get('Authorization'));
    let userId = decoded.user._id;
    let catering = new Catering({
        ordered: req.body.ordered,
        status: "ordered",
        user: userId
    });
    for (let i = 0; req.body.products.length > i; i++) {
        catering.products.push({
            id: req.body.products[i].id,
            count: req.body.products[i].count
        });
    }


    if (req.body.delivered) {
        catering.delivered = req.body.delivered;
    }

	console.log(catering);

    catering.save(function (err, result) {
        if (err) {
            if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'Hier ist ein Fehler aufgetreten',
                    error: err
                });
            }
        }
        res.status(201).json({
			title: 'Erfolgreich!',
            message: 'Deine Bestellung wurde aufgenommen',
            obj: result
        });
    });

});

router.post('/addFood', function (req, res, next) {
	let decoded = jwt.decode(req.get('Authorization'));
	let userId = decoded.user._id;
	let catering = new Catering({
		ordered: req.body.ordered,
		delivered: req.body.delivered,
		status: "delivered",
		user: userId,
		food: req.body.foodName,
		foodPrice : req.body.price
	});

	console.log(catering);
	catering.save(function (err, result) {
		if (err) {
			if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
				return res.status(500).json({
					title: 'Hier ist ein Fehler aufgetreten',
					error: err
				});
			}
			return res.status(500).json({
				title: 'Hier ist ein Fehler aufgetreten',
				error: err
			});
		}

		res.status(201).json({
			title: 'Erfoglreich',
			message: 'Du hast dein Essen erfolgreich nachbestellt!',
			obj: result
		});
	});

});

router.delete('/ordered', function (req, res, next) {
    let decoded = jwt.decode(req.get('Authorization'));
    let userId = decoded.user._id;
    console.log(userId);
    Catering.find({user: userId, status: 'ordered'})
        .remove()
        .exec(function (err, result) {
            if (err) {
                if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                    return res.status(500).json({
                        title: 'Hier ist ein Fehler aufgetreten',
                        error: err
                    });
                }
            }
            res.status(201).json({
				title: 'Erfoglreich',
                message: 'Deine Bestellung wurde stoniert',
                obj: result
            });
        });

});

// For the admin Routes, only to test the reg catering
router.post('/products', function (req, res, next) {
    let product = new Products({
        name: req.body.name,
        price: req.body.price

    });

    if (req.body.info) {
        product.info = req.body.info;
    }

    product.save(function (err, result) {
        if (err) {
            if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'Hier ist ein Fehler aufgetreten',
                    error: err
                });
            }
        }
        res.status(201).json({
			title: 'Erfoglreich',
            message: 'Produkt wurde hinzugefügt',
            obj: result
        });
    });

});

module.exports = router;
