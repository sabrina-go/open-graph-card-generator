class HttpError extends Error {
  constructor(message) {
    super(message);
    this.title = 'Default Bad Request';
    this.status = 400;
  }
}

class BadRequestError extends HttpError {
  constructor(message, code = 400) {
    super(message);
    this.title = 'Bad Request';
    this.status = 400;
    this.code = code;
  }
}

class UnprocessableEntityError extends HttpError {
  constructor(message, code = 422) {
    super(message);
    this.title = 'Unprocessable entity';
    this.code = code;
    this.status = 422;
  }
}

module.exports = {
  BadRequestError,
  UnprocessableEntityError,
};
