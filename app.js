const express = require('express');
const morgan = require('morgan'); // Logger package
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const app = express();

// middleware & static files to load css
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));  // used for post request


// connect to mongodb
const dbURI = "mongodb+srv://kalp07:kalp07@cluster0.6oxhesu.mongodb.net/my-blog?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlPArser: true, useUnifiedTopology: true})
    .then((result)=>{
        console.log('connected to db');
        // listen to the requests only when the database is connected
        app.listen(3000);
    })
    .catch((err)=>console.log(err));


//Blog Routes (actual implementation)
app.get('/', (req,res)=>{
    res.redirect('/blogs');
});

app.get('/about', (req,res)=>{
    res.render('about', { title: 'about' });
});

app.use('/blogs', blogRoutes);


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'name of folder which contains html files');
// ejs Templates are processed through the EJS view engine on the server




// ------------- Middleware --------------//
app.use((req,res, next)=> {
    // this will get executed on every new requests
    console.log('new req made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    // code below this will not get executed because express doesnot automatically knows how to move on
    next();
    // next() function will tell express app to move forward to next route
});
// middleware using 3rd party middleware - Morgan
// app.use(morgan(function (tokens, req, res, next) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms'
//     ].join(' ')
//     next();
// }));


// middleware : for every req it will fire, if the req doesnot matches any above routes then this will get executed
// should be at the bottom
app.use((req,res)=>{
    res.status(404).render('404');
})