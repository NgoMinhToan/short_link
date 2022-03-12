const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
require('dotenv').config()
require('./mongo_db')

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

const bodyParser = require('body-parser')

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// for parsing application/json
app.use(bodyParser.json())

const linkModel = require('./model')

app.get('/', (req, res) => {
    res.send('Wellcome to shorten link api !')
})


app.get('/api/check', (req, res) => {
    const shortLink = req.query.shortLink
    linkModel.findOne({short: shortLink}).then(result => {
        if(result) {
            res.json({
                url: result.url,
                short: result.short,
                timeStamp: result.timeStamp,
                success: true
            })
        } else {
            res.json({ success: false})
        }
    }).catch(err => {
        res.json({ ...err, success: false, error: err.toString() })
    })
})

app.post('/api/save', (req, res) => {
    const { baseLink, shortLink } = req.body
    const timeStamp = Date.now()
    const link = new linkModel({
        url: baseLink,
        short: shortLink,
        timeStamp
    })
    link.save().then(() => {
        res.json({
            url: baseLink,
            short: shortLink,
            timeStamp,
            success: true
        })
    }).catch(err => {
        res.json({ ...err, success: false, error: err.toString()})
    })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})