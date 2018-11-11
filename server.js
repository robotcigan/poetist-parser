const express = require('express');
const app = express();
const osmosis = require('osmosis');
const translit = require('./services/translit.service');
const mongoose = require('mongoose');
const connection = require('./services/connections.service')
const Poem = require('./models/poem.model');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

const pageResult = [];

app.get('/', (req, res, next) => {
  // let some = 'Арсений';
  // console.log(translit(some));
  osmosis
    .get('http://stih.su/pushkin/')
    .find('.years-category ul:first')
    .follow('@href')
    .set({
      'name': 'h1',
      'content': ['.entry-content p']
    })
    .data(data => {
      console.log(data);
      data.date = 1813;
      data.url = translit(data.name);
      // data.poem = data.poem + '';
      data.content = data.content.join('</p><p>');
      data.content = '<p>' + data.content + '</p>';
      data.content = data.content.replace(/\n/g, '<br>');
      pageResult.push(data);
    })
    .done(() => {
      res.send(pageResult);
      Poem.create(pageResult);
    })
});


app.listen(3000, () => {
  console.log('Parser was started');
});