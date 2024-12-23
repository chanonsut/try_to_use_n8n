import Joi from "joi";
import {responseError} from "../../../help/response";

export const Validate =  async (payload : any, schema) => {
	try{
		const params = await payload;
		const {error} = await schema.validate(params);
		if (error) {

			console.log(error);
			console.log('log null');
			
			return 0;
		}else {
			console.log('check');
			
			payload = params;
			return params;
		}
	} catch(e){
		console.log(e);
		return await responseError("Wrong Parameter", 407);
	}
}
export const ValidateTestOnly = Joi.object({
	param: Joi.any(),
});

export const ValidateCheckUser = Joi.object({
	phoneFirebase: Joi.string().required(),
	username: Joi.string().required(),
});
