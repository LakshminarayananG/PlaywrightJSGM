class APiUtils{

    constructor(apiContext){
        this.apiContext=apiContext;
    }

    async sendAPIRequestAndReturnResponse(url,options){
        const response = await this.apiContext.fetch(url, options);
        return {
          status: response.status(),
          body: await response.json(),
        };

}

async sendAPIRequestAndReturnResponseDelete(url,options){
    const response = await this.apiContext.fetch(url, options);
    return {
      status: response.status(),
      body: await response.statusText(),
    };

}

}

module.exports={APiUtils}