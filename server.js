const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/image_app_dev');

const imagesRouter = require(__dirname + '/app/routes/images_routes');

app.use('/api', imagesRouter);
app.use(express.static(__dirname + '/build'));

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
