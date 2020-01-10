const mongoose = require('./database/mongoose');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const uploadRouter = require('./routes/uploadImage');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const publicdirectory= path.join(__dirname,'public');
app.use(express.static(publicdirectory));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);
app.use(postRouter);
app.use(uploadRouter);

app.listen(3000,() => {
    console.log('the server is on ')
});