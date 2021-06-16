const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('GET /posts', () => {

  it('It should returen { "error" : "Tags parameter is required" } with status 400 if the tags parameter is not in the query ', (done) => {
    chai.request(server)
      .get("/api/posts")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.to.deep.equal({
          "error": "Tags parameter is required"
        });
        done();
      });
  });
  it('It should returen { "error" : "sortBy parameter is invalid" } with status 400 if `sortBy` are invalid values ', (done) => {
    chai.request(server)
      .get("/api/posts?tags=history&sortBy=hi")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.to.deep.equal({
          "error": "sortBy parameter is invalid"
        });
        done();
      });
  });
  it('It should returen { "error" : "sortBy parameter is invalid" } with status 400 if `direction` are invalid values ', (done) => {
    chai.request(server)
      .get("/api/posts?tags=history&sortBy=id&direction=hi")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.to.deep.equal({
          "error": "sortBy parameter is invalid"
        });
        done();
      });
  });
  it('It should returen posts with status 200', (done) => {
    chai.request(server)
      .get("/api/posts?tags=history,tech")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.posts.should.be.an('array')
        done();
      });
  });
});