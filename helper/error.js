class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handlerError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    code: 'error',
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handlerError,
};
