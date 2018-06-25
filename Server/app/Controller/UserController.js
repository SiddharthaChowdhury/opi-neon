
const User = require('../Model/Users.js');

const JWT = require('../JWT/jwt.js');
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
			
	},

	login: function(req, res){
		var params = req.body;
		if(!params.user || !params.password){
			res.status(400);
			return res.json({msg: "Error! Required fields are missing."})
		}

		if(!req.get('client_id')){ // Get from header
			res.status(400);
			return res.json({msg: "Error! Client identification failed."})
		}

		// Check if user exists
		User.findOne({$or:[{email: params.user}, {phone: params.user}]}, function(err, usr){
			if(err) return res.json(err);
			if(usr){
				// Compare password
				var bcrypt = require('bcrypt');
				if(bcrypt.compareSync(params.password, usr.password)){
					// Create payload for JWT token
					var payload = Object.assign({}, usr._doc, {password: undefined});
					return res.json({
						msg: "Success! Authentication successful",
						token: JWT.sign(payload,{
							issuer: "Opineon",
							subject: payload._id.toString(),
							audience: req.get('client_id')
						}),
						user: payload
					})
				}else{
					res.status(400);
					return res.json({msg: "Error! Authentication failed (403)"})
				}
			}else{
				res.status(404);
				return res.json({msg: "Error! Authentication failed. (Status:404)"})
			}
		})
	}
}
