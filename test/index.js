const expect = require('chai').expect;
const Group = require('../controllers/groupController');
const Repo = require('../repository/GroupRepository');

describe('request groups from users', function () {
    it('Create request to get all user groups', function (done) {
        let userId = { user: { data: {
            _id: '1499811716733810'
        }}};
        let group = new Repo();


/*
        group.getInvites('1499811716733810', result =>
            {
                done();
            });*/
    });
});