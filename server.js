const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes/utente')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', routes)


const listener = app.listen(process.env.PORT, () => {
    console.log("in ascolto in " + listener.address().port)
})

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);
