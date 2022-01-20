const path = require('path')
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();
const port = process.env.PORT || 3000
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', { title: 'Weather', name: " ASISH K ANTONY" })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us', name: " ASISH K ANTONY" })
})

app.get('/help', (req, res) => {
    res.render('help',
        { title: 'Help', name: " ASISH K ANTONY", helpText: 'This is the help for the weather app' })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: 'Please enter an address' });
    }
    let address = req.query.address
    geocode(address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error: error });
        }


        forecast(lat, long, (error, { printString, icon } = {}) => {
            if (error) {
                return res.send({ error: error });
            }
            return res.send({
                forecast: printString, location, address, icon
            });
            return res.render('weather', { forecast, location, address })
        })
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Asish K Antony',
        errorMessage: "The Page Not Found"
    })
})

app.listen(port, () => {
    console.log(`Running on ${port}`)
})