let express = require('express');
let router = express.Router();
let Catering = require('../../models/catering');
let Products = require('../../models/product');

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

module.exports = router;
