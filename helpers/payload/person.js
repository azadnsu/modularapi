function Person() {

    this.createCustomers = function (email, id_number, vat_number, tax_number, document_number) {
        return {
            "givenName": "Tester",
            "surname": "QAT",
            "middleName": "Alexander",
            "birthDate": "1980-12-01",
            "personTypeCode": "P",
            "sex": "M",
            "email": email,
            "phoneNumber": "0901820",
            "phoneCountryCode": "+372",
            "educationCode": "HIGHER_EDUCATION",
            "activityCode": "SPECIALIST",
            "housingTypeCode": "PRIVATE",
            "buildingTypeCode": "APARTMENT",
            "businessAreaCode": "LEGAL",
            "maritalStatusCode": "MARRIED",
            "dependantPersons": 1,
            "employmentTimeCode": "MORE_4_YEAR",
            "customerType": "string",
            "nationality": "DE",
            "placeOfBirth": "Berlin",
            "countryOfBirth": "DE",
            "language": "DE",
            "taxResidencyCountry": "DE",
            "fixedEmploymentLength": 6,
            "identificationNumber": {
                "idNumber": id_number,
                "idCountryCode": "DE",
                "vatNumber": vat_number,
                "taxNumber": tax_number
            },
            "addresses": [
                {
                    "addressTypeCode": "R",
                    "street1": "Fennstrasse 4",
                    "street2": "string",
                    "cityCounty": "Berlin",
                    "stateRegion": "Berlin",
                    "zip": "13347",
                    "countryCode": "DE",
                    "moveInDate": "2018-06-23"
                }
            ],
            "document": {
                "issuingCountry": "DE",
                "number": document_number,
                "documentTypeCode": "PASSPORT",
                "expiryDate": "2025-01-03"
            },
            "usResident": true,
            "pep": true
        }
    }
}

module.exports = Person;