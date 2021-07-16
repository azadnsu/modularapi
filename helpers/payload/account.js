function Account() {

    this.createAccount = function (personID, personName) {
        return {
            "accountName": "Demo account",
            "accountTypeCode": "CURRENCY",
            "currencyCode": "EUR",
            "customerGroupCode": "GROUP_A",
            "personId": personID,
            "personName": personName,
            "priceListTypeCode": "STANDARD",
            "residencyCountryCode": "FI",
            "source": {
                "sourceName": "TEST",
                "sourceRef": "$guid"
            }
        }
    }

    this.createTransaction = function(amount, currency){
        return {
            "details": "Card topup",
            "effectiveDate": "2020-06-08",
            "money": {
                "amount": amount,
                "currencyCode": currency,
            },
            "source": {
                "sourceName": "CARD_TOPUP",
                "sourceRef": "ID-" + Math.floor(Date.now() / 1000)
            },
            "transactionTypeCode": "CARD_TOPUP"

        }
    }

    this.createPayment = function(amount, currency){
        return {
            "counterparty": {
                "counterpartyTypeCode": "IBAN",
                "name": "Ben Ficher",
                "value": "EE459999000000010140"
            },
            "details": "Details",
            "directionCode": "OUT",
            "effectiveDate": "2020-06-08",
            "endToEndId": "NOTPROVIDED",
            "money": {
                "amount": amount,
                "currencyCode": currency,
            },
            "paymentTransferTypeCode": "INSTANTREGULAR",
            "paymentTypeCode": "ACC2SEPA",
            "source": {
                "sourceName": "PAYMENT",
                "sourceRef": "ID-" + Math.floor(Date.now() / 1000)
            }
        }
    }
}

module.exports = Account;