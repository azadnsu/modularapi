const frisby = require("frisby");

const HelperFN = function () {
    this.user_token = null;

    this.getUserToken = async function (username, password) {
        await frisby.setup({
            request: {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'frisby/2.1.1 (+https://github.com/vlucas/frisby)',
                    'x-tenant-code': 'SANDBOX',
                    'x-channel-code': 'SYSTEM'
                }
            }
        }, true)
            .post(`https://auth-api.sandbox.modularbank.xyz/api/v1/employees/authorise`, {
                body: {
                    "username": username,
                    "password": password,
                }
            })
            .expect('status', 200)
            .then((res) => {
                this.user_token = res.json.data.token
                console.log(this.user_token)
            })
    }

    this.setFrisbyHeaders = async function (token) {
        await frisby.globalSetup({
            request: {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'frisby/2.1.1 (+https://github.com/vlucas/frisby)',
                    'x-tenant-code': 'SANDBOX',
                    'x-channel-code': 'SYSTEM',
                    'x-auth-token': token,
                }
            }
        });
    }


}
module.exports = new HelperFN();

