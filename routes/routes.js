const DriversConstroller = require('../controllers/drivers_controllers');


module.exports = (app) =>{
    // Run this function whenever someone goes to
// localhost:3050/api
app.get('/api', DriversConstroller.greeting);

app.post('/api/drivers', DriversConstroller.create);

app.put('/api/drivers/:id', DriversConstroller.edit);

app.delete('/api/drivers/:id', DriversConstroller.delete);

app.get('/api/drivers', DriversConstroller.index);
}