const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('GET /ping', () => {

  it('It should returen { "success": true } with status 200', (done) => {
    chai.request(server)
      .get("/api/ping")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.to.deep.equal({ "success": true });
        done();
      })
  })
})