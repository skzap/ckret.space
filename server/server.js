const port = process.argv[2]
const path = require('path');
const sha512 = require('hash.js/lib/hash/sha/512');
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
 
app.use(fileUpload())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'../client/public/index.html'));
})
 
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.')
 
  // The name of the input field (i.e. "encryptedFile") is used to retrieve the uploaded file
  var encryptedFile = req.files.encryptedFile
 
  // calculate the sha512 of the file
  var sha512 = sha512().update(encryptedFile).digest('hex')

  // Use the mv() method to place the file somewhere on your server
  encryptedFile.mv('/uploads/'+sha512, function(err) {
    if (err)
      return res.status(500).send(err)
 
    res.send(sha512)
  })
})

app.listen(port);