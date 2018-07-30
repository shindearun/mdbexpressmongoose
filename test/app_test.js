const assert = require('assert');
const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');



describe('The express app', ()=> {

    it('handles a GET request to /api', (done)=>{
        request(app)
        .get('/api')
        .end((err, response) =>{
                assert(response.body.hi === 'there');
                done();
        });

    });

});