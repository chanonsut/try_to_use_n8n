import {Router, Request} from 'itty-router';
import {convertObjToJson} from "./help/convert";
import {responseError, responseSuccess, responseSuccessResult} from "./help/response";
import ags_restauth from "@agilesoft/type_ags_authrest2";
import { Validate, ValidateOnlyPhoneFirebase, ValidateTestOnly } from './modules/Product/validate/product.validate.post';
import { CheckUser, TestOnly, UserToken } from './modules/Product/type/product.type';
import cors from 'cors';
import { getDropdown } from './modules/Product/module/component/getDropdown.post';

const router = Router();

// Create a Registry which registers the metrics
declare let global: GlobalEnvironment;

interface GlobalEnvironment {
}

const ENV_DEPLOY = ENVIRONMENT;

console.log("ENV_DEPLOY");

console.log(ENV_DEPLOY);
if (ENV_DEPLOY == 'production') {
		console.log('production');
		// var Auth = new ags_restauth(R_TOKEN, R_USER);
}
const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

var corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
	"Access-Control-Max-Age": "86400",
  };

const deCode = async (req: any) => {
	var data;
	return new Promise((resolve, reject) => {
	  (async () => {
		try {
		//   if (ENV_DEPLOY === "production") {
		// 	// production-specific code
		// 	console.log("ENV_DEPLOY production");
		// 	console.log(req.headers);
			
		// 	data = await Auth.Middleware(req);
		//   } else {
		// 	// staging-specific code
		// 	console.log("staging");
		// 	data = await req.json();
		//   }
		data = await req.json();

		  //   console.log(data);
		  return resolve(data);
		} catch (error) {
	console.log(error);
		  return reject(error);
		}
	  })();
	});
  };
  
router.use(cors(options));

router.get('/Temp/hell', async (request : Request) => {
	const data = {
		"status": 200,
		"message": "hello",
	};
	return await responseSuccess(data, 200);

});

router.post('/Temp/hellpost', async (request : Request) => {
	const req = deCode(request);
	const datacheck = await Validate(req, ValidateTestOnly);
		
	const payload = await convertObjToJson(datacheck) as TestOnly;

	console.log(payload);
	
	const data = {
		"status": 200,
		"message": "hello",
		"data": payload
	};
	return await responseSuccess(data, 200);

});


addEventListener('fetch', event =>
		event.respondWith(router.handle(event.request))
)