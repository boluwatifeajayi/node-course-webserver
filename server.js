const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');



app.use((req, res, next) =>{
    var now = new Date().toString();

    var log =`${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to server.log')
        }
    });

   

    next();
});
//  app.use((req, res, next) => {
//      res.render('maintenance.hbs');
//  });

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

// app.get('/', (req,res) =>{
//     //res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name: 'Bolu',
//         likes:[
//             'Gaming',
//             'Eating'
//         ]
//     })
// });

app.get('/', (req, res) =>{
    res.render('home.hbs',{
        name: 'Boluwatife',
        language: 'Javascript',
        cool: 'Node js is cool'
        
    });
});

app.get('/about', (req, res) =>{
    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'Dynamic About Page',
        
    });
});

//bad

app.get('/bad', (req, res) => {
    res.send({
        error: 'Page Not working',
    });
});

app.listen(9000, () =>{
    console.log('Server is Up and running');
});