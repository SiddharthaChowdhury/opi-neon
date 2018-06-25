const _name = 'Users'
const _schema = {
	name: String,
	email: String,
	phone: String,
	password: String,
	utype:{
		type:String,
		enum:['author', 'member']
	},
	createdAt:{
		type: Date,
		default: Date.now
	}
}
module.exports = require('mongoose').model(_name, _schema);