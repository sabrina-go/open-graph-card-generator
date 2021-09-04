const errorManager = require('./error-manager');

function build(opts = {}) {
  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  const fastify = require('fastify')({
    ...opts,
  });

  fastify.decorate('container', opts.container);

  // https://github.com/fastify/fastify-cors
  fastify.register(require('fastify-cors'), {
    origin: '*',
  });

  fastify.after(() => {
    fastify.register((instance, opts, done) => {
      fastify.register(require('./routes/cards'));
      done();
    });
  });

  fastify.addHook('onError', async (request, reply, error) => {
    errorManager.handle(request, reply, error);
    done();
  });

  return fastify;
}

module.exports = build;
