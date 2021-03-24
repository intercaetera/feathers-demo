import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';

const app = feathers();
const restClient = rest('http://localhost:3030');

app.configure(restClient.fetch(window.fetch));
app.configure(auth({
  jwtStrategy: 'jwt',
  locationKey: 'access_token',
  storage: window.localStorage,
  storageKey: 'Authorization',
}));

export const reAuthenticate = app.reAuthenticate;
export const authenticate = app.authenticate;
export const logout = app.logout;
export const users = app.service('users');
export const authors = app.service('authors');
export const books = app.service('books');

window.feathers = app; // For debugging.

export default app;
