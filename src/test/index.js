let chai = require("chai");
let chaiHttp = require("chai-http")
const expect = require("chai").expect;
chai.use(chaiHttp);
const url = "http://localhost:3000";


//Testing SignUp
describe('HomeSick API Sign Up:', () => {
    it("It Should Failed", (done) => {
        chai
            .request(url)
            .post("/SignUp")
            .send({
                "email":"danilosandovalle@gmail.com",
                "password":"esto debería cifrarse en el frontend",
                "firstname": "Danilo",
                "lastname": "UnitTest"
            })
            .end((err, res) => {
                expect(res.body.message).to.equals("this email is already used");
                done();    
            });
    });
});

describe('HomeSick API Sign Up', () => {
    it("It Should Create a new User", (done) => {
        chai
            .request(url)
            .post("/SignUp")
            .send({
                "email":"danilosand@gmail.com",
                "password":"esto debería cifrarse en el frontend",
                "firstname": "Danilo",
                "lastname": "UnitTest"
            })
            .end((err, res) => {
                expect(res.body.message).to.equals("User has been created");
                done();    
            })
    })
});

//Testing Login

//validación de correo
describe('HomeSick API Login', () => {
    it("It Should Failed", (done) => {
        chai.request(url)
            .post("/Login")
            .send({
                "email":"danilosandoval@gmail.com",
                "password":"esto debería cifrarse en el frontend"
            })
            .end((err, res) => {
                expect(res.status = 500);
                done();    
            })
    })
});

//validación de contraseña
describe('HomeSick API Login', () => {
    it("It Should Failed", (done) => {
        chai.request(url)
            .post("/Login")
            .send({
                "email":"danilosandovalle@gmail.com",
                "password":"frontend"
            })
            .end((err, res) => {
                expect(res.body.message).to.equals("Invalid Email or Password");
                done();    
            })
    })
});

//validación de inicio de sesión
describe('HomeSick API Login', () => {
    it("It Should Login", (done) => {
        chai.request(url)
            .post("/Login")
            .send({
                "email":"danilosandovalle@gmail.com",
                "password":"Danilo7878"
            })
            .end((err, res) => {
                expect(res.status = 201);
                done();    
            })
    })
});