const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/images_app_test';
const server = require(__dirname + '/../../server');
const Image = require(__dirname + '/../../app/models/image');

describe('the image gallery api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to GET all our image links', (done) => {
    chai.request('localhost:3000')
      .get('/api/images')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create an image with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/images')
      .send({link: 'www.testlink.com'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.link).to.eql('www.testlink.com');
        expect(res.body).to.have.property('_id');
        done();
      });
  });
});
