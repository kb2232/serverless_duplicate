const sendResponse = (statusCode, body) => {
    const statusMap = {
      200: "Success",
      400: "Bad Request",
      422: "Unprocessable Entity",
      500: "Internal Server Error",
    };
    const responseBody =
      body !== undefined ? body : { message: statusMap[statusCode] };
    const response = {
      statusCode,
      body: JSON.stringify(responseBody),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    return response;
  };
  
  module.exports = sendResponse