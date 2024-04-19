<<<<<<< HEAD
const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

=======
// const messageList = {
//   400: "Bad Request",
//   401: "Unauthorized",
//   403: "Forbidden",
//   404: "Not Found",
//   409: "Conflict",
// };

// const HttpError = (status, message = messageList[status]) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

// // export default HttpError;
// module.exports = HttpError;
const HttpError = (status, message) => {
  // створюємо помилку по типу месджа
  const error = new Error(message);
  // присвоюємо йому статус
  error.status = status;
  // і повертаємо
  return error;
};
>>>>>>> 1a065525acc7606234cb0c6ca2946d652f51c941
module.exports = HttpError;
