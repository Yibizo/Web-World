const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

//  TODO: const forecast

const templatesDirectoryPath = path.join(__dirname, '../templates')
const viewsDirectoryPath = `${templatesDirectoryPath}/views`
const partialsDirectoryPath = `${templatesDirectoryPath}/partials`

const port = 3000;

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

app.get('/help', (req, res) => {
    res.render('help', {
        file: 'help',
        section: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        file: 'about',
        section: 'About Us'
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