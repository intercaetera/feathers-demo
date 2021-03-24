const users = require('./users/users.service.js');
const books = require('./books/books.service.js');
const authors = require('./authors/authors.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(books);
  app.configure(authors);
};
