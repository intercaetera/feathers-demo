module.exports = () => async (context) => {
  const { app, data } = context;
  const authors = app.service('authors');

  const foundAuthor = await authors.find({ query: { name: data.author } });
  if (!foundAuthor.length) {
    await authors.create({ name: data.author });
  }

  return context;
};

