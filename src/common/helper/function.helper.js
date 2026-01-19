export function responseSuccess(data, message = "ok", statusCode = 200) {
  return {
    status: "success",
    statusCode: statusCode,
    message: message,
    data: data,
  };
}

export function responseError(message = "Internal server error", statusCode = 500, stack = null ) {
  return {
    status: "error",
    statusCode: statusCode,
    message: message,
    stack: stack,
  };
}