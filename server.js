const express = require('express');

const app = express();

const request = require('request');

app.set('port', process.env.PORT || 3001);

// issues in windows
const env = process.env.NODE_ENV.trim();

// Express only serves static assets in production
if (env === 'production') {
  console.log(__dirname+'/client/build');
  app.use(express.static(__dirname+'/client/build'));
}

let propertiesCache = [];

app.get('/api/properties', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (env === 'production') {
    request
      .post('http://www.onerent.co/api/Property/availableProperties').pipe(res);
  } else {
    if (!propertiesCache.length) {
      request
        .post('http://www.onerent.co/api/Property/availableProperties', 
          (err, http, body) => {
            propertiesCache = body;
            return res.send(body); 
        });      
    } else {
      return res.send(propertiesCache);
    }    
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
