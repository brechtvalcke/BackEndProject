let expect = require("chai").expect;
let chai = require('chai');
let should = chai.should();
const mongoose = require('mongoose');
const settings = require('../settings');
const GroupRepository = require('../repository/GroupRepository');
const UserRepository = require('../repository/UserRepository');

const userId = '1499811716733810';
const groupId = '5a52719c603c75000412bf3b';
const activityId = '5a5271b0603c75000412bf3d';
const timeId = '5a5271b7603c75000412bf3e';

describe("Group", function() {
    before(function(done) {
        mongoose.connect(settings.mongoDb.getConnectionString(), function(error) {
            if (error) console.error('Error while connecting:\n%\n', error);
            done();
        });
    });
    describe("Can i fetch groups", () => {
        let groups;
        before(function (done) {
            let repo = new GroupRepository();
            repo.getGroups(userId)
                .then(result => {
                    groups = result;
                    done();
                })
                .catch(error => {
                    groups = error;
                    done();
                })
        });
        it("are groups fetched", () => {
            expect(groups).to.be.an("array");
        });
        it("group 0 got property _id", () => {
            expect(groups[0]).to.haveOwnProperty("_id");
        });
        it("group 0 got property name", () => {
            expect(groups[0]).to.haveOwnProperty("name");
        });
        it("group 0 got property createBy", () => {
            expect(groups[0]).to.haveOwnProperty("createBy");
        });
        it("group 0 got property createdOn", () => {
            expect(groups[0]).to.haveOwnProperty("createdOn");
        });
        it("group 0 got property users", () => {
            expect(groups[0]).to.haveOwnProperty("users");
        })
    });

    describe('Update group name', () => {
        let group;
        let newName = "don't remove group";
        before(function (done) {
            let repo = new GroupRepository();
            repo.updateGroupName({'name': newName}, groupId)
                .then(result => {
                    group = result;
                    done();
                })
                .catch(error => {
                    group = error;
                    done();
                });
        });

        it("update group name was a success", () => {
            expect(group).to.be.an('object');
        });
        it("group name was changed", () => {
            expect(group.name).to.be.equal(newName);
        });
    });

    describe('vote for activity', () => {
        let group;
        before(function (done) {
            let repo = new GroupRepository();
            repo.voteForActivityInGroup(groupId,activityId,userId)
                .then(result => {
                    group = result;
                    done();
                })
                .catch(error => {
                    group = error;
                    done();
                });
        });
        it('vote was a success', () => {
            expect(group.ok).to.be.equal(1);
        });

        describe('test activity vote toggle', () => {
            let group;
            before(function (done) {
                let repo = new GroupRepository();
                repo.getGroup(groupId)
                    .then(result => {
                        group = result;
                        done();
                    })
                    .catch(error => {
                        group = error;
                        done();
                    });
            });

            it('fetch group is success', () => {
                expect(group).to.be.an('array');
                expect(group[0]).to.be.an('object');
            });
            it('activity from group is an array', () => {
                expect(group[0].activity).to.be.an('array');
            });
            it('activity from group is an array', () => {
                expect(group[0].activity).to.be.an('array');
            });
            it('votes from activity 0 is an array', () => {
                expect(group[0].activity[0].votes).to.be.an('array');
            });

            it('activity got voted by user (has to fail 1 out of 2 times to be an success)', () => {
                expect(group[0].activity[0].votes).to.include(userId);
            });

        });
    })

    describe('vote for timeslot', () => {
        let group;
        before(function (done) {
            let repo = new GroupRepository();
            repo.voteForTimeSlotInGroup(groupId,timeId,userId)
                .then(result => {
                    group = result;
                    done();
                })
                .catch(error => {
                    group = error;
                    done();
                });
        });
        it('vote was a success', () => {
            expect(group.ok).to.be.equal(1);
        });

        describe('test timeslot vote toggle', () => {
            let group;
            before(function (done) {
                let repo = new GroupRepository();
                repo.getGroup(groupId)
                    .then(result => {
                        group = result;
                        done();
                    })
                    .catch(error => {
                        group = error;
                        done();
                    });
            });

            it('fetch group is success', () => {
                expect(group).to.be.an('array');
                expect(group[0]).to.be.an('object');
            });
            it('timeslot from group is an array', () => {
                expect(group[0].timeSlot).to.be.an('array');
            });
            it('timeSlot from group is an array', () => {
                expect(group[0].timeSlot).to.be.an('array');
            });
            it('votes from timeSlot 0 is an array', () => {
                expect(group[0].timeSlot[0].votes).to.be.an('array');
            });

            it('timeSlot got voted by user (has to fail 1 out of 2 times to be an success)', () => {
                expect(group[0].timeSlot[0].votes).to.include(userId);
            });

        });
    })
});


