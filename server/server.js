const hash = require('hash.js')

const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
 
app.use(fileUpload())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
})
 
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.')
 
  // The name of the input field (i.e. "encryptedFile") is used to retrieve the uploaded file
  var encryptedFile = req.files.encryptedFile
 
  // Use the mv() method to place the file somewhere on your server
  encryptedFile.mv('/uploads', function(err) {
    if (err)
      return res.status(500).send(err)
 
    res.send('File uploaded!')
  })
})