module.exports = () => {
  return async context => {
    const { app, data } = context;
    const authors = app.service('authors');

    const existingAuthor = authors.find({
      query: {
        name: data.author,
      }
    });

    if(!existingAuthor.length) {
      await authors.create({ name: data.author });
    }

    return context;
  };
};
