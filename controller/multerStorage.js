var multer = require('multer');
var path = require('path');




var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});


var upload = multer({storage:storage});

exports.uploadImg = (image) => {
    return upload.single(image)
}
