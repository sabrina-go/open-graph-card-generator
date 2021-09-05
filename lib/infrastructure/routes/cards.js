const generateOpenGraphCards = require('../../application/use_cases/generate-open-graph-cards');

module.exports = function (fastify, options, done) {
  fastify.route({
    method: 'GET',
    url: '/cards/:text',
    handler: async function (request, reply) {
      const buffer = await generateOpenGraphCards(request.params.text);
      reply.code(200).header('Content-Type', 'image/png').send(buffer);
    },
  });
  done();
};
