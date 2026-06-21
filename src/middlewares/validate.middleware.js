import z from "zod";

export const createError = (statusCode, message, details) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;

  throw error;
};

export const validate = (schemas) => (req, res, next) => {
  //   console.log("test");
  if (schemas.body) {
    const result = schemas.body.safeParse(req.body); //safeParse return {success,data(success = true), error}
    console.log("result", result);
    //SOLUTION#2
    if (!result.success) {
      createError(
        400,
        "Provided request body is invalid",
        z.flattenError(result.error),
      );
    }
    req.body = result.data; //เอา data มาจาก auth.schema.js
  }
  //SOLUTION#1
  //   if (schemas.params) {
  //     req.params = schemas.params.parse(req.params);
  //   }
  if (schemas.params) {
    const result = schemas.params.safeParse(req.params);
    if (!result.success) {
      createError(
        400,
        "Invalid request path parameters",
        z.flattenError(result.error),
      );
    }
    req.params = result.data;
  }
  next();
};
