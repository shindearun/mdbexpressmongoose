const mongoose = require('mongoose');

before((done) => {
    console.log('in test_helper before method start');
  mongoose.connect('mongodb://localhost:27017/muber_test', {
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30,
        useNewUrlParser: true
      });
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
   // console.log('in test_helper before method end');
});

beforeEach((done) => {
    console.log('in test_helper beforeEach method');
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
  
   after(() =>{
      console.log('in test_helper after method');
      mongoose.connection.close;
      process.exit(0);
  }); 