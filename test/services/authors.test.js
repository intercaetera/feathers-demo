const { BadRequest } = require('@feathersjs/errors');

const app = require('../../src/app');

describe('\'authors\' service', () => {
  const authors = app.service('authors');

  it('registered the service', () => {
    expect(authors).toBeTruthy();
  });

  it('should validate that name is requred', () => {
    const run = () =>
      authors.create({
        name: null,
      });

    expect(run()).rejects.toThrow(BadRequest);
  });
});
