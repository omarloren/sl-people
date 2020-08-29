
const People = require('../lib/People').People;

const expect = require('chai').expect;

const dataMock = [
    { 'email_address': 'sakatius@gmail.com' },
    { 'email_address': 'sakatiuss@gmail.com' },
    { 'email_address': 'last@me.com' },
    { 'email_address': 'newemailisnew@menew.com' },
    { 'email_address': 'testt@gmail.com' },
    { 'email_address': 'raa_beetty@google.com' },
    { 'email_address': 'benoliv@salesloft.com' },
    { 'email_address': 'benolive@salesloft.com' }
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
        const {s, a, k, '@': at } = people.frequency();
        expect(s).to.equal(12);
        expect(a).to.equal(13);
        expect(k).to.equal(2);
        expect(at).to.equal(8);
    })

    it('find possible duplicates in people data by email_address', () => {
        const people = new People();
        people.data = dataMock;

        const duplicates = people.emailDuplicates()
        expect(duplicates[0]).to.eql([ 'sakatius@gmail.com', 'sakatiuss@gmail.com' ]);
        expect(duplicates[1]).to.eql([ 'benoliv@salesloft.com', 'benolive@salesloft.com' ]);
    })
})
