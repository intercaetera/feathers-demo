const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');

const preResolvers = {
  joins: {
    author: () => async (book, { app }) =>
      (book.author = (
        await app.service('authors').find({
          query: { name: book.author },
        })
      )[0]._id),
  },
};

const postResolvers = {
  joins: {
    author: () => async (book, { app }) =>
      (book.author = (
        await app.service('authors').find({
          query: {_id: book.author},
        })
      )[0]),
  },
};

const query = {
  author: true,
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), fastJoin(preResolvers, query)],
    update: [authenticate('jwt'), fastJoin(preResolvers, query)],
    patch: [authenticate('jwt'), fastJoin(preResolvers, query)],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [fastJoin(postResolvers, query)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

