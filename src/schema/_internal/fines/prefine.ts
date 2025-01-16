//@ts-nocheck

export const preFire = (data, req) => {
  const formattedQuery = data.query;
  const formattedParams = data.params;
  const formattedBody = data.body;

  return {
    queryF: formattedQuery || [],
    paramsF: formattedParams || [],
    bodyF: formattedBody || [],
  };
};
