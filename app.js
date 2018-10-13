const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const routes = require ('./routes/routes');
const app = express();
//Arun comments
mongoose.Promise = global.Promise;

    if(process.env !== 'test'){

        mongoose.connect('mongodb://localhost:27017/muber', {
            socketTimeoutMS: 0,
            keepAlive: true,
            reconnectTries: 30,
            useNewUrlParser: true
        });
        mongoose.connection
        .once('open', () => { 
                app.listen(3050, () => {
                    console.log('Running on port 3050');
                }); 
            })
        .on('error', (error) => {
        console.warn('Warning', error);
        });  

    }

    
app.use(bodyparser.json());


routes(app);

app.use((err,req,res, next) =>{
    //console.log(err);
    res.status(422);
    res.send({ error: err.message });
});

module.exports = app;