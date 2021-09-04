require('dotenv').config();

function buildEnv() {
  const env = {
    name: 'development',

    server: {
      port: process.env.PORT || 3002,
      host: process.env.HOST || 'localhost',
      logger: true,
    },
  };

  if (process.env.NODE_ENV === 'test') {
    env.name = 'test';
    env.server.port = null;
    env.server.logger = false;
  }

  if (process.env.NODE_ENV === 'production') {
    env.name = 'production';
  }

  return env;
}

module.exports = buildEnv();
