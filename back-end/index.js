const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const router = require('./router/router')
const path = require('path')

app.use(cors({
    origin: "http://localhost:4200"
}))

app.use(express.static(path.join(__dirname,"images")));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Angular-test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });


app.listen('3000',()=>{
    console.log('Server is running')
})

app.use(express.json())
app.use(router)
