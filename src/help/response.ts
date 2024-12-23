var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const responseSuccess = async (data: any, statusCode: number) => {
  const res = {
    status: statusCode,
    result: data,
  };
  return new Response(JSON.stringify(res), {
    status: statusCode,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};

const responseSuccessResult = async (data: any, statusCode: number) => {
  // const res = {
  //   status: statusCode,
  //   result: data,
  // };
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};

const responseSuccessArray = async (data: any[], statusCode: number) => {
	const res = {
	  status: statusCode,
	  result: [data],
	};
	return new Response(JSON.stringify(res), {
	  status: statusCode,
	  headers: { "Content-Type": "application/json", ...corsHeaders },
	});
  };

const responseError = async (data: any, statusCode: number) => {
  const res = {
    status: statusCode,
    error: data,
  };
  return new Response(JSON.stringify(res), {
    status: statusCode,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};

export { responseSuccess, responseSuccessResult, responseSuccessArray, responseError };
