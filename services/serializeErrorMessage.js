const errMessage = (code, message, status) => {
  return { err: { code, message }, status };
};

module.exports = errMessage;
