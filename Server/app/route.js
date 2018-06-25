module.exports = ($,C) =>{
/*
*	Please define the nodes below.
*/
	$.get('/', function(req, res){
		res.status('200');
		return res.json({hello: "World!"})
	})
	$.post('/rest/create-account', function(req, res, next){
		C.UserController.createAccount(req, res, next);
	})

/*
*	 Define routes above
*/
return $;}