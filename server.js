const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// configure cors
app.use(cors());



// configure dot-env
dotenv.config({path : './config/config.env'});

// const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 5000;

// accept the form data
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));



// connect to mongodb using mongoose
mongoose.connect(process.env.MONGO_DB_CLOUD_URL, {
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then((response) => {
    console.log(`Connected Successfully to Mongo DB.............`);
}).catch((err) => {
    console.error(err);
    process.exit(1); // stop the process.
});

// get request
app.get('/' , (request , response) => {
    response.send(`<h2>Welcome to Big basket Express Server</h2>`);
});

// configure blog router
app.use('/api', require('./router/apiRouter'));

// configure login router
app.use('/users' , require('./router/userRouter'));


app.listen(port, () => {
    console.log(`Express Server is started at http://${port}`);
});


