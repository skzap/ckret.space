var base64Img = require('base64-img');
var steem = require('steem');

var senderPublicKey = 'STM5hL457wPDtMY8ZySphuD9omZDnZHihMj1BDTkE1o6mDCmQSuMJ'
var senderPrivateKey = '5JRA45dxxPDJntrR7DJYU5yRpRyqTCSw35Mvzag3g5RLPmQvVfz'
var receiverPublicKey = 'STM7s8o9v3Jyo722PLKtSvKffVBPUVNaGD4gVAGd1hk28dV3MHUhB'
var senderPrivatePostingKey = '5JCKHs9S8FSE98ZQ3grmtQCyS7w87gPkEm5kfpvqsSNe6mcH8M4'
var sender = 'curator'

var rootPost = {
	author: 'curator',
	permlink: 'this-post-will-include-encrypted-pictures'
}

base64Img.base64('/home/adr/Images/ass.jpg', function(err, data) {
	
	console.log(err, data.length)
	var encryptedData = steem.memo.encode(senderPrivateKey, receiverPublicKey, data)

	var jsonMetadata = {
		app: 'noname/0.1',
		secret: {
			b64: encryptedData
		}
	}
	steem.broadcast.comment(
		senderPrivatePostingKey,
		rootPost.author,
		rootPost.permlink,
		sender,
		'jqefoiqefoijqoijef123',
		'Second Test',
		'We might use the body to mention people and put a link',
		jsonMetadata,
		function(err, result) {




			console.log(err, result)
		}
	);
})