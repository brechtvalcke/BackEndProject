let expect = require("chai").expect;
let chai = require('chai');
let should = chai.should();
let request = require('request');
let util = require('util');
const mongoose = require('mongoose');
const settings = require('../settings');

//Require the dev-dependencies
let chaiHttp = require('chai-http');
let server = require('../app');
let db = require('db');
let sinon = require('sinon');
let groupModel = require('../model/GroupModel');

let GroupRepository = require('../repository/GroupRepository');
let groupRepository = new GroupRepository(db);

sinon.stub(db,'find').yields(null,new groupModel());

describe("request all groups", function() {
    before(function(done) {
        mongoose.connect(settings.mongoDb.getConnectionString(), function(error) {
            if (error) console.error('Error while connecting:\n%\n', error);

            done(error);
        });
    });

    it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/user/')
            .end((err, res) => {
                console.log('error');
                console.log(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
/*
    it('return object groups', (done) => {
        request.get({url: 'https://localhost:4200/api/group/'},(error,response,body) => {
            console.log("show eeror");
            console.log(error);
            done();
        })
    });
*/
});
