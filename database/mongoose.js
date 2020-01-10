const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/db-facebook', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false

});