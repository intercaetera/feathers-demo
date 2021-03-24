const app = require('../src/app');

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('authentication')).toBeTruthy();
  });

  describe('local strategy', () => {
    const userInfo = {
      login: 'dude',
      password: 'secret',
    };

    beforeAll(async () => {
      try {
        await app.service('users').create({
          ...userInfo,
          confirmPassword: userInfo.password,
        });
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo,
      });

      expect(accessToken).toBeTruthy();
      expect(user).toBeTruthy();
    });
  });
});

