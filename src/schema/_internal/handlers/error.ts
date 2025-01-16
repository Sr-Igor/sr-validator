//@ts-nocheck

export const handleError = (err) => {
  try {
    const objectError = {
      params: {},
      query: {},
      body: {},
    };

    const issues = err.issues;

    issues.forEach((issue) => {
      const path = issue.path.join(".");
      const keys = issue?.keys?.join(".");
      const message = issue.message;

      if (path.includes("params") && objectError.params) {
        objectError.params[
          path === "params" ? keys : path.replace("params.", "")
        ] = message;
      } else if (path.includes("query") && objectError.query) {
        objectError.query[
          path === "query" ? keys : path.replace("query.", "")
        ] = message;
      } else if (path.includes("body") && objectError.body) {
        objectError.body[path === "body" ? keys : path.replace("body.", "")] =
          message;
      }
    });

    !Object.keys(objectError?.params || {}).length &&
      delete objectError?.params;
    !Object.keys(objectError?.query || {}).length && delete objectError?.query;
    !Object.keys(objectError?.body || {}).length && delete objectError?.body;

    return objectError;
  } catch (err) {
    console.error(`[VALIDATOR]: ${err}`);
  }
};
