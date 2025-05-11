const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === 'CastError') {
    res.status(400);
    return res.json({ message: 'Invalid ID format' });
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

export default errorHandler;
