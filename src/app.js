const express = require("express");
const path = require("path");
const hbs = require("hbs");
const {forecast} = require("./utils/forecast");

const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);
app.use(express.static(publicDirectory));

const port = process.env.PORT || 3000;

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Arsalan Ansari'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: 'Arsalan Ansari'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        name: 'Arsalan Ansari'
    });
});

app.get('/weather', (request, response) => {
    const city = request['query']['city'];
    if (!city) {
        return response.send({
            error: 'Provide a valid city name'
        });
    }
    forecast(city, (error, {location, forecast} = {}) => {
        if (error)
            return response.send({error});
        response.send({
            location,
            forecast
        });
    });
});

app.get('/help/*', (request, response) => {
    response.render('error', {
        title: '404',
        name: 'Arsalan Ansari',
        error: 'Help article not found'
    });
});

app.get('*', (request, response) => {
    response.render('error', {
        title: '404',
        name: 'Arsalan Ansari',
        error: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});
