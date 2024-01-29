const express = require('express')
const app = express()
const path = require('path')

const sequelize = require('./app/sequelize')
const useSimpleDash = require('../../index')

app.set('view engine', 'ejs')
app.set('views', './test/project1/app/views')

// app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

// Statically served files
app.use(express.static(path.join(__dirname, './public')))

const adminHomePageUrl = '/admin'

app.use(
  useSimpleDash(sequelize, {
    baseUrl: adminHomePageUrl,
  }),
)

app.get('/', (req, res) => {
  res.render('homePage', { adminHomePageUrl })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Project 1 : Listening on http://localhost:${port}`)
})
