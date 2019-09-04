var express = require('express');
var loudness = require('loudness')
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/home.html');
});

app.listen(3000, function () {
  console.log('Servidor iniciado.');
});

app.get('/mute', function(req,res){
    loudness.setMuted(true);
})

app.get('/desmute', function(req,res){
    loudness.setMuted(false);
})