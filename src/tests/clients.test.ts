import chaiModule, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import App from '../app';
import { Client } from '../database/models';
import {
  invalidCPFFormatInput,
  invalidCPFInput,
  mockCPFFormatErrorResponse,
  mockInvalidCPFErrorResponse,
  mockSuccessResponse,
  validClientInput,
} from './mocks/client.mocks';

const chai = chaiModule.use(chaiHttp);
const app = App.app;

describe('POST /clients', () => {
  afterEach(() => sinon.restore());

  it('Should create a new client when a valid CPF is provided', async () => {
    sinon.stub(Client, 'findOne').resolves(false as any);
    sinon.stub(Client, 'create').resolves(mockSuccessResponse as any);

    const res = await chai.request(app).post('/clients').send(validClientInput);

    expect(res).to.have.status(201);
    expect(res.body).to.deep.equal(mockSuccessResponse);
  });

  it('Should return an error if CPF does not have 11 numeric digits only', async () => {
    const res = await chai
      .request(app)
      .post('/clients')
      .send(invalidCPFFormatInput);

    expect(res).to.have.status(400);
    expect(res.body).to.deep.equal(mockCPFFormatErrorResponse);
  });

  it('Should return an error if CPF does not match the brazilian Federal Revenue system', async () => {
    const res = await chai.request(app).post('/clients').send(invalidCPFInput);

    expect(res).to.have.status(400);
    expect(res.body).to.deep.equal(mockInvalidCPFErrorResponse);
  });
});
