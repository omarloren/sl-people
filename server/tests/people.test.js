
const People = require('../lib/People').People;

const expect = require('chai').expect;

const dataMock = [
    { 'email_address': 'sakatius@gmail.com' },
    { 'email_address': 'sakatiuss@gmail.com' },
    { 'email_address': 'last@me.com' },
    { 'email_address': 'newemailisnew@menew.com' },
    { 'email_address': 'testt@gmail.com' },
    { 'email_address': 'raa_beetty@google.com' }
]

describe("People Test", () => {
    it('Retrieves  people data', async () => {
        const people = new People()
        await people.fetch();
        expect(people.data).to.be.an('array')
    })

    it('Calculates the frequency count of all unique characters in all email addresses from a given set of data', () => {
        const people = new People();
        people.data = dataMock;
        const frequency = people.frequency()
    })
})
