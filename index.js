const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(express.json())
require('./bot/bot')

async function dev(){
    try {
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser:true
        }).then(()=>{console.log('started mongo db ')})
        .catch((error )=>{console.log(error, 'this is error')})
        app.listen(process.env.PORT , ()=>{
                console.log('server is running')
        })
        
    } catch (error) {
        
    }
}

dev()