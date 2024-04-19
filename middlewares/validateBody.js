// import HttpError from "./HttpError.js";
const HttpError = require("../helpers/HttpError");
const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message="Помилка від Joi або іншої бібліотеки валідації"));
    }
    next();
  };

  return func;
};

// export default validateBody;
module.exports = validateBody;
