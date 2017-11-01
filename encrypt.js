var base64Img = require('base64-img');
var steem = require('steem');

var senderPublicKey = 'STM8PTfBzwLq38cvX3TJiYExSTMtHBvMAf1YSXkCu3G5Hh3xBkbqQ'
var senderPrivateKey = '5JHjZc4nt2Lp929pcXRs39RkjvMmNYY2a4phMU3by8uUs8uWoqC'
var receiverPublicKey = 'STM7s8o9v3Jyo722PLKtSvKffVBPUVNaGD4gVAGd1hk28dV3MHUhB'
var senderPrivatePostingKey = '5KgksXeg4rNvVoJjRJ5ve7RcxpPww1v8V8pKyDFV69j6cPrkgm5'
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
		'1uifhui1hfi1h3fio13oih',
		'Second Test',
		'We might use the body to mention people and put a link',
		jsonMetadata,
		function(err, result) {


			if (err) console.log('error')
			else console.log('done')

		}
	);
})