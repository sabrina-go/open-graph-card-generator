const app = require('../lib/infrastructure/app');

describe('cards', function () {
  describe('GET /cards/:title', function () {
    beforeEach(() => {});

    it('should return octet-stream', async function () {
      const server = app();
      const requestOptions = {
        method: 'GET',
        path: '/cards/my title',
      };

      const response = await server.inject(requestOptions);

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/octet-stream');
    });
  });
});
