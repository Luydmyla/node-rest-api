// import HttpError from "./HttpError.js";
<<<<<<< HEAD:middlewares/validateBody.js
const HttpError = require("../helpers/HttpError");
=======
const HttpError = require("./HttpError");
>>>>>>> 1a065525acc7606234cb0c6ca2946d652f51c941:helpers/validateBody.js
const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

// export default validateBody;
module.exports = validateBody;
