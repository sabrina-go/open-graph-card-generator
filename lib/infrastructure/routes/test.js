module.exports = function (fastify, options, done) {
  fastify.route({
    method: 'GET',
    url: '/test',
    config: {
      authentication: false,
    },
    schema: {
      body: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
        required: ['firstName', 'lastName', 'email', 'password'],
      },
    },
    handler: async function (request, reply) {
      reply.code(200).send({});
    },
  });
  done();
};
