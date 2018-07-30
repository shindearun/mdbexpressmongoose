const Driver = require('../models/driver');

module.exports = {

    greeting(req, res,next) {
        res.send({ hi: 'there' });
        next();
    },

    index(req, res, next) {
        const lng = parseFloat(req.query.lng);
        const lat = parseFloat(req.query.lat);
        const maxDistance = 200000;

        const point = {
            type: "Point",
            coordinates: [lng, lat]
        };
            
        Driver.aggregate([{
            $geoNear: {
              near: point,
              maxDistance: maxDistance,
              key: "coords",
              distanceField: "distance",
              spherical: true,
              query: 'find( )'
            }
          }
        ]).limit(5)
          .exec((err, drivers) => {   // add error handling
            if (err) {
              next();
            } else {
              res.status(200).send(drivers);
            }
        });



        

       },

    create(req,res,next){
        const driverProps = req.body;

        Driver.create(driverProps)
        .then((driver)=>{
            res.send(driver);
        })
        .catch(next);

        // console.log(req.body);
        //res.send({ hi: 'there' });
    },

    edit(req,res,next){
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({_id: driverId },driverProps )
        .then(() => Driver.findById({_id: driverId }))
        .then(driver => res.send(driver))
        .catch(next);
    },
    delete(req,res,next){
        const driverId = req.params.id;

        Driver.findByIdAndRemove({_id: driverId } )
        .then(driver => res.status(204).send(driver))
        .catch(next);
    }


}