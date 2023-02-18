const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const PORT = process.env.PORT || 3030

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aurelj Imami'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Aurelj Imami'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Aurelj Imami'
    })

})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geoCode(req.query.address, (error, { longtitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longtitude, latitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []

    })

})

app.get('/help/*', (req, res) => {

    res.render('404', {
        errorMsg: 'Help article not found!',
        name: 'Aurelj Imami'
    })
})



app.get('*', (req, res) => {

    res.render('404', {
        title: '404 error',
        errorMsg: 'Page not found!',
        name: 'Aurelj Imami'
    })

})


app.listen(PORT, () => {

    console.log('Server is up on port '+ PORT)

})
