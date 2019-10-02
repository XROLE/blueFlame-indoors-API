export default (err, req, res, next) => {
  res.status(err.status).send({
    error: err.message
  });
};
