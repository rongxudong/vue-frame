module.exports = function () {
    let faker = require("faker");
    faker.locale = "zh_CN";
    let _ = require("lodash");
    return {
        topics: _.times(20, function (n) {
            return {
                id: faker.random.uuid(),
                title: faker.name.title()
            }
        }),
        // address: _.times(100, function (n) {
        //     return {
        //         id: faker.random.uuid(),
        //         city: faker.address.city(),
        //         county: faker.address.county()
        //     }
        // })
    }
}