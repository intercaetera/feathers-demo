const { BadRequest } = require('@feathersjs/errors');

const app = require('../../src/app');

const goodUser = {
  login: 'bob',
  email: 'bob@example.com',
  password: 'secret',
  confirmPassword: 'secret',
};

describe('\'users\' service', () => {
  const users = app.service('users');

  it('registered the service', () => {
    expect(users).toBeTruthy();
  });

  it('creates a good user', async () => {
    const createdUser = await users.create(goodUser);

    expect(createdUser).toBeTruthy();
  });

  it('errors out when passwords dont match', () => {
    const run = () =>
      users.create({
        ...goodUser,
        confirmPassword: 'hi',
      });

    expect(run()).rejects.toThrow(BadRequest);
  });
});

