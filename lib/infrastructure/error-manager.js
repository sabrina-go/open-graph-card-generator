const HttpErrors = require('./http-errors');

function _mapToHttpError() {
  return new HttpErrors.HttpError();
}

function handle(request, reply, error) {
  const httpError = _mapToHttpError(error);
  reply.code(httpError.code).send({
    statusCode: httpError.status,
    code: httpError.code,
    error: httpError.title,
    message: httpError.message,
  });
}

module.exports = { handle };
