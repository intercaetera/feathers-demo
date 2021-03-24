// Initializes the `books` service on path `/books`
const { Books } = require('./books.class');
const createModel = require('../../models/books.model');
const hooks = require('./books.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('/books', new Books(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('books');

  service.hooks(hooks);
};
