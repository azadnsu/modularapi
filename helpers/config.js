const config = {};

config.auth_URL  = "https://auth-api.sandbox.modularbank.xyz"
config.person_API_URL = "https://person-api.sandbox.modularbank.xyz"
config.account_API_URL = "https://account-api.sandbox.modularbank.xyz"

global.TIMEOUT_VAL = 1500;

global.asyncPause = async (ms = TIMEOUT_VAL) => {
    await new Promise(r => setTimeout(r, ms));
}

module.exports = config;