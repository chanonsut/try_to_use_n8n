const convertObjToJson =  async (data : any) => {
		return JSON.parse(JSON.stringify(data));
}

export { convertObjToJson };