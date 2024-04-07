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
module.exports = HttpError;
