const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(err => ({ field: err.path[0], message: err.message }))
      });
    }
    return res.status(400).json({ message: 'Invalid request' });
  }
};

module.exports = validate;
