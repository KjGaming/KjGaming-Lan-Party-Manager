var express = require('express');
var router = express.Router();
var Product = require('../../models/product');

router.post('/', function (req, res, next) {
    var updateObject = {
        $set:{
            name: req.body.name,
            price: req.body.price,
            number: req.body.number,
            info: req.body.info
        }
    };

    Product.findByIdAndUpdate(req.body.id, updateObject, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfolgreich',
            message: 'Das Produkt wurde erfoglreich geändert',
            obj: result
        });
    });
});

router.put('/', function (req, res, next) {
    var product = new Product({
        name: req.body.name,
        price: req.body.price,
        number: req.body.number,
        info: req.body.info
    });

    product.save(function (err, result) {
        if(err){
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        if(product == null){
            return res.status(500).json({
                title: 'Die erstellte News war leer',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfolgreich',
            message: 'Das Produkt wurde erfoglreich erstellt',
            obj: result
        });
    });
});

router.delete('/:id', function (req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({
            title: 'No Product selected',
            error: err
        });
    }
    Product.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Hier ist ein Fehler aufgetreten',
                error: err
            });
        }
        res.status(201).json({
            title: 'Erfolgreich',
            message: 'Produkt wurde gelöscht',
            obj: result
        });
    });
});

module.exports = router;
