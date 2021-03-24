const { authenticate } = require('@feathersjs/authentication').hooks;
const { validate, disallow } = require('feathers-hooks-common');
const {
  hashPassword,
  protect,
} = require('@feathersjs/authentication-local').hooks;

const passwordValidator = values => {
  if (values.password !== values.confirmPassword) {
    return { password: 'Passwords don\'t match.' };
  }

  return null;
};

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validate(passwordValidator), hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [disallow('external')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password', 'confirmPassword'),
    ],
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

