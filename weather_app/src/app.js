const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

const forecast = require('./utils/forecast')

const templatesDirectoryPath = path.join(__dirname, '../templates')
const viewsDirectoryPath = `${templatesDirectoryPath}/views`
const partialsDirectoryPath = `${templatesDirectoryPath}/partials`

const port = process.env.PORT || 3000;

app.use(express.static(templatesDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

hbs.registerPartials(partialsDirectoryPath)


app.get('', (req, res) => {
    res.render('index', {
        file: 'index',
        section: 'Home'
    })
})

app.get('/weather', (req, res) => {
    res.render('weather', {
        file: 'weather',
        section: 'Weather'
    })
})

app.get('/weather/:city', (req, res) => {
    if (!req.params.city) {
        return res.send({
            error: 'Location not found'
        })
    }

    forecast(req.params.city, (error, forecastData) => {
        if (error) {
            res.send({ error })
        }
        else{
            res.send({
                city: req.params.city,
                description: forecastData[0],
                temperature: forecastData[1],
                daytime: (forecastData[2] === 'yes') ? true : false,
                imageUrl: forecastData[3]
            })
        }
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        file: 'help',
        section: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        file: 'about',
        section: 'About Us',

        img1: 'default_profile.jpg',
        name1: 'Bridget Kaydence',
        pos1: 'CEO',

        img2: 'default_profile.jpg',
        name2: 'Alphonzo Narelle',
        pos2: 'COO',

        img3: 'default_profile.jpg',
        name3: 'Demetria Baxter',
        pos3: 'CTO',

        img4: 'default_profile.jpg',
        name4: 'Katrina Raynard',
        pos4: 'CMO'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        file: 'error',
        section: 'Error'
    })
})


app.listen(port, () => {
    console.log(`Using port ${port}`)
})