var base64Img = require('base64-img');
var steem = require('steem');

var receiverPrivateKey = '5KYDPgWUBh87PECr3HbYXTMmxWnTB1X1a2sJCmMVKL2fJBQaKkL'

var messagePost = {
	author: 'curator',
	permlink: 'jqefoiqefoijqoijef123'
}

steem.api.getContent(messagePost.author, messagePost.permlink, function(e,r) {
	console.log(e,r)
	var json = JSON.parse(r.json_metadata)
	if (json && json.secret && json.secret.b64) {
		var b64 = json.secret.b64
		console.log(b64)
		data = steem.memo.decode(receiverPrivateKey, b64)
		base64Img.img(
			data,
			'/home/adr/Images/',
			'decryptedAss',
			function(err, filepath) {
			console.log(filepath)
		});
	}
})
