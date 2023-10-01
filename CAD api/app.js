const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
const app = express(); 

mongoose.connect('mongodb://127.0.0.1/CAD', {
  useNewUrlParser: true,
  
});


const doTriangulation = (req, res) => {
    console.log(req)
    
    res.status(200)
}


app.use(router.get('/', doTriangulation)); //post

app.listen(3000);