const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

app.get((req, res, next)=>{
    res.render('memes.hbs');
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle:'Homepage',
        welcomeMessage: 'kk eae men'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About page',
    });
})

app.listen(port, ()=>{
    console.log('Server started');
});