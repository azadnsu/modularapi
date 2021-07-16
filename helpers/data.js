const Faker = require('faker');

const data = function () {
    this.userEmail = null;

    //  * @method faker.internet.exampleEmail
    //  * @param {string} firstName
    //  * @param {string} lastName

    this.genUserEmail = () => {
        this.userEmail = (Faker.internet.exampleEmail()).toLowerCase();
        console.log("Generated email: " + this.userEmail);
        return this.userEmail
    };

    this.genRandomNumber = (min = 10000, max = 99999) => {
        this.randomId = Faker.datatype.number({min: min, max: max});
        return this.randomId
    };

};

module.exports = new data();
