class APiUtils{

    constructor(apiContext){
        this.apiContext=apiContext;
    }

    async sendAPIRequestAndReturnResponse(url,options,requestType){
        const response = await this.apiContext.fetch(url, options);
        
        return requestType!='DELETE' ? {
          status: response.status(),
          body: await response.json(),
        } : {
          status: response.status(),
          body: await response.statusText(),
        };

}

}

module.exports={APiUtils}