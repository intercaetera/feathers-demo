const app = require('../../src/app');

describe('\'books\' service', () => {
  const books = app.service('books');
  const authors = app.service('authors');

  let author;
  beforeAll(async () => {
    author = await authors.create({ name: 'Oscar Wilde' });
  });

  it('registered the service', () => {
    expect(books).toBeTruthy();
  });

  it('should join author information when created', async () => {
    const book = await books.create({
      title: 'A Picture of Dorian Gray',
      author: 'Oscar Wilde',
    });

    const foundBook = await books._get(book._id);
    expect(foundBook.author).toEqual(author._id);
  });

  it('should join author information when retrieved', async () => {
    const book = (await books.find({
      title: 'A Picture of Dorian Gray',
    }))[0];

    expect(book.author).toBeTruthy();
    expect(book.author.name).toBeTruthy();
  });
});
