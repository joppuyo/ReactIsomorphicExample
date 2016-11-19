var express = require('express');
var app = express();
var fs = require('fs');

app.use('/public', express.static('public'));

app.get('/api/pages/:pageId', (request, response) => {
  fs.readFile('fixtures/' + request.params.pageId + '.json', 'utf-8', (error, json) => {
    if (error) {
      response.status(404).send('Not Found');
    }
    response.type('json');
    response.send(json);
  });
});

app.get('/\*', (req, res) => {
  var template = fs.readFileSync('index.nunjucks', 'utf-8');
  res.send(template);
});

app.listen(3000);
