var models=require("../../models");
var assert=require("chai").assert;
var ValidationException = require("../../exception").ValidationException;
var ResourceNotFoundException = require("../../exception").ResourceNotFoundException;
var userService=require("./userService");

describe("test userService", function() {
    this.timeout(15000);

    before(function(done) {
        models.sequelize.sync({force:true}).then(function() {
            seedUser().then(function() {
                done();
            }, function(error) {
                done();
            });

        }, function(error) {
            done();
        })

    });

    it("test getUserByEmail --- found", function(done) {
        userService.getUserByEmail("wenhao.lin@gmail.com").then(function(user) {
            assert.equal("wenhao.lin@gmail.com", user.email);
            done();
        }, function(error) {
            done();
        })

    });


    it("test getUserByEmail --- not exist", function(done) {
        userService.getUserByEmail("notexist@gmail.com").then(function(user) {
            assert.equal(null, user);
            done();
        }, function(error) {
            done();
        })

    });

    it("test getUserByEmail --- blank email", function(done) {
        userService.getUserByEmail("    ").then(function(user) {
            assert.equal(null, user);
            done();
        }, function(error) {
            done();
        })

    });


    it("test getUserById --- found", function(done) {
        userService.getUserById(1).then(function(user) {
            assert.equal("wenhao.lin@gmail.com", user.email);
            done();
        }, function(error) {
            done();
        })
    });


    it("test create user --- success", function(done) {
       userService.createUser({
           email:"sally.lin@gmail.com",
           password:"P@ssword1",
           firstName:"wenhao",
           lastName: "lin",
           phone:"12345678"
       }).then(function(user) {
           assert.equal("sally.lin@gmail.com", user.email);
           done();
       }, function(error) {
           done();
       })

    });

    it("test create user --- email is blank", function(done) {
        userService.createUser({
            email:"  ",
            password:"P@ssword1",
            firstName:"wenhao",
            lastName: "lin",
            phone:"12345678"
        }).then(function() {
            done();

        }, function(error) {
            assert.isTrue(error instanceof ValidationException);
            assert.equal("email can not be blank", error.message);
            assert.equal(400, error.code);
            done();
        })
    });

    it("test create user --- password is blank", function(done) {
        userService.createUser({
            email:"xyz@gmail.com",
            password:" ",
            firstName:"wenhao",
            lastName: "lin",
            phone:"12345678"
        }).then(function() {
            done();

        }, function(error) {
            assert.isTrue(error instanceof ValidationException);
            assert.equal("password can not be blank", error.message);
            assert.equal(400, error.code);
            done();
        })

    });

    it("test create user --- firstName is blank", function(done) {
        userService.createUser({
            email:"sally.lin@gmail.com",
            password:"P@ssword1",
            firstName:"  ",
            lastName: "lin",
            phone:"12345678"
        }).then(function() {
            done();
        }, function(error) {
            assert.isTrue(error instanceof ValidationException);
            assert.equal("firstName can not be blank", error.message);
            assert.equal(400, error.code);
            done();
        })
    });

    it("test create user --- duplicate email", function(done) {
        userService.createUser({
            email:"wenhao.lin@gmail.com",
            password:"P@ssword1",
            firstName:"wenhao",
            lastName: "lin",
            phone:"12345678"
        }).then(function() {
            done();
        }, function(error) {
            assert.isTrue(error instanceof ValidationException);
            assert.equal("email already exists in our system", error.message);
            assert.equal(400, error.code);
            done();
        })

    });


    it("test update user --- empty user object", function(done) {
        userService.updateUser({})
            .then(function () {
                done();
            }, function(error) {
                assert.isTrue(error instanceof ResourceNotFoundException);
                assert.equal(404, error.code);
                done();
            })
    });


    it("test update user --- email is blank", function(done) {
        userService.updateUser({
            id:1,
            email:"  ",
            password:"P@ssword1",
            firstName:"wenhao",
            lastName: "lin",
            phone:"12345678"
        }).then(function() {
            done();

        }, function(error) {
            assert.isTrue(error instanceof ValidationException);
            assert.equal("email can not be blank", error.message);
            assert.equal(400, error.code);
            done();
        })
    });

    it("test update user --- password is blank", function(done) {
        userService.updateUser({
            id:1,
            email:"xyz@gmail.com",
            password:" ",
            firstName:"wenhao",
            lastName: "lin",
            phone:"12345678"
        }).then(function() {
            done();

        }, function(error) {
            assert.isTrue(error instanceof ValidationException);
            assert.equal("password can not be blank", error.message);
            assert.equal(400, error.code);
            done();
        })

    });

    it("test update user --- firstName is blank", function(done) {
        userService.updateUser({
            id:1,
            email:"sally.lin@gmail.com",
            password:"P@ssword1",
            firstName:"  ",
            lastName: "lin",
            phone:"12345678"
        }).then(function() {
            done();
        }, function(error) {
            assert.isTrue(error instanceof ValidationException);
            assert.equal("firstName can not be blank", error.message);
            assert.equal(400, error.code);
            done();
        })
    });

    it("test update user --- duplicate email", function(done) {
        userService.updateUser({
            id:2,
            email:"wenhao.lin@gmail.com",
            password:"P@ssword1",
            firstName:"sally",
            lastName: "lin",
            phone:"12345678"
        }).then(function() {
            done();
        }, function(error) {
            assert.isTrue(error instanceof ValidationException);
            assert.equal("email already exists in our system", error.message);
            assert.equal(400, error.code);
            done();
        })
    });

    it("test update user --- success", function(done) {
        userService.updateUser({
            id:2,
            email:"abc2.lin@gmail.com",
            password:"P@ssword1",
            firstName:"sally",
            lastName: "lin",
            phone:"3456"
        }).then(function(user) {
            assert.equal("3456", user.phone);
            assert.equal("abc2.lin@gmail.com", user.email);

            done();
        }, function(error) {
            done();
        })
    });

    function seedUser() {
        var User=models.User;
        return User.bulkCreate([{
            email:"wenhao.lin@gmail.com",
            password:"P@ssword1",
            firstName:"wenhao",
            lastName: "lin",
            phone:"12345678"
        }, {
            email:"abc.lin@gmail.com",
            password:"P@ssword1",
            firstName:"wenhao",
            lastName: "lin",
            phone:"12345678"
        }])
    }

});