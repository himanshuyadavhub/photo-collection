const mongoose = require('mongoose');
const image = require('../model/image_schema');
const fs = require('fs');
const path = require('path');

const multer = require('multer');

// Step 7 - the GET request handler that provides the HTML UI

exports.images_get = (req,res) => {
    var userName = req.session.userName
    image.find({userName}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('imagePage', { items: items });
		}
	});

};

// Step 8 - the POST handler for processing the uploaded file

exports.image_post = (req,res) => {

    var obj = {
        userName: req.session.userName,
		imgName: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname ,'..', '/uploads/' , req.file.filename)),
			contentType: 'image/png'
		}
	}
	


	image.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			item.save();
			return res.redirect('/dashboard');
		}
	});
}



