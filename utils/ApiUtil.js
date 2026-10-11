class ApiUtil {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload
            })
        const loginRespJSON = await loginResponse.json();
        const loginToken = loginRespJSON.token;
        console.log('loginToken: ', loginToken)
        return loginToken;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken()
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        })
        const orderRespJSON = await orderResponse.json();
        const orderId = orderRespJSON.orders[0]
        response.orderId = orderId;
        console.log('orderId: ', orderId)
        return response;
    }
}
module.exports = { ApiUtil }