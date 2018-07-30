const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', (done) => {
    Driver.collection.countDocuments().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.collection.countDocuments().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('Put  to /api/drivers/id edit an existing driver', (done) => {
     const driver = new Driver({ email:'arunshinde@email.com', driving: false}); 

     driver.save().then(() =>{
        request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({driving: true})
        .end(() => {
          Driver.findOne({email:'arunshinde@email.com'})
          .then((driver) => {
              assert(driver.driving === true);
              done();
          });

        });
      });
  });

  it('Delete /api/drivers/id delete an existing driver', (done) => {
    const driver = new Driver({ email:'arunshinde@email.com', driving: false}); 

    driver.save().then(() =>{
       request(app)
       .delete(`/api/drivers/${driver._id}`)
       .end(() => {
         Driver.findById({_id:driver._id})
         .then((driver) => {
            assert(driver === null);
            done();
         });
       });
     });
 });

 it('Get to /api/drivers finds drivers in a location', done => {
  const seattleDriver = new Driver({
    email: 'seattle@test.com',
    geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
  });

  const miamiDriver = new Driver({
    email: 'miami@test.com',
    geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] }
  });

  Driver.collection.insert([seattleDriver, miamiDriver] )
    .then(() => {
      request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].email === 'miami@test.com');
          //console.log(response);
          done();
        });
    });
})
});