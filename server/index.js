const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const compression = require('compression');
const axios = require('axios')

app.use(compression());
app.use('/:id(\\d+)/', express.static(__dirname + '/../public/'));
app.use('/', express.static(__dirname + '/../react-client/dist/'));

app.use(bodyParser.json());

//loader.io verification
app.get('/loaderio-e2218df28967e523d961008d06570745', (req, res) => {
  res.send('loaderio-e2218df28967e523d961008d06570745')
})

//carousel
const carousel = {host: 'http://34.233.106.94'
  , endpoint : '/api/images/'} ;
//checkout
const checkout = {host: 'http://ec2-18-223-214-235.us-east-2.compute.amazonaws.com'
  , endpoint : '/api/checkout/'} ;
//reviews
const reviews = {host: 'http://ec2-18-223-135-118.us-east-2.compute.amazonaws.com'
  , endpoint : '/api/reviews/'} ;

var appGet = function(instance) {
  app.get(instance.endpoint + ':id', (req, res) => {
    let id = req.params.id;
    axios
      .get(instance.host + instance.endpoint + id)
      .then(result => {
        res.send(result.data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });
}

appGet(carousel);
appGet(checkout);
appGet(reviews);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('proxy listening on port 3000');
});
