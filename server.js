//Loading Modules
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookie = require('cookie-parser');
const connectdb = require('./server/database/connection');
const RedisStore = require('connect-redis')(session);
const Redis = require('ioredis');
  
const app = express();
process.env.config();
const PORT =  process.env.PORT || 3000;
//log requests
app.use(morgan('tiny'));
//set engine name
app.set("view engine", "ejs")
//json parser
app.use(express.json())

//use body parser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//use static files
app.use(express.static(path.resolve(__dirname, 'assest')));
app.use('/uploads', express.static(path.resolve(__dirname, 'assest/uploads')));
app.use('/js', express.static(path.resolve(__dirname, 'assest/js')));
app.use('/css', express.static(path.resolve(__dirname, 'assest/css')));
app.use('/css', express.static(path.resolve(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.resolve(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.resolve(__dirname, 'node_modules/jquery/dist')));



const redisClient = new Redis();
 //Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'mynewsession',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 60 * 24 // session max age in miliseconds
    }
}))

 //passing root variable
app.use('/',  require('./server/route'));

app.listen(PORT, () => console.log("listening on port available",PORT));

 