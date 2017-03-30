let express = require('express');
let router = express.Router();
let Event = require('../../models/event');


router.post('/', function ( req, res, next ) {
	let diffDate = Math.abs(req.body.timeEnd - req.body.timeStart);
	let event = new Event({
		title: req.body.title,
		timeStart: req.body.timeStart,
		timeEnd: req.body.timeEnd,
		timeDuration: diffDate,
		mode: req.body.mode,
		content: req.body.content
	});

	event.save(function ( err, result ) {
		if (err) {
			return res.status(500).json({
				title: 'Fehler',
				error: {message: 'Hier ist ein Fehler aufgetreten'}
			});
		}
		if (event === null) {
			return res.status(500).json({
				title: 'Fehler',
				error: {message: 'Das erstellte Event war leer'}
			});
		}
		res.status(201).json({
			title: 'Erfolgreich',
			message: 'Das Event wurde erfoglreich erstellt',
			obj: result
		});
	});
});

router.patch('/', function ( req, res ) {
	let diffDate = Math.abs(req.body.timeEnd - req.body.timeStart);
	Event.findByIdAndUpdate({"_id": req.body.id},
		{
			$set: {
				'title': req.body.title,
				'timeStart': req.body.timeStart,
				'timeDuration': diffDate,
				'timeEnd': req.body.timeEnd,
				'mode': req.body.mode,
				'content': req.body.content

			}
		},
		function (err, result) {
			if (err) {
				return res.status(500).json({
					title: 'Fehler',
					error: {message: 'Beim speichern ist was schief gelaufen'}
				});
			}

			console.log(result);

			return res.status(201).json({
				title: 'Erflogreich',
				message: 'Event wurde geändert',
				obj: req.body.id
			});
		});
});

router.delete('/:id', function ( req, res, next ) {
	if (!req.params.id) {
		return res.status(400).json({
			title: 'Fehler',
			error: {message: 'Kein Event ausgewählt'}

		});
	}
	Event.findByIdAndRemove(req.params.id, function ( err, result ) {
		if (err) {
			return res.status(500).json({
				title: 'Fehler',
				message: 'Hier ist ein Fehler aufgetreten',
				error: err
			});
		}
		res.status(201).json({
			title: 'Erfolgreich',
			message: 'Das Event wurde erfolgreich gelöscht',
			obj: result
		});
	});
});

module.exports = router;
