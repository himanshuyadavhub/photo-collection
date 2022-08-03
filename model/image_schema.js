const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    userName:String,
	imgName: String,
	desc: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});


module.exports = new mongoose.model('Image', imageSchema);
