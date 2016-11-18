var express = require('express');
var app = express();
var fs = require('fs');

app.use('/public', express.static('public'));

app.get('/\*', function (req, res) {
    var template = fs.readFileSync('index.nunjucks', 'utf-8');
    res.send(template);
});

app.listen(3000);
