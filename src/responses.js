function responses(h, status, message, data, rescode) {
  if (!data) {
    const response = h.response({
      status,
      message,
    });
    response.code(rescode);
    return response;
  }

  if (!message) {
    const response = h.response({
      status,
      data,
    });
    response.code(rescode);
    return response;
  }

  const response = h.response({
    status,
    message,
    data,
  });
  response.code(rescode);
  return response;
}
module.exports = responses;
