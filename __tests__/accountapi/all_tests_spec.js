const frisby = require("frisby");
const Joi = frisby.Joi;
const config = require("../../helpers/config");
const constants = require("../../helpers/constants");
const token = require("../../helpers/token");
const data = require("../../helpers/data")
const Person = require("../../helpers/payload/person");
const Account = require("../../helpers/payload/account");

describe("Modularbank sandbox API flow", () => {
    beforeAll(async () => {
        await token.getUserToken(constants.username, constants.password);
        await token.setFrisbyHeaders(token.user_token);
    });

    let idNumber = data.genRandomNumber(1000,4000) + "2223456A1";
    let vatNumber = "DE"+ data.genRandomNumber(100,1000) + "3456789";
    let taxNumber = data.genRandomNumber(1000,4000) + "445678901";
    let documentNumber = data.genRandomNumber(1000,4000) + "R45M1P72";
    let transactionAmount = data.genRandomNumber(300,400);
    let actualTransactionAmount = transactionAmount - 0.01; // Why 0.01 is getting deducted from the the transaction amount?
    let personName = "QA Tester";
    let paymentAmount = data.genRandomNumber(10,100);
    let personId = "";
    let accountId = "";
    let paymentId = "";

    it("should POST create a customer", async () => {
        await asyncPause();
        await frisby
            .post(`${config.person_API_URL}/api/v1/persons`,
                new Person().createCustomers(data.userEmail, idNumber,vatNumber,taxNumber,documentNumber))
            .expect('status', 200)
            .expect("json", "errors", null)
            .expect("json", "validationErrors", null)
            .expect("jsonTypes", {
                data: Joi.object({
                    personId: Joi.string(),
                    email: Joi.string().valid(data.userEmail),
                    idNumber: Joi.string().valid(idNumber),
                    vatNumber: Joi.string().valid(vatNumber),
                    taxNumber: Joi.string().valid(taxNumber),
                    number: Joi.string().valid(documentNumber)
                }).required()
            })
            .then((res) => {
                personId = res.json.data.personId
                console.log(personId)
            })
    })

    it("should POST Creating account", async () => {
        await frisby
            .post(`${config.account_API_URL}/api/v1/persons/${personId}/accounts`,
                new Account().createAccount(personId,personName))
            .expect('status', 200)
            .expect("json", "errors", null)
            .expect("json", "validationErrors", null)
            .expect("jsonTypes", {
                data: Joi.object({
                    accountId: Joi.string(),
                    personId: Joi.string().valid(personId),
                    personName: Joi.string().valid(personName),
                }).required()
            })
            .then((res) => {
                accountId = res.json.data.accountId
                console.log(accountId)
            })
    })

    it("should GET Get Balances initial stage", async () => {
        await frisby
            .get(`${config.account_API_URL}/api/v1/accounts/${accountId}/balances`)
            .expect('status', 200)
            .expect("json", "errors", null)
            .expect("json", "validationErrors", null)
            .then((res) => {
                let body = res.body;
                body = JSON.parse(body);
                expect(body.data[0].accountId).toBe(accountId)
                expect(body.data[0].currencyCode).toBe("EUR")
                expect(body.data[0].balanceAmount).toBe(0)
                expect(body.data[0].reservedAmount).toBe(0)
                expect(body.data[0].availableBalanceInDefaultCcy).toBe(0)
                expect(body.data[0].availableBalanceAmount).toBe(0)
            })
    })

    it("should POST Creating transactions on that account", async () => {
        await frisby
            .post(`${config.account_API_URL}/api/v3/accounts/${accountId}/transactions`,
                new Account().createTransaction(transactionAmount, "EUR"))
            .expect('status', 200)
            .expect("json", "errors", null)
            .expect("json", "validationErrors", null)
            //.inspectResponse()
            /*.expect("jsonTypes", {
                data: Joi.object({
                    accountId: Joi.string().valid(accountId),
                    initialBalanceAmount: Joi.number().valid(transactionAmount)
                }).required()
            }) */
            //Why two transactions for one entry? It should be one as far I understand.
    })

    it("should POST Create payment", async () => {
        await frisby
            .post(`${config.account_API_URL}/api/v1/accounts/${accountId}/payments/initialise`,
                new Account().createPayment(paymentAmount, "EUR"))
            .expect('status', 200)
            .expect("json", "errors", null)
            .expect("json", "validationErrors", null)
            .expect("jsonTypes", {
                data: Joi.object({
                    accountId : Joi.string().valid(accountId),
                    amount : Joi.number().valid(paymentAmount),
                    name: Joi.string().valid(personName),
                    currencyCode: Joi.string().valid("EUR"),
                }).required()
            })
            .then((res) => {
                paymentId = res.json.data.paymentId
                console.log(paymentId)
            })
    })

    it("should GET Get Balances before confirm payment", async () => {
        await frisby
            .get(`${config.account_API_URL}/api/v1/accounts/${accountId}/balances`)
            .expect('status', 200)
            .expect("json", "errors", null)
            .expect("json", "validationErrors", null)
            .then((res) => {
                let body = res.body;
                body = JSON.parse(body);
                expect(body.data[0].accountId).toBe(accountId)
                expect(body.data[0].currencyCode).toBe("EUR")
                expect(body.data[0].balanceAmount).toBe(actualTransactionAmount)
                expect(body.data[0].reservedAmount).toBe(0)
                expect(body.data[0].availableBalanceInDefaultCcy).toBe(actualTransactionAmount)
                expect(body.data[0].availableBalanceAmount).toBe(actualTransactionAmount)
            })
    })

    it("should POST Confirm payment", async () => {
        await frisby
            .post(`${config.account_API_URL}/api/v1/accounts/${accountId}/payments/${paymentId}/confirm`)
            .expect('status', 200)
            .expect("json", "errors", null)
            .expect("json", "validationErrors", null)
            .expect("jsonTypes", {
                data: Joi.object({
                    paymentId: Joi.string().valid(paymentId),
                    accountId : Joi.string().valid(accountId),
                    amount : Joi.number().valid(paymentAmount),
                    name: Joi.string().valid(personName),
                    currencyCode: Joi.string().valid("EUR"),
                }).required()
            })
    })

    it("should GET Get Balances after confirm payment", async () => {
        await frisby
            .get(`${config.account_API_URL}/api/v1/accounts/${accountId}/balances`)
            .expect('status', 200)
            .expect("json", "errors", null)
            .expect("json", "validationErrors", null)
            .then((res) => {
                let body = res.body;
                body = JSON.parse(body);
                expect(body.data[0].accountId).toBe(accountId)
                expect(body.data[0].currencyCode).toBe("EUR")
                expect(body.data[0].balanceAmount).toBe(actualTransactionAmount)
                expect(body.data[0].reservedAmount).toBe(paymentAmount)
                expect(body.data[0].availableBalanceInDefaultCcy).toBe(actualTransactionAmount-paymentAmount)
                expect(body.data[0].availableBalanceAmount).toBe(actualTransactionAmount-paymentAmount)
            })
    })

});