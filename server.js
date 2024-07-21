if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const App = express()

const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')


App.set('view engine', 'ejs')
App.set('views', __dirname + '/views')
App.set('layout', 'layouts/layout')
App.use(expressLayouts)
App.use(express.static('public'))

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

App.use('/', indexRouter)


App.listen(process.env.PORT || 3000)
