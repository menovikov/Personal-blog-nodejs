var express = require('express');
var postController = require('./controllers/postController');
var profileController = require('./controllers/profileController');
var app = require('express')();
var device = require('express-device');


app.set('view engine', 'ejs');
app.set('view options', { layout: true });
app.use(device.capture());
app.use('/static', express.static('./static'));

// fire controllers
postController(app);
profileController(app);

app.listen(3000);
