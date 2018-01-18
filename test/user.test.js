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
            done();
        });
    });

    describe("Can i fetch user", () => {
        let user;
        before(function (done) {
            let repo = new UserRepository();
            repo.getUserById(userId)
                .then(result => {
                    user = result;
                    done();
                })
                .catch(error => {
                    user = error;
                    done();
                })
        });
        it("is user fetched", () => {
            expect(user).to.be.an("object");
        });
        it("user got property _id", () => {
            expect(user).to.have.property("_id");
        });
        it("user got property photoUrl", () => {
            expect(user).to.have.property("photoUrl");
        });
        it("user got property name", () => {
            expect(user).to.have.property("name");
        });
        it("user got property email", () => {
            expect(user).to.have.property("email");
        });
        it("user got property lastLogin", () => {
            expect(user).to.have.property("lastLogin");
        });
        it("user got property friends", () => {
            expect(user).to.have.property("friends");
        });
        it("user property friends is an array", () => {
            expect(user.friends).to.be.an('array');
        });
    })
});


