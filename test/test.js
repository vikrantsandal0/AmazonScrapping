const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('/scrapurl', () => {
  it('it should scrap amazon url', (done) => {
    let body = {
      "url": "https://www.amazon.in/Apple-iPhone-11-64GB-Purple/dp/B07XVL4P83/ref=sr_1_1_sspa?dchild=1&keywords=iphone+11&qid=1602260507&s=electronics&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyM1JCMlNGSkMxSzJVJmVuY3J5cHRlZElkPUEwMTU1MjQxM1AyT0FDOEpXN09WVyZlbmNyeXB0ZWRBZElkPUEwNDgxODM0MTdXT0dCVU9JVE1NNCZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU="
    }
    chai.request('http://localhost:3009')
      .post('/scrapurl')
      .send(body)
      .end((err, res) => {
        console.log('res--',res.text);
        res.should.be.json;
        res.data.should.be.a('object');
        res.data.should.have.property('SUCCESS');
        done();
      });
  });

});
