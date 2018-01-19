let expect = require("chai").expect;
let chai = require('chai');
let should = chai.should();
const mongoose = require('mongoose');
const settings = require('../settings');
const GroupRepository = require('../repository/GroupRepository');
const UserRepository = require('../repository/UserRepository');

const userId = '1499811716733810';


describe("Mongoose connection", function() {
    before(function(done) {
        mongoose.connect(settings.mongoDb.getConnectionString(), function(error) {
            if (error) console.error('Error while connecting:\n%\n', error);
            //console.log(mongoose);
            done();
        });
    });

    describe("test connection", () => {
        it('should connect with mongoose', () => {
            expect(mongoose).to.be.an('object');
        });
        it('mongoose should contain group object' , () => {
            expect(mongoose.modelSchemas.Group).to.be.an("object");
        });
        it('mongoose should contain user object' , () => {
            expect(mongoose.modelSchemas.User).to.be.an("object");
        });
    });
});


