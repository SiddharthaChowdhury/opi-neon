
const User = require('../Model/Users.js');

// const JWT = require('../JWT/jwt.js');
const TEST = require('input-validate');
const UTIL = require('util-func');

module.exports = {

	createAccount: function(req, res){
		var params = req.body;
		// Basic validations
		if(!params.email || !params.phone || !params.password1 || !params.password2){ //Check for missing parameters
			res.status(200);
			return res.json({msg: "Error! Required parameters are missing."});
		}
		if(!TEST.email(params.email)){ // Check for valid email
			res.status(400);
			return res.json({msg:"Error! Invalid email address."})
		}
		if(!TEST.custom(params.password1.length < 8)){ // Check password strength
			res.status(400);
			return res.json({msg:"Error! Password too weak."})
		}
		if(params.password1 !== params.password2){ // Check if password confirmed
			res.status(400);
			return res.json({msg:"Error! Passwords did not match."})
		}

		// Create payload
		var payload = {
			email: params.email,
			phone: params.phone.toString(),
			utype: 'author'
		}

		// hashing password & then adding to payload
		var bcrypt = require('bcrypt');
		const saltRounds = 8;
		var salt = bcrypt.genSaltSync(saltRounds);
		payload.password = bcrypt.hashSync(params.password1, salt);
		
		// Check if this user already exists
		User.count({$or:[{email: payload.email}, {phone:payload.phone}]}, function(err,count){
			if(err) return res.json(err)
			if(count == 0){
				// Creating new account
				var $usr = new User(payload);
				$usr.save(function(err, usr){
					if(err) return res.json(err);
					res.status(200);
					return res.json({msg:"Success! Account is created. Please log in."})
				});
			}else{
				res.status(400);
				return res.json({msg: "Alert! User already exists."})
			}
		})
			
	}
}
